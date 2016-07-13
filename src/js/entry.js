'use strict'

import './utilities/isChromium'
import {retrieve, post} from './db'

let doc = document

const notYou = function() {
	console.log('reset');
	let resetStorage = document.createEvent('Event');
	resetStorage.initEvent('resetStorage');
	doc.dispatchEvent(resetStorage);
}

const showUser = function() {
	console.log('showUser');
	// check if user exists already
	let syncGetEvent = document.createEvent('Event');
	syncGetEvent.initEvent('syncGet');
	doc.dispatchEvent(syncGetEvent);
}

const setUser = function() {
	console.log('setUser');
	// looking good, now we push to extension storage sync
	let syncSetEvent = document.createEvent('Event');
	syncSetEvent.initEvent('syncSet');
	doc.dispatchEvent(syncSetEvent);

	doc.getElementById('form--set-user-output').textContent = ''
}

// wait a bit before showing content, so the extension (if installed) can update classes on the html node
setTimeout(()=>{

	doc.documentElement.classList.add('load-timeout')

	showUser()


}, 500)


let checkUserName = function() {

}



let setUserName = function(e) {

	e.preventDefault()
	let userValue = doc.getElementById('email').value

	// add a new user to the db, if successful, set a cookie
	post(userValue, function(result) {

		if (result === 'success') {

			setUser()

			// now update the view
			showUser()

			return
		}

		if (result === 302) {
			setUser()
			showUser()
			//doc.getElementById('form--set-user-output').textContent = 'That username already exists'
			return
		}

		if (result === 'err') {
			doc.getElementById('form--set-user-output').textContent = 'Problems.'
			return
		}

	})

}


doc.getElementById('form--set-user').addEventListener("submit", setUserName, false)
doc.getElementById('form--not-chrome').addEventListener("submit", setUserName, false)

doc.getElementById('resetStorage').addEventListener("click", notYou, false)



// document.getElementById('add-to-chrome').addEventListener('click', function(e) {
// 	chrome.webstore.install('apdfllckaahabafndbhieahigkjlhalf', function() {
// 		console.log('install');
// 	}), function() {
// 		console.log('fail install')
// 	}
// })
