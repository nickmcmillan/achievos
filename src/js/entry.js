'use strict'

import {retrieve, post} from './db'

let doc = document


// has localstorage been set?
let checkUserName = function() {

	if (localStorage.getItem('Achievos Username') === null) {

		doc.documentElement.classList.remove('user-set--true')
		doc.documentElement.classList.add('user-set--false')

	} else {

		doc.documentElement.classList.remove('user-set--false')
		doc.documentElement.classList.add('user-set--true')
		doc.getElementById('you').textContent = localStorage.getItem('Achievos Username');

	}

}



let setUserName = function(e) {
	e.preventDefault()
	let userValue = doc.getElementById('email').value

	// add a new user to the db.
	post(userValue)



	localStorage.setItem('Achievos Username', userValue)

	checkUserName()
}

checkUserName()




doc.getElementById('form--set-user').addEventListener("submit", setUserName, false)
doc.getElementById('form--not-chrome').addEventListener("submit", setUserName, false)



document.getElementById('add-to-chrome').addEventListener('click', function(e) {
	chrome.webstore.install('apdfllckaahabafndbhieahigkjlhalf', function() {
		console.log('install');
	}), function() {
		console.log('fail install')
	}
})


// http://stackoverflow.com/a/13348618
var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
   // is Google Chrome on IOS
} else if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
   // is Google Chrome
} else {
   doc.documentElement.classList.add('not-chrome')
}
