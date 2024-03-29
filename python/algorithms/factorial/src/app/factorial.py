from functools import reduce

def factorial(x: int) -> int:
    """
    Calculates factorial given a number
    input x: int : number
    output int
    """
    if x == 0:
        return 1
    else:
        numbers = [(i+1) for i in range(x)]
    return reduce(lambda x,y: x*y, numbers)
