import pyodbc

# Cadena de conexión
conn_str = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;"             # o nombre_del_servidor\instancia
    "DATABASE=nombre_de_tu_bd;"
    "UID=tu_usuario;"               # Si usas autenticación SQL
    "PWD=tu_password;"
    "TrustServerCertificate=yes;"   # Necesario con Driver 18 si no usas SSL firmado
)

# Para Autenticación de Windows (Trusted_Connection):
# conn_str = (
#     "DRIVER={ODBC Driver 18 for SQL Server};"
#     "SERVER=localhost;"
#     "DATABASE=nombre_de_tu_bd;"
#     "Trusted_Connection=yes;"
#     "TrustServerCertificate=yes;"
# )

try:
    with pyodbc.connect(conn_str) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT @@VERSION;")
        row = cursor.fetchone()
        print("Conectado con éxito a:", row[0])
except pyodbc.Error as e:
    print("Error de conexión:", e)
