class Task:
    def __init__(self, title, description, done, id=None):
        self.id = id
        self.title = title
        self.description = description
        self.done = done
