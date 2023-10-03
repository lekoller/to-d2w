from entities.item import Item
from repository.item import ItemRepository


class ItemService():
    def __init__(self, item_repository: ItemRepository):
        self.repository = item_repository

    def create(self, body: dict) -> dict:
        item = Item(
            title=body['title'],
            description=body['description']
        )

        model = self.repository.create(item)

        return model.to_dict()