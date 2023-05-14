import psycopg2
import time

MAX_RETRY = 10

class PostgreSQLConnection:
    def __init__(self, host, port, database, user, password):
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password
        self.connection = None
        self.cursor = None

    def connect(self):
        retry = 0
        while retry < MAX_RETRY:
            try:
                self.connection = psycopg2.connect(
                    host=self.host,
                    port=self.port,
                    database=self.database,
                    user=self.user,
                    password=self.password
                )
            except psycopg2.OperationalError:
                print(f"Error connecting to DB, retry number {retry}")
                time.sleep(5)
            retry += 1
        
        if self.connection:
            self.cursor = self.connection.cursor()
        else:
            raise psycopg2.OperationalError

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

    def execute_query(self, query):
        self.cursor.execute(query)

    def fetchone(self):
        return self.cursor.fetchone()

    def fetchall(self):
        return self.cursor.fetchall()

    def commit(self):
        self.connection.commit()
