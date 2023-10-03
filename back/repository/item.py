from models.item import ItemModel
from base import db
from entities.item import Item

class ItemRepository:
    def create(self, entity: Item) -> Item:
        model = ItemModel(entity)

        db.session.add(model)
        db.session.commit()
        
        return model.to_entity()

    def get_by_id(self, item_id) -> ItemModel:
        return ItemModel.query.get(item_id)
    
    def get_one(self, item_id) -> Item:
        return self.get_by_id(item_id).to_entity()

    def get_all(self) -> list[Item]:
        return [item.to_entity() for item in ItemModel.query.all()]

    def update(self, item_id, title=None, description=None, due_date=None, completed=None) -> Item:
        model = self.get_by_id(item_id)
        if not model:
            return None

        if title is not None:
            model.title = title
        if description is not None:
            model.description = description
        if due_date is not None:
            model.due_date = due_date
        if completed is not None:
            model.completed = completed

        db.session.commit()
        return model.to_entity()

    def delete(self, item_id) -> bool:
        model = self.get_by_id(item_id)
        if not model:
            return False

        db.session.delete(model)
        db.session.commit()
        return True
