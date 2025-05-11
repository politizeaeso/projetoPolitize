from flask import Blueprint, jsonify
from models import db, Usuario, Deputado, VotoDeputado, VotoUsuario

ranking_bp = Blueprint('ranking', __name__)

@ranking_bp.route('/ranking/<int:usuario_id>', methods=['GET'])
def calcular_ranking(usuario_id):
    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    # Busca todos os votos do usuário
    votos_usuario = VotoUsuario.query.filter_by(usuario_id=usuario_id).all()
    votos_usuario_dict = {v.lei_id: v.voto for v in votos_usuario}

    deputados = Deputado.query.all()
    ranking = []

    for deputado in deputados:
        votos_deputado = VotoDeputado.query.filter_by(deputado_id=deputado.deputado_id).all()
        
        total_comparaveis = 0
        votos_iguais = 0

        for voto_dep in votos_deputado:
            voto_usuario = votos_usuario_dict.get(voto_dep.lei_id)
            if voto_usuario:
                total_comparaveis += 1
                if voto_usuario == voto_dep.voto:
                    votos_iguais += 1

        # Calcula a compatibilidade se houve votos comparáveis
        if total_comparaveis > 0:
            compatibilidade = votos_iguais / total_comparaveis
        else:
            compatibilidade = 0

        ranking.append({
            'deputado_id': deputado.deputado_id,
            'nome': deputado.deputado_nome,
            'compatibilidade': round(compatibilidade * 100, 2)  # em porcentagem
        })

    # Ordena o ranking do mais compatível para o menos
    ranking_ordenado = sorted(ranking, key=lambda x: x['compatibilidade'], reverse=True)

    return jsonify(ranking_ordenado)