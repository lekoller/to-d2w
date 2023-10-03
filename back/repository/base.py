from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.engine.base import Connection
from sqlalchemy.sql.expression import text

class Base(DeclarativeBase):
	pass

db = SQLAlchemy(model_class=Base)

def create_db(connection_string: str):
	engine = db.create_engine(connection_string, isolation_level="AUTOCOMMIT")

	conn: Connection = engine.connect()
	db_name = "to_d2w"

	if not conn.execute(text(f"SELECT 1 FROM pg_database WHERE datname = '{db_name}'")).fetchone():
		conn.execute(text(f"CREATE DATABASE {db_name}"))

	conn.close()