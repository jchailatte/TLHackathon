from gevent import monkey
monkey.patch_all()
from gevent.pywsgi import WSGIServer
from app import app

if __name__ == '__main__':
    print('Serving on 8088...')
    WSGIServer(('127.0.0.1', 8088), app).serve_forever()