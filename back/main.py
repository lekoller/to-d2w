import os

from flask import Flask
from flask_restful import Api
from repository.item import ItemRepository
from resources.item import ItemResource
from repository.base import db, create_db
from flask_migrate import Migrate
from dotenv import load_dotenv

from services.item import ItemService

load_dotenv()

db_user = os.environ.get('DB_USER')
db_pass = os.environ.get('DB_PASS')
db_host = os.environ.get('DB_HOST')
db_port = os.environ.get('DB_PORT')
db_name = os.environ.get('DB_NAME')

app = Flask(__name__)

api = Api(app)    
api.add_resource(
    ItemResource, 
    '/', 
    resource_class_kwargs={ "service": ItemService(ItemRepository()) }
)

db_conn_string = "postgresql://"+db_user+":"+db_pass+"@"+db_host+":"+db_port
create_db(db_conn_string)

app.config["SQLALCHEMY_DATABASE_URI"] = db_conn_string+"/"+db_name

db.init_app(app)

migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run()