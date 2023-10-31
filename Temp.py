# Step 1: Pre-calculate Quantile Positions (O(k))
function preCalculateQuantilePositions(k):
    quantilePositions = []
    intervalSize = n / k  # n is the number of elements in the set
    for i from 1 to k-1:
        position = i * intervalSize
        quantilePositions.append(position)
    return quantilePositions


#

# Step 2: Finding k/2-th Order Statistic (Median) (O(n))
function findKthOrderStatistic(arr, k):
    if k == 1:
        return Select(arr, k)  # Use a Select algorithm to find the k/2-th order statistic (median)
    else:
        return Select(arr, k/2)

# Step 3: Partition the Set (O(n))
function partitionSet(arr, pivot):
    smaller = []  # Elements smaller than the pivot
    greater = []  # Elements greater than the pivot
    for element in arr:
        if element < pivot:
            smaller.append(element)
        else:
            greater.append(element)
    return smaller, greater

# Step 4: Recursion (O(log(k)) Depth)
function findQuantiles(arr, k):
    if k == 1:
        return [arr]  # Base case: return the entire set as one quantile
    median = findKthOrderStatistic(arr, k)
    smaller, greater = partitionSet(arr, median)
    quantiles = []
    quantiles.append(smaller)
    quantiles += findQuantiles(greater, k-1)
    return quantiles

# Main Function to Find kth Quantiles
function findKthQuantiles(arr, k):
    quantilePositions = preCalculateQuantilePositions(k)
    quantiles = findQuantiles(arr, k)
    result = []
    for position in quantilePositions:
        result.append(quantiles[position])
    return result


