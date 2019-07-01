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

// data.forEach(movie => 
// {
//   // Log each movie's title
//   console.log(movie.title);
// })

// }

// Send request
// request.send();

// Promise.all([
//   fetch('big.txt').then(x => x.text())
// ]).then(([sampleResp]) => {
// 	console.log(sampleResp[1000]);
//   console.log(sampleResp);
// });

var words = [];
var wordsMap = {};
var api_key = 'dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf';

fetch('big.txt')
  .then(response => response.text())
  .then((text) => {
// words = text.split(" ");
words = text.split(/\s+/);
// console.log(words);

// for (var i = 0; i < words.length; i++) {
//   var num = words[i];
//   counts[num] = counts[num] ? counts[num] + 1 : 1;
// }

  words.forEach(function (key)
  {
    if (wordsMap.hasOwnProperty(key))
    {
      wordsMap[key]++;
    }
    else
    {
      wordsMap[key] = 1;
    }
  });

// console.log(wordsMap);

  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function (key) {
    return {
      name: key,
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function (a, b) {
    return b.total - a.total;
  });

  // console.log(finalWordsArray);
  for (var i = 0; i < 10; ++i)
  {
  	console.log(finalWordsArray[i].name + ": " + finalWordsArray[i].total);
  }

  	function getSynonymsPOS(word, num)
  	{
	  	var xhr2 = new XMLHttpRequest();
	  	var url_dict = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + api_key + '&lang=en-en&text=' + JSON.stringify(word);

	  	xhr2.responseType = 'json';
		xhr2.onreadystatechange = () => 
		{
		  if (xhr2.readyState === XMLHttpRequest.DONE)
		    {
		      // return xhr2.response;
		      finalWordsArray[num].result = xhr2.response;
		    }
		}
	  	xhr2.open('GET', url_dict);
	  	xhr2.send();
  	}


  	let promises = [];
	for (i = 0; i < 10; ++i)
	{
		promises.push(getSynonymsPOS(finalWordsArray[i].name, i));
	}

	Promise.all(promises);
	for (var j = 0; j < 10; ++j)
	{
		console.log(finalWordsArray[j]);
	}
});