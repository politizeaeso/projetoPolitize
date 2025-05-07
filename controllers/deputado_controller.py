from flask import Blueprint, request, jsonify
from models import db, Deputado

deputado_bp = Blueprint('deputados', __name__)

#criar deputado
@deputado_bp.route('/deputado', methods=['POST'])
def criar_deputado():
    data = request.json
    
    novo_deputado = Deputado(
        deputado_nome = data['deputado_nome'],
        deputado_partido = data['deputado_partido'],
        deputado_estado = data['deputado_estado'],
        deputado_foto = data['deputado_foto'])
    db.session.add(novo_deputado)
    db.session.commit()
    return jsonify({
        'id': novo_deputado.deputado_id,
        'deputado_nome': novo_deputado.deputado_nome,
        'deputado_estado': novo_deputado.deputado_estado,
        'deputado_foto': novo_deputado.deputado_foto
        }), 201

#lista deputados
@deputado_bp.route('/deputado', methods=['GET'])
def listar_deputados():
   deputados = Deputado.query.all() 
   lista_deputados = [{
       'id': deputado.deputado_id,
       'nome': deputado.deputado_nome,
       'estado': deputado.deputado_estado,
       'foto': deputado.deputado_foto
       } for deputado in deputados] 
   return jsonify(lista_deputados)

#um unico deputado
@deputado_bp.route('/deputado-unica',methods = ['GET'])
def listar_deputado():
    id = request.args.get('Id')
    nome = request.args.get('Nome')
    if id:
      deputado =deputado.query.filter_by(id=id).first() 
      return jsonify(deputado)
    elif nome:
       deputado =deputado.query.filter_by(deputado_nome=nome).first() 
       return jsonify(deputado)
    else:
        return jsonify({'error': 'Parâmetros inválidos'}), 400

# atualizar um deputado
@deputado_bp.route('/deputado/<int:id>', methods=['PUT'])
def atualizar_deputado(id):
    data = request.json
    deputado =deputado.query.get(id)
    if not deputado:
        return jsonify({'error': 'deputado não encontrado'}), 404
    
    deputado.deputado_nome = data['deputado_nome']
    db.session.commit()
    return jsonify({
        'id':deputado.deputado_id,
        'nome':deputado.deputado_nome,
        'estado': deputado.deputado_estado,
        'foto': deputado.deputado_foto
        }), 200

#deletar um deputado
@deputado_bp.route('/deputado/<int:id>', methods=['DELETE'])
def deletar_deputado(id):
    deputado = deputado.query.get(id)
    
    if not deputado:
        return jsonify({'error': 'deputado não encontrado'}), 404
    
    db.session.delete(deputado)
    db.session.commit()
    return jsonify({'message': 'deputado deletado com sucesso'}), 204