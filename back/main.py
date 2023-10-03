from flask import Flask
from flask_restful import Api
from resources.read import HelloWorld
from repository.base import db

app = Flask(__name__)

api = Api(app)
    
api.add_resource(HelloWorld, '/')

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

db.init_app(app)

if __name__ == '__main__':
    app.run()