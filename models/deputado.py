from . import db
from sqlalchemy import Column, String, UUID

class Deputado(db.Model):
    __tablename__ = "deputados"
    
    deputado_id = db.Column(db.Integer, primary_key=True)
    deputado_nome = db.Column(db.String(100))
    deputado_partido = db.Column(db.String(20))
    deputado_estado = db.Column(db.String(2))
    deputado_foto = db.Column(db.String())
    
