from repository.base import db
from entities.user import User

from werkzeug.security import generate_password_hash, check_password_hash


class UserModel(db.Model):
    __tablename__ = 'users'

    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(100), nullable=False)
    password: str = db.Column(db.String(255), nullable=False)

    def __init__(self, entity: User):
        self.name = entity.name
        self.password = generate_password_hash(entity.password)

    def to_entity(self) -> User:
        return User(
            name=self.name,
            password=self.password
        )
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }