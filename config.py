
class Config(object):
    DEBUG = True
    MONGODB_DB = 'notepad_db'
    MONGODB_HOST = '127.0.0.1'
    MONGODB_PORT = 27017
    MONGODB_USERNAME = ''
    MONGODB_PASSWORD = ''


class LocalConfig(Config):
    pass
