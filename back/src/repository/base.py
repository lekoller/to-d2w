from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.engine.base import Connection
from sqlalchemy.sql.expression import text

class Base(DeclarativeBase):
	pass

db = SQLAlchemy(model_class=Base)

def create_db(db_url: str, db_name: str):
	print("got in create_db")
	engine = db.create_engine(db_url, isolation_level="AUTOCOMMIT")

	conn: Connection = engine.connect()
	print("got connected")
	print("db_name", db_name)

	if not conn.execute(text(f"SELECT 1 FROM pg_database WHERE datname = '{db_name}'")).fetchone():
		print("got in here")
		conn.execute(text(f"CREATE DATABASE {db_name}"))
		print("executed")

	conn.close()