from flask import Blueprint, jsonify
from models import db, Usuario, Deputado, VotoDeputado, VotoUsuario

divergencia_bp = Blueprint('divergencia', __name__)

@divergencia_bp.route('/divergencia/<int:usuario_id>', methods=['GET'])
def calcular_divergencia(usuario_id):
    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    votos_usuario = VotoUsuario.query.filter_by(usuario_id=usuario_id).all()
    votos_usuario_dict = {v.lei_id: v.voto for v in votos_usuario}

    deputados = Deputado.query.all()
    divergencias = []

    for deputado in deputados:
        votos_deputado = VotoDeputado.query.filter_by(deputado_id=deputado.deputado_id).all()

        total_comparaveis = 0
        votos_diferentes = 0

        for voto_dep in votos_deputado:
            voto_usuario = votos_usuario_dict.get(voto_dep.lei_id)
            if voto_usuario is not None:
                total_comparaveis += 1
                if voto_usuario != voto_dep.voto:
                    votos_diferentes += 1

        if total_comparaveis > 0:
            indice_divergencia = votos_diferentes / total_comparaveis
        else:
            indice_divergencia = 0  # não tem como comparar

        divergencias.append({
            'deputado_id': deputado.deputado_id,
            'nome': deputado.deputado_nome,
            'divergencia': round(indice_divergencia * 100, 2)
        })

    divergencias_ordenadas = sorted(divergencias, key=lambda x: x['divergencia'], reverse=True)

    return jsonify(divergencias_ordenadas)
