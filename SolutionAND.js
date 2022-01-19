/**
* The following is the function where the solution shall be written

The following function takes a string input and provides all possible combinations of permutations as an output and performs the following - It uses two internal functions to swap elements and generate permutations
>> 1. Filters out numbers from the string input by removing all alphabetical, special characters and white spaces
>> 2. If no numbers are present then displays an error message, prompting user to intput numbers
>> 3. Turns the input string into an array of numbers - I felt using an array of numbers instead of a string allows more control over index manipulation
>> 4. Swaps the indexes of the numbers to be used in a permutation generation function
>> 5. Generates permutations for the given array of numbers
>> 6. Sorts the order of the permutations in descending order
>> 7. Maps out the final array of numbers back into a string for the output

*/

function solution(originalString) {

  //Output initialised empty
  let output = []
  //Input to be used to filter out numbers
  let string = ''
  //Array input to be used for permutations
  let arrayInput = []
  //Number regex test case for filtering
  let numberRegex = /[0-9]/g


  // 1. Filtering out numbers in initial string - If input string contains numbers then >>>
  if (numberRegex.test(originalString) === true) {
    let split = originalString.split('').filter((number) => !isNaN(number)).join('')
    let result = split.replace(/\s+/g, '')

    //input now ready to be turned in integers
    string += result

    // 3. Iterating through input and pushing integers to arrayInput (This array will be used for permuation)  
    for (let i = 0; i < string.length; i++) {
      let stringToInt = parseInt(string[i])
      arrayInput.push(stringToInt)
    }


    // 4. Function for initially swapping array elements
    //Will take the original array and swap them using the given indexes defined below
    //This function will be called recursively in the 'generate' function below
    const swapInPlace = (arrToSwap, indexA, indexB) => {
      const temp = arrToSwap[indexA]
      arrToSwap[indexA] = arrToSwap[indexB]
      arrToSwap[indexB] = temp
    }

    // 5. Recursive function to push array permutations to output
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

    // 6. Sorting elements in descending order
    output.sort((a, b) => {
      // Find the first index that's different between the two subarrays being compared
      const diffIndex = a.findIndex((itemA, i) => b[i] !== itemA);
      // Return the difference, so that the higher value will come first in the result
      // If no difference found, return 0 (so they will come next to each other)

      //Returning the highest number first
      return diffIndex === -1 ? 0 : b[diffIndex] - a[diffIndex];
    });

    // 7. Returning final output as a string
    return output.map(number => number.join('')).join()

  } else {
    // 2. Return message if the input string contains no numbers
    return 'The input must contain numbers!'
  }
}

// some example inputs
console.log(solution('326')); // expected ouput 632,623,362,326,263,236
console.log(solution('A 3B2 C6D')); // expected ouput 632,623,362,326,263,236
