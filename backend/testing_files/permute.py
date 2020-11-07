from itertools import product

l1, l2 = [1, 2, 3], ['a', 'b', 'c']
output = list(product(l1, l2))

print(output)