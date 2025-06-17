from . import db
from sqlalchemy import ForeignKey

class Voto(db.Model):
    __tablename__ = "votos"
    
    voto_id = db.Column(db.Integer, primary_key=True)
    voto_usuario = db.Column(db.Boolean)
    voto_deputado = db.Column(db.Boolean)
    voto_resultado = db.Column(db.Boolean)
    usuario_id = db.Column(db.Integer, ForeignKey('usuarios.usuario_id')) 
    lei_id = db.Column(db.Integer, ForeignKey('leis.lei_id')) 
    deputado_id = db.Column(db.Integer, ForeignKey('deputados.deputado_id')) 
            

        

