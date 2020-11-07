import hashlib

def hash(*argv):
    hash_key = ''
    for arg in argv:
        hash_key += str(arg)
    return hashlib.md5(hash_key.encode()).hexdigest()