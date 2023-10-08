from sqlalchemy import asc
from repository.base import db
from entities.item import Item

class ItemModel(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    completed = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, entity: Item):
        self.title = entity.title
        self.description = entity.description
        self.completed = entity.completed

    def to_entity(self) -> Item:
        return Item(
            title=self.title,
            description=self.description,
            completed=self.completed
        )
    
    @classmethod
    def get_all(cls) -> list['ItemModel']:
        return cls.query.order_by(asc(cls.id)).all()

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }
