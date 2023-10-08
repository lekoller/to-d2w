from repository.base import db
from entities.user import User


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, entity: User):
        self.name = entity.name
        self.password = entity.password

    def to_entity(self) -> User:
        return User(
            name=self.name,
            password=self.password
        )
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password
        }