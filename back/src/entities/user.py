class User: 
    def __init__(self, name, password):
        self.name = name
        self.password = password

    def __str__(self) -> str:
        return f"User(name='{self.name}', password='{self.password}')"