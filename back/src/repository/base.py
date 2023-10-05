from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.engine.base import Connection
from sqlalchemy.sql.expression import text

class Base(DeclarativeBase):
	pass

db = SQLAlchemy(model_class=Base)

def create_db(db_url: str, db_name: str):
	engine = db.create_engine(db_url, isolation_level="AUTOCOMMIT")

	conn: Connection = engine.connect()

	if not conn.execute(text(f"SELECT 1 FROM pg_database WHERE datname = '{db_name}'")).fetchone():
		conn.execute(text(f"CREATE DATABASE {db_name}"))

	conn.close()