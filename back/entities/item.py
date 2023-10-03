class Item:
    def __init__(self, title, description, due_date, completed=False):
        self.title = title
        self.description = description
        self.completed = completed

    def mark_completed(self):
        self.completed = True

    def __str__(self):
        return f"Item(title='{self.title}', description='{self.description}', completed={self.completed})"
