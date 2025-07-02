import os

basedir = os.path.abspath(os.path.dirname(__file__))

class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///trailblaze.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
