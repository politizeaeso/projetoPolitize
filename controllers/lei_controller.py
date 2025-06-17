from flask import Blueprint, request, jsonify
from models import db, Lei


lei_bp = Blueprint('lei', __name__)

#lista com leis
@lei_bp.route('/lei', methods=['GET'])
def listar_leis():
    lei = Lei.query.all()
    lista_lei = [{'id': lei.lei_id, 
                  'data': lei.lei_data,
                  'resumo': lei.lei_resumo,
                  'resultado': lei.lei_resultado
                  } for lei in lei]
    return jsonify(lista_lei)

#obter uma única lei
@lei_bp.route('/lei-unica',methods = ['GET'])
def listar_lei():
    id = request.args.get('id')
    data = request.args.get('Data')
    resumo = request.args.get('Resumo')
    resultado = request.args.get('Resultado')
    if id:
       lei = Lei.query.filter_by(id=id).first() 
       return jsonify(lei)
    elif data:
        lei = Lei.query.filter_by(lei_data=data).first()
        return jsonify(lei)
    elif resumo:
        lei = Lei.query.filter_by(lei_data=resumo).first()
        return jsonify(lei)
    elif resultado:
        lei = Lei.query.filter_by(lei_data=resultado).first()
        return jsonify(lei)
    else:
        return jsonify({'error': 'Parâmetros inválidos'}), 400

#deleta uma lei
@lei_bp.route('/lei/<int:id>', methods=['DELETE'])
def deletar_lei(id):
    lei = Lei.query.get(id)
    
    if not lei:
        return jsonify({'error': 'Lei não encontrado'}), 404
    
    db.session.delete(lei)
    db.session.commit()
    return jsonify({'message': 'Lei deletado com sucesso'}), 204