from entity.task import Task
from constants.queries import Queries


class TaskManager:
    def __init__(self, db_connection):
        self.db = db_connection
        self.db.connect()
        self.initialize_database()

    def initialize_database(self):
        query = Queries.get_create_table_query(self.db.db_type)
        self.db.execute_query(query)

    def create_task(self, title, description):
        query_template = Queries.get_insert_task_query(self.db.db_type)
        query = query_template.format(title=title, description=description)
        self.db.execute_query(query)
        if self.db.db_type == "postgres":
            task_id = self.db.fetchone()[0]
        else:  # SQLite
            task_id = self.db.cursor.lastrowid
        self.db.commit()
        return self.get_task(task_id)

    def get_task(self, task_id):
        query = f"SELECT id, title, description, done FROM tasks WHERE id = {task_id}"
        self.db.execute_query(query)
        result = self.db.fetchone()
        if result:
            task = Task(title=result[1], description=result[2], done=bool(result[3]))
            task.id = result[0]
            return task
        else:
            return None

    def update_task(self, task_id, title=None, description=None, done=None):
        task = self.get_task(task_id)
        if task:
            if title is not None:
                task.title = title
            if description is not None:
                task.description = description
            if done is not None:
                task.done = done
            query = Queries.get_update_task_query().format(title=task.title, description=task.description, done=task.done, task_id=task.id)
            self.db.execute_query(query)
            self.db.commit()
            return task
        else:
            return None

    def delete_task(self, task_id):
        task = self.get_task(task_id)
        if task:
            query = Queries.get_delete_task_query().format(task_id=task.id)
            self.db.execute_query(query)
            self.db.commit()
            return task
        else:
            return None

    def get_all_tasks(self):
        query = Queries.get_select_all_tasks_query()
        self.db.execute_query(query)
        results = self.db.fetchall()
        tasks = []
        for result in results:
            task = Task(title=result[1], description=result[2], done=bool(result[3]))
            task.id = result[0]
            tasks.append(task)
        return tasks