from . import db

class Lei(db.Model):
    __tablename__ = "leis"
    
    lei_id = db.Column(db.Integer, primary_key=True)
    lei_data = db.Column(db.Date)
    lei_resumo = db.Column(db.String(2000))
    lei_resultado = db.Column(db.Boolean)
    
   