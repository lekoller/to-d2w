from models.item import ItemModel
from repository.base import db
from entities.item import Item

class ItemRepository:
    def create(self, entity: Item) -> ItemModel:
        model = ItemModel(entity)

        db.session.add(model)
        db.session.commit()
        
        return model

    def get_one(self, item_id) -> ItemModel:
        return ItemModel.query.get(item_id)

    def get_all(self) -> list[ItemModel]:
        return ItemModel.query.all()

    def update(self, id: int, entity: Item) -> ItemModel:
        model = self.get_one(id)

        if not model:
            return None

        if entity.title is not None:
            model.title = entity.title
        if entity.description is not None:
            model.description = entity.description
        if entity.completed is not None:
            model.completed = entity.completed

        db.session.commit()

        return model

    def destroy(self, id) -> bool:
        model = self.get_one(id)
        if not model:
            return False

        db.session.delete(model)
        db.session.commit()

        return True
