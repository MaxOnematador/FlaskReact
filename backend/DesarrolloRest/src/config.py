class DevelopmentConfig(): 
    DEBUG = True 
    MYSQL_HOST = 'localhost' 
    MYSQL_USER = 'root' 
    MYSQL_PASSWORD = '' 
    MYSQL_PORT = 3307
    MYSQL_DB = 'dbpersonal' 

config = { 
'development':DevelopmentConfig 
} 