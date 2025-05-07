from . import db

class Usuario(db.Model):
    __tablename__ = "usuarios"

    usuario_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_nome = db.Column(db.String(100), nullable=False)
    usuario_email = db.Column(db.String(100), nullable=False)
    usuario_senha = db.Column(db.String(20), nullable=False)
    usuario_estado = db.Column(db.String(2), nullable=False)
    
