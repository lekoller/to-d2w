import os
from flask import Flask
from flask_migrate import Migrate

from repository import base
from dotenv import load_dotenv
from api import api


def create_app() -> Flask:
    load_dotenv()

    db_user = os.environ.get('DB_USER')
    db_pass = os.environ.get('DB_PASS')
    db_host = os.environ.get('DB_HOST')
    db_port = os.environ.get('DB_PORT')
    db_name = os.environ.get('DB_NAME')

    db_conn_string = "postgresql://"+db_user+":"+db_pass+"@"+db_host+":"+db_port

    base.create_db(db_conn_string)

    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = db_conn_string+"/"+db_name

    return app

app = create_app()

base.db.init_app(app)
api.start_api(app)

migrate = Migrate(app, base.db)

if __name__ == '__main__':
    app.run()