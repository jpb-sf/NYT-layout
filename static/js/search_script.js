

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

console.log('window width is ' + window.innerWidth)

let returnQuery = function(q)
{	
	// Window.open() opens new tab
	window.open("https://www.nytimes.com/search?query=" + q);

	return false
}


