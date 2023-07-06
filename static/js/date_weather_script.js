 
/*
For weather widget, site is using OpenWeather api (free version, 60 calls per minute)
Link for sample of API's JSON format:
https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22 
*/

const apiKey = "2576ecf2328c1aaf7d399b1466dfe23d";

// Function converts Kelvin nits fo Fahrenheit
let kelvToFahren = function(k)
{
	let f = (k - 273.15) * 9/5 +32;
	return f;
}

let zipCode = "95747";

const req = new XMLHttpRequest();
req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',&APPID=' + apiKey, true)

req.onload = function() 
{
	if (req.readyState == 4 && req.status == 200) 
 	{	
 		let data, temp, tempHigh, tempLow, getTemp, getTempHigh, getTempLow;
 		// Get response and parse it
 		data = JSON.parse(req.responseText)
 		// Convert api data temp from kelvin to fahrenheit
 		// Important reminder 
 		temp = parseInt(kelvToFahren(data.main.temp)) + String.fromCharCode(176) + "F";

 		getTemp = document.querySelector('.subhead-tw__cur');
 		getTemp.innerHTML = temp;

 		// Convert api data temp_max from kelvin to fahrenheit
 		tempHigh = parseInt(kelvToFahren(data.main.temp_max)) + String.fromCharCode(176);

 		getTempHigh = document.querySelector('.subhead-tw__high');
 		getTempHigh.innerHTML = tempHigh; 

 		// Convert api data temp_mins from kelvin to fahrenheit
 		tempLow = parseInt(kelvToFahren(data.main.temp_min)) + String.fromCharCode(176);

 		getTempLow = document.querySelector('.subhead-tw__low');
 		getTempLow.innerHTML = tempLow;


 		// get graphic icon
 		// FONT AWESOME:
	 		// Sunny -- <i class="fas fa-sun"></i>
	 		// Partly Cloudy -- <i class="fas fa-cloud-sun"></i>
	 		// Cloudy -- <i class="fas fa-cloud"></i>
	 		// Day Rain-- <i class="fas fa-cloud-rain"></i>
	 		// Night clear-- <i class="<i class="fas fa-moon"></i>"
	 		// Night cloudy-- <i class="fas fa-cloud-moon"></i>
	 		// Night rain-- <i class="fas fa-cloud-moon-rain"></i>
 		
 		let getIcon = function(main)
 		{	
 			// main = "Clouds";
 			let t, timeUTC, sunrise, sunset, iconElem;

 			t = new Date();
 			timeUTC = t.getTime();
 			//convert timeUTC to a 10 digit number
 			timeUTC = Number(timeUTC.toString().substr(0,10))
 			sunrise = Number(data.sys.sunrise);
 			sunset = Number(data.sys.sunset);
			
			iconElem = document.querySelector('.subhead-tw__icon');

			// If cloudy and daytime
 			if (data.weather[0].main == "Clouds" && (timeUTC > sunrise && timeUTC < sunset))
 			{
 				iconElem.innerHTML = '<i class="fas fa-cloud subhead-tw__iconSize s__color--night"></i>';
 				console.log('1')
 			}	
 			// If cloudy and nightime
 			else if (data.weather[0].main == "Clouds" && (timeUTC < sunrise || timeUTC > sunset))
 			{
 				iconElem.innerHTML = '<i class="fas fa-cloud-moon subhead-tw__iconSize s__color--night"></i>';
 				console.log('2')
 			}

 			// If clear and daytime
 			else if (data.weather[0].main == "Clear" && (timeUTC > sunrise && timeUTC < sunset))
 			{
 				iconElem.innerHTML = '<i class="fas fa-sun subhead-tw__iconSize s__color--sun"></i>';
 				console.log('3')
 			}

 			// If clear and night
 			else if (data.weather[0].main == "Clear" && (timeUTC < sunrise || timeUTC > sunset))
 			{
 				iconElem.innerHTML = '<i class="fas fa-moon subhead-tw__iconSize s__color--night"></i>';
 				console.log('4')
 			}

 			else
 			{
 				iconElem.innerHTML = '<i class="fas fa-temperature-high subhead-tw__iconSize"></i>';
 				console.log('5')
 			}
 			return true;
 		}
 		// Console kind of weather
	 	console.log(data.weather[0]['main']);
	 	getIcon(data.weather[0]['main']); 
 	}

	else
 	{
 		console.log('OpenWeather API error')
 		console.log(req.status)
 		return false;
 	}
}
req.send(null)

//Function returns today's date to the DOM
let getToday = function() 
{
	let d, weekday, date, monthNumber, year;
	d = new Date()
	weekday = d.getDay();
	date = d.getDate();
	monthNumber = d.getMonth();
	year = d.getFullYear();

	let weekdayName = function(num) 
	{	
		let today;
		switch (num)
		{
			case 0:
				today = "Sunday";
				break;
			case 1:
				today = "Monday";
				break;
			case 2:
				today = "Tuesday";
				break;
			case 3:
				today = "Wednesday";
				break;
			case 4:
				today = "Thursday";
				break;
			case 5:
				today = "Friday";
				break;
			case 6:
				today = "Saturday";
				break;
			default:
				today = "Today";
		}
		return today;
	}

	let getSuffix = function(date)
	{
		let suffix;
		
		if (date == 1 || date == 21 || date == 31)
		{
			suffix = 'st';
		}
		else if (date == 2 || date == 22)
		{
			suffix = "nd";
		}
		else if (date == 3 || date == 23)
		{
			suffix = "rd";
		}
		else
		{
			suffix = "th";
		} 

		return suffix
	}

	let monthName = function(num)
	{
		let month;
		switch (num)
		{
			case 0:
				month = "January";
				break;
			case 1:
				month = "February";
				break;
			case 2:
				month = "March";
				break;
			case 3:
				month = "April";
				break;
			case 4:
				month = "May";
				break;
			case 5:
				month = "June";
				break;
			case 6:
				month = "July";
				break;
			case 7:
				month = "August";
				break;
			case 8:
				month = "September";
				break;
			case 9:
				month = "October";
				break;
			case 10:
				month = "November";
				break;
			case 11:
				month = "December";
				break;
			default:
				month = num;			
		}
		return month;
	}

	let docWeekday, docMonth, docDate, docYear;
	docWeekday = document.querySelector('.header__weekday');
	docMonth = document.querySelector('.header__month');
	docDate = document.querySelector('.header__day');
	docYear = document.querySelector('.header__year');

	docWeekday.innerHTML = weekdayName(weekday) + ', ';
	docMonth.innerHTML = monthName(monthNumber);
	docDate.innerHTML = (date.toString() + getSuffix(date)) + ', ' ;
	docYear.innerHTML = year;
}

getToday();






