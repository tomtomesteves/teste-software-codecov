class TaskValidation:
    @staticmethod
    def validate_title(title):
        if not title:
            raise ValueError('O título da tarefa é obrigatório.')
        
        if len(title) > 255:
            raise ValueError('O título da tarefa deve ter no máximo 255 caracteres.')

    @staticmethod
    def validate_description(description):
        if description and len(description) > 1000:
            raise ValueError('A descrição da tarefa deve ter no máximo 1000 caracteres.')

    @staticmethod
    def validate_done(done):
        if not isinstance(done, bool):
            raise ValueError('O valor de "done" deve ser um booleano (True ou False).')

    @staticmethod
    def validate_id(task_id):
        if task_id and (not isinstance(task_id, int) or task_id <= 0):
            raise ValueError('O ID da tarefa deve ser um número inteiro positivo.')

    @staticmethod
    def validate_task(task):
        TaskValidation.validate_title(task.title)
        TaskValidation.validate_description(task.description)
        TaskValidation.validate_done(task.done)
        TaskValidation.validate_id(task.id)