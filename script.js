// Create a request variable and assign a new XMLHttpRequest object to it.
// var request = new XMLHttpRequest();
// XMLHttpRequest.requestType = "text";

// Open a new connection, using the GET request on the URL endpoint

// request.open('GET', 'http://norvig.com/big.txt', true)

// request.onload = function ()
// {


// // Begin accessing JSON data here
// var data = JSON.parse(this.response);

// console.log(data);

var words = []; // Array of words from txt file.
var wordsMap = {}; // To create map of words and their frequency.
var api_key = 'dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf'; // API key to call Yandex.

fetch('big.txt') // Currently fetching directly from txt, and saving the stream in a variable "text". 
  .then(response => response.text())
  .then((text) => {
  
  // words = text.split(" ");
  words = text.split(/\s+/); // Removing spaces and gathering words in array.
  // console.log(words);

  // Now creating a map of words and their frequency.

  words.forEach(function (key)
  {
    if (wordsMap.hasOwnProperty(key))
    {
      wordsMap[key]++; // Increment count of a word if it already exists.
    }
    else
    {
      wordsMap[key] = 1; // Assign a count of 1.
    }
  });

// console.log(wordsMap);

  var finalWordsArray = []; // Array of objects.
  finalWordsArray = Object.keys(wordsMap).map(function (key) {
    return
    {
      name: key,
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function (a, b) // Sort in descending order.
  {
    return b.total - a.total;
  });

  // console.log(finalWordsArray);
  for (var i = 0; i < 10; ++i) // Print top 10 frequently occuring words.
  {
    console.log(finalWordsArray[i].name + ": " + finalWordsArray[i].total);
  }

  function getSynonymsPOS(word, num) // Function to make API call to Yandex for synonyms and POS.
  {
	  	var xhr2 = new XMLHttpRequest();
	  	var url_dict = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + api_key + '&lang=en-en&text=' + JSON.stringify(word);

	  	xhr2.responseType = 'json';
		xhr2.onreadystatechange = () => 
		{
		  if (xhr2.readyState === XMLHttpRequest.DONE)
		    {
		      // return xhr2.response;
		      finalWordsArray[num].result = xhr2.response; // Add result to finalWordsArray object. 
		    }
		}
	  	xhr2.open('GET', url_dict);
	  	xhr2.send();
  }


  let promises = []; // Create array to execute all API calls through promises.
  for (i = 0; i < 10; ++i)
  {
	promises.push(getSynonymsPOS(finalWordsArray[i].name, i)); 
  }

  Promise.all(promises); //Execute all as promises.
	
  for (var j = 0; j < 10; ++j)
  {
	console.log(finalWordsArray[j]); // Output as JSON objects.
  }
});
