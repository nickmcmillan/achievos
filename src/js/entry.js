'use strict'

import './utilities/isChromium'
import {retrieve, post} from './db'
import docCookies from './utilities/cookies'


let doc = document

// wait a bit before showing content, so the extension (if installed) can update classes on the html node
setTimeout(()=>{
	doc.documentElement.classList.add('load-timeout')
}, 500)


// has cookie been set?
let checkUserName = function() {


	if ( docCookies.getItem('Achievos Username') === null ) {

		doc.documentElement.classList.remove('user-set--true')
		doc.documentElement.classList.add('user-set--false')

	} else {

		doc.documentElement.classList.remove('user-set--false')
		doc.documentElement.classList.add('user-set--true')
		doc.getElementById('you').textContent = docCookies.getItem('Achievos Username')

	}

}



let setUserName = function(e) {

	e.preventDefault()
	let userValue = doc.getElementById('email').value

	// add a new user to the db, if successful, set a cookie
	post(userValue, function(result) {

		//console.log(result);

		if (result === 'success') {

			// looking good, now we push to extension storage sync
			let syncSetEvent = document.createEvent('Event');
			syncSetEvent.initEvent('syncSet');
			doc.dispatchEvent(syncSetEvent);

			checkUserName()
			return
		}

		if (result === 302) {
			doc.getElementById('form--set-user-output').textContent = 'User already exists'
			return
		}

		if (result === 'err') {
			doc.getElementById('form--set-user-output').textContent = 'Problems'
			return
		}

	})


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
