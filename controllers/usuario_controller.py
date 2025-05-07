from flask import Blueprint, request, jsonify
import random
import string

from models import db, Usuario

usuario_bp = Blueprint('usuarios', __name__)

# Criar um novo usuário
@usuario_bp.route('/usuario', methods=['POST'])
def criar_usuario():
    data = request.json
    try:
        novo_usuario = Usuario(
            usuario_nome=data['usuario_nome'],
            usuario_email=data['usuario_email'],
            usuario_senha=data['usuario_senha'],
            usuario_estado=data['usuario_estado']
        )
        db.session.add(novo_usuario)
        db.session.commit()
        return jsonify({
            'id': novo_usuario.usuario_id,
            'nome': novo_usuario.usuario_nome,
            'email': novo_usuario.usuario_email,
            'estado': novo_usuario.usuario_estado
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Listar todos os usuários
@usuario_bp.route('/usuario', methods=['GET'])
def listar_usuarios():
    usuarios = Usuario.query.all()
    lista = [{
        'id': usuario.usuario_id,
        'nome': usuario.usuario_nome,
        'email': usuario.usuario_email,
        'estado': usuario.usuario_estado
    } for usuario in usuarios]
    return jsonify(lista), 200


# Obter um único usuário por ID
@usuario_bp.route('/usuario/<int:id>', methods=['GET'])
def obter_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    return jsonify({
        'id': usuario.usuario_id,
        'nome': usuario.usuario_nome,
        'email': usuario.usuario_email,
        'estado': usuario.usuario_estado
    }), 200


# Atualizar um usuário
@usuario_bp.route('/usuario/<int:id>', methods=['PUT'])
def atualizar_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    data = request.json
    try:
        usuario.usuario_nome = data.get('usuario_nome', usuario.usuario_nome)
        usuario.usuario_email = data.get('usuario_email', usuario.usuario_email)
        usuario.usuario_senha = data.get('usuario_senha', usuario.usuario_senha)
        usuario.usuario_estado = data.get('usuario_estado', usuario.usuario_estado)

        db.session.commit()
        return jsonify({
            'id': usuario.usuario_id,
            'nome': usuario.usuario_nome,
            'email': usuario.usuario_email,
            'estado': usuario.usuario_estado
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Deletar um usuário
@usuario_bp.route('/usuario/<int:id>', methods=['DELETE'])
def deletar_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    try:
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({'message': 'Usuário deletado com sucesso'}), 204
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@usuario_bp.route('/usuario-login', methods=['POST'])
def login():
    data = request.json
    usuario_email = data.get('usuario_email')
    usuario_senha = data.get('usuario_senha')
    
    # Consulta o banco de dados para obter os usuários diretamente
    usuarios = Usuario.query.all()
    
    for usuario in usuarios:
        if usuario.usuario_email == usuario_email and usuario.usuario_senha == usuario_senha:
            return jsonify({
                'message': 'Login realizado com sucesso!',
                'usuario_id': usuario.usuario_id,
                'usuario_nome': usuario.usuario_nome
            }), 200
    
    # Se o loop terminar e não encontrar correspondência
    return jsonify({'error': 'Email ou senha inválidos'}), 401

@usuario_bp.route('/usuario/recuperar-senha', methods=['POST'])
def recuperar_senha():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email é obrigatório'}), 400

    usuario = Usuario.query.filter_by(usuario_email=email).first()
    if not usuario:
        return jsonify({'error': 'Usuário não encontrado com esse email'}), 404

    # Gerar nova senha aleatória
    nova_senha = ''.join(random.choices(string.ascii_letters + string.digits, k=10))

    try:
        # Atualizar no banco
        usuario.usuario_senha = nova_senha
        db.session.commit()

        # Simular envio de e-mail
        print(f'Nova senha para {email}: {nova_senha}')

        return jsonify({
            'message': 'Uma nova senha foi enviada para o seu e-mail.',
            'obs': 'Ao logar, altere sua senha imediatamente.'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500