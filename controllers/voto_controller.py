from flask import Blueprint, request, jsonify
from models import db, Voto, VotoDeputado, Deputado
from sqlalchemy import text

voto_bp = Blueprint('voto_bp', __name__)

# Rota para obter todos os votos cadastrados no sistema
@voto_bp.route('/votos', methods=['GET'])
def get_votos():
    votos = Voto.query.all()
    return jsonify([voto.to_dict() for voto in votos])

# Rota para obter um voto específico pelo seu ID
@voto_bp.route('/votos/<int:id>', methods=['GET'])
def get_voto(id):
    voto = Voto.query.get(id)
    if voto:
        return jsonify(voto.to_dict())
    return jsonify({'erro': 'Voto não encontrado'}), 404

# Rota para criar (registrar) um novo voto + calcular similaridade
@voto_bp.route('/votos', methods=['POST'])
def create_voto():
    data = request.json
    usuario_id = data.get('usuario_id')
    lei_id = data.get('lei_id')
    voto_valor = data.get('voto')

    if not usuario_id or not lei_id or not voto_valor:
        return jsonify({'erro': 'Dados incompletos'}), 400

    # Criar e salvar o novo voto
    novo_voto = Voto(usuario_id=usuario_id, lei_id=lei_id, voto=voto_valor)
    db.session.add(novo_voto)
    db.session.commit()

    # Calcular similaridade usando SQL JOIN
    query = text("""
        SELECT 
            vd.deputado_id, 
            d.nome,
            COUNT(*) AS similaridade
        FROM votos AS vu
        JOIN votos_deputados AS vd 
            ON vu.lei_id = vd.lei_id AND vu.voto = vd.voto
        JOIN deputados AS d 
            ON d.id = vd.deputado_id
        WHERE vu.usuario_id = :usuario_id
        GROUP BY vd.deputado_id, d.nome
        ORDER BY similaridade DESC
    """)

    resultado = db.session.execute(query, {"usuario_id": usuario_id}).fetchall()

    deputados_similares = []
    for row in resultado:
        deputados_similares.append({
            "deputado_id": row.deputado_id,
            "nome": row.nome,
            "similaridade": row.similaridade
        })

    return jsonify({
        "mensagem": "Voto registrado com sucesso.",
        "voto": novo_voto.to_dict(),
        "deputados_semelhantes": deputados_similares
    }), 201

# Rota para excluir um voto pelo seu ID
@voto_bp.route('/votos/<int:id>', methods=['DELETE'])
def delete_voto(id):
    voto = Voto.query.get(id)
    if voto:
        db.session.delete(voto)
        db.session.commit()
        return '', 204
    return jsonify({'erro': 'Voto não encontrado'}), 404
