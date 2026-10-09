from urllib.parse import quote_plus
from sqlalchemy import create_engine, text
import pandas as pd

# 1. Definir parámetros
driver = "ODBC Driver 18 for SQL Server"
server = "localhost"
database = "nombre_de_tu_bd"
user = "tu_usuario"
password = "tu_password"

# 2. Construir la URL de conexión escapando caracteres especiales
odbc_str = (
    f"DRIVER={{{driver}}};"
    f"SERVER={server};"
    f"DATABASE={database};"
    f"UID={user};"
    f"PWD={password};"
    "TrustServerCertificate=yes;"
)
engine_url = f"mssql+pyodbc:///?odbc_connect={quote_plus(odbc_str)}"

# 3. Crear el motor
engine = create_engine(engine_url)

# 4. Leer con pandas
query = "SELECT TOP 10 * FROM tu_tabla;"
df = pd.read_sql(query, con=engine)
print(df.head())

# 5. Escribir un DataFrame de vuelta a SQL Server (ejemplo)
# df.to_sql("nueva_tabla", con=engine, if_exists="replace", index=False)
