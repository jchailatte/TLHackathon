from gevent import monkey
monkey.patch_all()
from gevent.pywsgi import WSGIServer
from app import app

port = 8088

if __name__ == '__main__':
    print('Serving on {}...'.format(port))
    WSGIServer(('0.0.0.0', port), app).serve_forever()