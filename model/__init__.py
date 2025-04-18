from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .usuario import Usuario
from .deputado import Deputado
from .lei import Lei
from .voto import Voto