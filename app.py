from flask import Flask
from models import db
from utils.lista_deputados import lista_deputados
from flask_cors import CORS
from config import Config

def criar_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        db.create_all() 
        lista_deputados()
      
if __name__ == '__main__':
    app = criar_app()