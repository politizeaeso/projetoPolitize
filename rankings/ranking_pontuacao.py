from flask import Blueprint, request, jsonify
from models import db, Usuario, Deputado, Lei, Voto

# Cria um Blueprint chamado 'ranking' para organizar as rotas relacionadas a ranking
ranking_bp = Blueprint('ranking', __name__)

@ranking_bp.route('/ranking-pontos', methods=['GET'])
def ranking_pontos():
    """
    Gera um ranking de deputados baseado em pontos de compatibilidade de votos
    com um usuário específico.

    Lógica:
    +1 ponto se o voto do deputado for igual ao do usuário.
    -1 ponto se o voto for diferente.
    """

    # Recupera o ID do usuário da URL (ex: /ranking-pontos?usuario_id=1)
    usuario_id = request.args.get('usuario_id')

    # Parâmetro opcional para definir a ordenação: 'desc' para compatíveis (padrão), 'asc' para divergentes
    ordem = request.args.get('ordem', 'desc')

    if not usuario_id:
        return jsonify({'error': 'Parâmetro usuario_id é obrigatório'}), 400

    # Busca todos os votos feitos pelo usuário
    votos_usuario = Voto.query.filter_by(usuario_id=usuario_id).all()

    # Cria um dicionário com os votos do usuário: {lei_id: voto_usuario}
    votos_usuario_dict = {v.lei_id: v.voto_usuario for v in votos_usuario}

    # Busca todos os votos dos deputados nas mesmas leis que o usuário votou
    votos_deputados = Voto.query.filter(Voto.lei_id.in_(votos_usuario_dict.keys())).all()

    # Dicionário para acumular a pontuação de cada deputado
    pontuacoes = {}

    for voto in votos_deputados:
        # Garante que o voto está associado a um deputado e tem valor
        if voto.deputado_id and voto.voto_deputado is not None:
            # Recupera o voto do usuário na mesma lei
            voto_usuario = votos_usuario_dict.get(voto.lei_id)

            # Se o usuário votou nessa lei, comparamos os votos
            if voto_usuario is not None:
                if voto.voto_deputado == voto_usuario:
                    pontuacoes[voto.deputado_id] = pontuacoes.get(voto.deputado_id, 0) + 1
                else:
                    pontuacoes[voto.deputado_id] = pontuacoes.get(voto.deputado_id, 0) - 1

    # Monta a lista final com os dados dos deputados e suas pontuações
    ranking = []
    for deputado_id, pontos in pontuacoes.items():
        deputado = Deputado.query.get(deputado_id)
        if deputado:
            ranking.append({
                'deputado_id': deputado.deputado_id,
                'nome': deputado.deputado_nome,
                'partido': deputado.deputado_partido,
                'estado': deputado.deputado_estado,
                'foto': deputado.deputado_foto,
                'pontos': pontos
            })

    # Ordena o ranking com base nos pontos: descendente para compatíveis, ascendente para divergentes
    ranking_ordenado = sorted(ranking, key=lambda x: x['pontos'], reverse=(ordem == 'desc'))

    # Retorna o ranking ordenado como JSON
    return jsonify(ranking_ordenado), 200
