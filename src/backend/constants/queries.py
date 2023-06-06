class Queries:
    @staticmethod
    def get_create_table_query(db_type):
        if db_type == "postgres":
            return """
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                done BOOLEAN
            )
            """
        else:  # SQLite
            return """
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                done BOOLEAN
            )
            """

    @staticmethod
    def get_insert_task_query(db_type):
        if db_type == "postgres":
            return "INSERT INTO tasks (title, description, done) VALUES ('{title}', '{description}', false) RETURNING id"
        else:  # SQLite
            return "INSERT INTO tasks (title, description, done) VALUES ('{title}', '{description}', 0)"

    @staticmethod
    def get_select_task_query():
        return "SELECT id, title, description, done FROM tasks WHERE id = {task_id}"

    @staticmethod
    def get_update_task_query():
        return "UPDATE tasks SET title = '{title}', description = '{description}', done = {done} WHERE id = {task_id}"

    @staticmethod
    def get_delete_task_query():
        return "DELETE FROM tasks WHERE id = {task_id}"

    @staticmethod
    def get_select_all_tasks_query():
        return "SELECT id, title, description, done FROM tasks"