from flask import Flask
from models import db
from utils.lista_uris import filtrar_data
from flask_cors import CORS
from config import Config

from controllers.deputado_controller import deputado_bp
from controllers.lei_controller import lei_bp
from controllers.usuario_controller import usuario_bp
from controllers.voto_controller import voto_bp

def criar_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        db.create_all()
        urls = filtrar_data()
        print(urls)
    
    app.register_blueprint(deputado_bp)
    app.register_blueprint(lei_bp)
    app.register_blueprint(usuario_bp)
    app.register_blueprint(voto_bp)
    
    return app

if __name__ == '__main__':
    app = criar_app()
    app.run(port = 5000)