from . import db

class Lei(db.Model):
    __tablename__ = "leis"
    
    lei_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    lei_data = db.Column(db.Date, nullable=False)
    lei_resumo = db.Column(db.String(800), nullable=False)
    lei_resultado = db.Column(db.Boolean, nullable=False)
    
   