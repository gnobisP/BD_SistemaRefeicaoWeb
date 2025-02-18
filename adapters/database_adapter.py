import psycopg2
from psycopg2.extras import RealDictCursor

class DatabaseAdapter:
    def __init__(self, database_url):
        self.database_url = database_url

    def connect(self):
        return psycopg2.connect(self.database_url, cursor_factory=RealDictCursor)

    def fetch_all(self, query, params=None):
        with self.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(query, params or [])
                return cur.fetchall()

    def execute(self, query, params=None):
        with self.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(query, params or [])
                conn.commit()

    def execute(self, query, params=None):
        with self.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(query, params or [])

                # Tenta capturar o retorno da query (ex.: para RETURNING)
                if cur.description: # Verifica se há resultado retornado pela query
                    result = cur.fetchone() # Captura a primeira linha retornada
                    if isinstance(result, dict): # Caso esteja usando RealDictCursor
                        return list(result.values())[0]
                result = None

                conn.commit()
                return result