from . import db
from sqlalchemy import Column, String, UUID

class Deputado(db.Model):
    __tablename__ = "deputados"
    
    deputado_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    deputado_nome = db.Column(db.String(100), nullable=False)
    deputado_partido = db.Column(db.String(20), nullable=False)
    deputado_estado = db.Column(db.String(2), nullable=False)
    deputado_foto = db.Column(db.String(), nullable=False)
    
