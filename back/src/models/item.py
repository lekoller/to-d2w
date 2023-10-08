from sqlalchemy import asc
from repository.base import db
from entities.item import Item


class ItemModel(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('UserModel', backref='items')

    def __init__(self, entity: Item):
        self.title = entity.title
        self.description = entity.description
        self.completed = entity.completed
        self.user_id = entity.user_id

    def to_entity(self) -> Item:
        return Item(
            title=self.title,
            description=self.description,
            completed=self.completed,
            user_id=self.user_id
        )
    
    @classmethod
    def get_one(cls, item_id: int, user_id: int) -> 'ItemModel':
        return cls.query.filter_by(id=item_id, user_id=user_id).first()

    @classmethod
    def get_all(cls, user_id: int) -> list['ItemModel']:
        return cls.query.filter_by(user_id=user_id).order_by(asc(cls.id)).all()

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }
