'use strict'

import './utilities/isChromium'
import {retrieve, post} from './db'
import {resetUserInExtension, getUserFromExtension, setCurrentUser} from './eventInits'
import {render} from './render'


const doc = document

// wait a bit before showing content, so the extension (if installed)
// can update classes on the html node in the background
setTimeout(()=>{

	doc.documentElement.classList.add('load-timeout')

	// first thing to do is see if the user is logged in
	getUserFromExtension()

}, 500)


const setUserName = function(e) {

	e.preventDefault()
	let userValue = doc.getElementById('email').value

	post(userValue, function(result) {

		if (result === 200 || result === 302) {
			setCurrentUser(userValue)
			getUserFromExtension()
			return
		}

		if (result === 'err') {
			doc.getElementById('form--set-user-output').textContent = 'Problems.'
			return
		}

	})

}

const renderResults = function(username) {

	retrieve(username, function(result) {

		if (result !== 'err') {
			//console.log(result);
			render(result.achievements)

		} else {
			console.log('fail on server')
		}


	})

}

doc.addEventListener('loginEvent', (e) => {


	// if the user is logged in
	if (e.detail) {
		console.log('loginEvent', e.detail);
		doc.documentElement.classList.remove('user-set--false')
		doc.documentElement.classList.add('user-set--true')
		doc.getElementById('you').textContent = 'You\'ve logged in as ' + e.detail

		renderResults(e.detail)

	} else {
		doc.documentElement.classList.remove('user-set--true')
		doc.documentElement.classList.add('user-set--false')
		doc.getElementById('you').textContent = ''
	}

})

doc.getElementById('form--set-user').addEventListener("submit", setUserName, false)
doc.getElementById('form--not-chrome').addEventListener("submit", setUserName, false)
doc.getElementById('resetStorage').addEventListener("click", resetUserInExtension, false)


doc.getElementById('add-to-chrome').addEventListener('click', function(e) {

	chrome.webstore.install('apdfllckaahabafndbhieahigkjlhalf', function() {
		console.log('install');
	}), function() {
		console.log('fail install')
	}
})
