from services.task_validation import TaskValidation

class Task:
    def __init__(self, title, description, done, id=None):
        self.id = id
        self.title = title
        self.description = description
        self.done = done

        TaskValidation.validate_task(self)
