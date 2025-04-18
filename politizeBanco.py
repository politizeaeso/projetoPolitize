from sqlalchemy import create_engine, Column, String, Integer, Boolean, ForeignKey, Date, Uuid
from sqlalchemy.orm import sessionmaker, declarative_base

db = create_engine("sqlite:///banco_politize.db")
Session = sessionmaker(bind=db)
session = Session()

Base = declarative_base()

#tabelas

class Usuario(Base):
    __tablename__ = "usuarios"

    usuario_id = Column("usuario_id", Uuid, primary_key=True)
    usuario_nome = Column("usuario_nome", String(50))
    usuario_email = Column("usuario_email", String(50))
    usuario_senha = Column("usuario_senha", String(50))
    usuario_estado = Column("usuario_estado", String(50))
    
    def __init__(self, usuario_nome, usuario_email, usuario_senha, usuario_estado):
        self.usuario_nome = usuario_nome
        self.usuario_email = usuario_email
        self.usuario_senha = usuario_senha
        self.usuario_estado = usuario_estado


class Deputado(Base):
    __tablename__ = "deputados"
    
    deputado_id = Column("deputado_id", Uuid, primary_key=True)
    deputado_nome = Column("deputado_nome", String(50))
    deputado_partido = Column("deputado_partido", String(50))
    deputado_estado = Column("deputado_estado", String(50))
    deputado_foto = Column("deputado_foto", String(100))
    
    def __init__(self, deputado_nome, deputado_partido, deputado_estado, deputado_foto):
        self.deputado_nome = deputado_nome
        self.deputado_partido = deputado_partido
        self.deputado_estado = deputado_estado
        self.deputado_foto = deputado_foto
       
class Lei(Base):
    __tablename__ = "leis"
    
    lei_id = Column ("lei_id", Uuid, primary_key=True)
    lei_data = Column ("lei_data", Date)
    lei_resumo = Column ("lei_resumo", String(200))
    lei_resultado = Column ("lei_resultado", Boolean)
    
    def __init__(self, lei_data, lei_resumo, lei_resultado):
        self.lei_data = lei_data
        self.lei_resumo = lei_resumo
        self.lei_resultado = lei_resultado

class Voto(Base):
    __tablename__ = "votos"
    
    voto_id = Column("voto_id", Uuid, primary_key=True)
    voto_usuario = Column("voto_usuario", Boolean)
    voto_deputado = Column("voto_deputado", Boolean)
    voto_resultado = Column("voto_resultado", Boolean)
    #FK usuario_id 
    #FK lei_id 
    #FK deputado_id
            
    def __init__(self, voto_usuario, voto_deputado, voto_resultado):
        self.voto_usuario = voto_usuario
        self.voto_deputado = voto_deputado
        self.voto_resultado = voto_resultado
        

Base.metadata.create_all(bind=db)