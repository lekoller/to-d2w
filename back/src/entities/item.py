class Item:
    def __init__(self, title, description, completed=False):
        self.title = title
        self.description = description
        self.completed = completed

    def mark_completed(self):
        self.completed = True

    def change_title(self, new_title):
        self.title = new_title

    def change_description(self, new_description):
        self.description = new_description

    def __str__(self):
        return f"Item(title='{self.title}', description='{self.description}', completed={self.completed})"
