/**
* The following is the function where the solution shall be written
*/

function solution(string) {

  //Output initialised empty
  let output = []
  //Input to be used to filter out numbers
  let string = ''
  //Array input to be used for permutations
  let arrayInput = []
  //Number regex test case for filtering
  let numberRegex = /[0-9]/g


  //Filtering out numbers in initial string - If input string contains numbers then >>>
  if (numberRegex.test(arr) === true) {
    let split = arr.split('').filter((number) => !isNaN(number)).join('')
    let result = split.replace(/\s+/g, '')

    //input now ready to be turned in integers
    string += result

    //Iterating through input and pushing integers to arrayInput (This array will be used for permuation)  
    for (let i = 0; i < string.length; i++) {
      let stringToInt = parseInt(string[i])
      arrayInput.push(stringToInt)
    }


    //Function for initially swapping array elements
    //Will take the original array and swap them using the given indexes defined below
    //This function will be called recursively in the 'generate' function below
    const swapInPlace = (arrToSwap, indexA, indexB) => {
      const temp = arrToSwap[indexA]
      arrToSwap[indexA] = arrToSwap[indexB]
      arrToSwap[indexB] = temp
    }

    //Recursive function to push array permutations to output
    //For every push, the function will subtract n moving on to the next element in the array
    const generate = (n, inputArr) => {
      if (n === 1) {
        output.push(inputArr.slice())
        return;
      } generate(n - 1, inputArr)

      //Iterating through inidividual numbers in the array
      for (let i = 0; i < n - 1; i++) {
        if (n % 2 === 0) {
          swapInPlace(inputArr, i, n - 1)
        } else {
          swapInPlace(inputArr, 0, n - 1)
        }

        generate(n - 1, inputArr)
      }
    }

    //Calling recursive generate function 
    //using slice to ensure purity of the function and not modifying the original array
    generate(arrayInput.length, arrayInput.slice())

    //Sorting elements in descending order
    output.sort((a, b) => {
      // Find the first index that's different between the two subarrays being compared
      const diffIndex = a.findIndex((itemA, i) => b[i] !== itemA);
      // Return the difference, so that the higher value will come first in the result
      // If no difference found, return 0 (so they will come next to each other)

      //Returning the highest number first
      return diffIndex === -1 ? 0 : b[diffIndex] - a[diffIndex];
    });

    //Returning final output as a string
    return output.map(number => number.join('')).join()

  } else {
    //Return message if the input string contains no numbers
    return 'The input must contain numbers!'
  }
}

// some example inputs
console.log(solution('326')); // expected ouput 632,623,362,326,263,236
console.log(solution('A 3B2 C6D')); // expected ouput 632,623,362,326,263,236
