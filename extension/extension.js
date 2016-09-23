const local = false

const doc = document
const host = window.location.href
const environment = local ? 'http://localhost:8081' : 'https://www.achievos.xyz'

chrome.storage.sync.get('achievos', (obj) => {

	// if it exists, add the saved username into the query string
	const username = obj.achievos ? obj.achievos : null
	const serviceUrl = `${environment}/request?url=${host}${username ? '&user=' + username : ''}`
	const request = new XMLHttpRequest()

	request.open('GET', serviceUrl)
	request.responseType = 'json'
	request.onload = function() {

		const response = request.response;

		//console.log('from service', response);

		// if there's a response, we have a winner
		if (!!response) {
			doc.body.onload = createNotification(username, response)
		}

	}

	request.onerror = function(e) {
		console.error('Achievos whoopsie', e)
	}

	request.send()
})


function createNotification(username, response) {

	// generate elements
	const wrapperDiv = doc.createElement('div')
	const titleAnchor = doc.createElement('a')
	const contentDiv = doc.createElement('div')
	const pointsDiv = doc.createElement('div')
	const iconDiv = doc.createElement('div');

	// create the icon http://www.flaticon.com/free-icon/achievement_142733
	const svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 485 485" xml:space="preserve"><path d="M257.5 217.1V0H104.5v131.3H227.5v85.8L0 462.9V485h485v-22.1L257.5 217.1zM314.9 323.3l-24.9 18 -47.5-34.2 -47.5 34.2 -24.9-18 72.4-78.2L314.9 323.3zM134.5 101.3V30h93v71.3H134.5zM48.2 455l101.3-109.5 45.5 32.8 47.5-34.2 47.5 34.2 45.5-32.8L436.8 455H48.2z"/></svg>'
	iconDiv.innerHTML = svgString

	// give them classes
	wrapperDiv.classList.add('achievos')
	iconDiv.classList.add('achievos-icon')
	titleAnchor.classList.add('achievos-title')
	pointsDiv.classList.add('achievos-points')

	// give them content
	titleAnchor.setAttribute('href', 'https://www.achievos.xyz')
	titleAnchor.setAttribute('target', '_blank')
	let titleContent = doc.createTextNode(response.title)
	let pointsContent = doc.createTextNode(username ? response.points + ' points' : 'Login to grab some points!')

	// add each element to the main wrapper
	titleAnchor.appendChild(titleContent)
	pointsDiv.appendChild(pointsContent)
	contentDiv.appendChild(titleAnchor)
	contentDiv.appendChild(pointsDiv)
	wrapperDiv.appendChild(iconDiv)
	wrapperDiv.appendChild(contentDiv)

	// create the css
	let css = doc.createElement('style')
	css.type = "text/css"
	css.innerHTML = `
	.achievos {
		display: flex;
		position: fixed;
		top: 20px;
		left: 20px;
		color: #333;
		background-color: rgba(255, 255, 255, 0.9);
		font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
		line-height: 1;
		padding: 20px;
		max-width: 300px;
		border-radius: 2px;
		font-size: 16px;
		backdrop-filter: blur(3px) saturate(200%);
		border: 1px solid rgba(210,210,210,0.7);
		z-index: 1999999999;
		opacity: 0;
		transform: scale(0.96);
		text-align: left;
		visibility: hidden;
		transition: transform 200ms cubic-bezier(0.65, 0.05, 0.14, 1.7), opacity 200ms, visibility 200ms, backdrop-filter 800ms;
		will-change: opacity, transform, visibility, backdrop-filter;
	}
	.achievos-icon {
		padding: 1px 15px 0 0;
		flex-shrink: 0;
	}
	.achievos-icon svg {
		width: 30px;
	}
	.achievos-title {
		font-weight: bold;
		padding-bottom: 5px;
		margin: 0;
		text-decoration: none;
		color: #333;
		display: inline-block;
	}
	.achievos-title:hover {
		text-decoration: underline;
	}
	.achievos--visible {
		opacity: 1;
		transform: none;
		visibility: visible;
	}
	.achievos:hover {
		backdrop-filter: blur(15px) saturate(200%);
	}
	`;

	doc.getElementsByTagName('head')[0].appendChild(css)
	doc.body.appendChild(wrapperDiv)

	setTimeout(function() {
		wrapperDiv.classList.add('achievos--visible')
	}, 500)

	setTimeout(function() {
		wrapperDiv.classList.remove('achievos--visible')
	}, 8000)

}


// achievos website stuff
// change classes on achievos website
if (host.indexOf('localhost'.toLowerCase()) >= 0 || host.indexOf('achievos'.toLowerCase()) >= 0) {
	doc.documentElement.classList.add('achievos-installed--true')
	doc.documentElement.classList.remove('achievos-installed--false')
}


doc.addEventListener('extSetCurrentUser', (e)=> {

	const username = e.detail

	// save user data
	chrome.storage.sync.set({'achievos': username}, function() {
		//console.log('saved to chrome.storage.sync')
	})

})


doc.addEventListener('extGetCurrentUser', (e)=> {

	chrome.storage.sync.get('achievos',(ok)=> {

		const event = new CustomEvent('loginEvent', {
			'detail': ok.achievos ? ok.achievos : null
		});

		document.dispatchEvent(event)

	})

})


doc.addEventListener('extResetStorage',()=> {
	chrome.storage.sync.clear(()=>{
		doc.documentElement.classList.remove('user-set--true')
		doc.documentElement.classList.add('user-set--false')
		doc.getElementById('you').textContent = ''
		doc.getElementById('progress').textContent = ''
	})
})
