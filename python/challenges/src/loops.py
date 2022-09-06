def loops(x: int) -> list:

    # Squared number list
    squared = []

    # If x is zero just return 0
    if  x == 0:
        return [0]

    # Generate initial numbers
    numbers = list(range(x))

    # Loop through those numbers and square them
    # then push them into the squared list
    for number in numbers:
        squared.append(number**2)

    # return squared numbers
    return squared
