from entities.item import Item
from repository.item import ItemRepository


class ItemService():
    def __init__(self, item_repository: ItemRepository):
        self.repository = item_repository

    def create(self, body: dict) -> dict:
        item = Item(
            title=body.get('title'),
            description=body.get('description')
        )

        model = self.repository.create(item)

        return model.to_dict()
    
    def find_one(self, id: int) -> dict:
        model = self.repository.get_one(id)

        if not model:
            return None

        return model.to_dict()
    
    def list_all(self) -> list[dict]:
        models = self.repository.get_all()

        return [model.to_dict() for model in models]
    
    def update(self, id: int, body: dict) -> dict:
        model = self.repository.get_one(id)

        if not model:
            return None
        
        entity = Item(title=model.title, description=model.description, completed=model.completed)

        if body.get('title') is not None:
            entity.change_title(body['title'])

        if body.get('description') is not None:
            entity.change_description(body['description'])

        model = self.repository.update(id, entity=entity)

        if not model:
            return None

        return model.to_dict()
    
    def delete(self, id: int) -> bool:
        return self.repository.destroy(id)
    