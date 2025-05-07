import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///politize.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False