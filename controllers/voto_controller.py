from flask import Blueprint, request, jsonify
from models import db, Voto

# Criando um Blueprint para organizar as rotas relacionadas a 'voto'
voto_bp = Blueprint('voto_bp', __name__)

# Rota para obter todos os votos cadastrados no sistema
@voto_bp.route('/votos', methods=['GET'])
def get_votos():
    votos = Voto.query.all()
    return jsonify([voto for voto in votos])

# Rota para obter um voto específico pelo seu ID
@voto_bp.route('/votos/<int:id>', methods=['GET'])
def get_voto(id):
    voto = Voto.query.get(id)  
    return jsonify(voto)  

# Rota para criar (registrar) um novo voto
@voto_bp.route('/votos', methods=['POST'])
def create_voto():
    data = request.json  
    novo_voto = Voto(data)  
    db.session.add(novo_voto)  
    db.session.commit()  
    return jsonify(novo_voto.to_dict()), 201  

# Rota para excluir um voto pelo seu ID
@voto_bp.route('/votos/<int:id>', methods=['DELETE'])
def delete_voto(id):
    voto = Voto.query.get(id)  
    db.session.delete(voto)  
    db.session.commit()  
    return '', 204