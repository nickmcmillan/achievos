'use strict'

import './utilities/isChromium'
import {retrieveUserData, postUserData} from './db'
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

	const userValue = doc.getElementById('email').value

	postUserData(userValue, function(result) {

		if (result === 200 || result === 302) {
			setCurrentUser(userValue)
			getUserFromExtension()
			return
		}

		if (result === 'err') {
			doc.getElementById('form--set-user-output').textContent = `Problems. ${result}.`
		}

	})

}


doc.addEventListener('loginEvent', (e) => {

	// if the user is logged in
	if (e.detail) {
		console.log('loginEvent', e.detail);
		doc.documentElement.classList.remove('user-set--false')
		doc.documentElement.classList.add('user-set--true')

		const p = doc.getElementById('you')

		p.textContent = `You've logged in as ${e.detail}. `

		const button = document.createElement('button')
		button.classList.add('button-inline')
		button.textContent = 'Not you?'
		button.addEventListener('click', resetUserInExtension, false)

		p.appendChild(button)

		retrieveUserData(e.detail, function(result) {

			if (result !== 'err') {
				render(result.achievements)
			} else {
				console.log('fail on server')
			}

		})


	} else {
		doc.documentElement.classList.remove('user-set--true')
		doc.documentElement.classList.add('user-set--false')
		doc.getElementById('you').textContent = ''
	}

})

doc.getElementById('form--set-user').addEventListener('submit', setUserName, false)
doc.getElementById('form--not-chrome').addEventListener('submit', setUserName, false)


doc.getElementById('add-to-chrome').addEventListener('click', function(e) {

	chrome.webstore.install('apdfllckaahabafndbhieahigkjlhalf', function() {
		console.log('install');
	}), function() {
		console.log('fail install')
	}
})
