var doc = document
var host = window.location.href
var localStorangeVal = localStorage.getItem('Achievos Username')
var serviceUrl = 'http://localhost:3000/request?url=' + host + (localStorangeVal ? '&user=' + localStorangeVal : '')
var request = new XMLHttpRequest();

request.open('GET', serviceUrl);
request.responseType = 'json';
request.onload = function() {

	var response = request.response;

	console.log(response);

	if (response.default) {
		doc.documentElement.classList.add('achievos-installed')
	}

	// if there's a response, we have a winner
	if (!!response.title) {
		doc.body.onload = createNotification(response)
	}

}

request.onerror = function(e) {
	console.error('Achievos whoopsie', e)
}

request.send();

function createNotification(response) {

	// generate elements
	var wrapperDiv = doc.createElement('div')
	var titleAnchor = doc.createElement('a')
	var contentDiv = doc.createElement('div')
	var pointsDiv = doc.createElement('div')
	var iconDiv = doc.createElement('div');

	// create the icon http://www.flaticon.com/free-icon/achievement_142733
	var svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 485 485" xml:space="preserve"><path d="M257.5 217.1V0H104.5v131.3H227.5v85.8L0 462.9V485h485v-22.1L257.5 217.1zM314.9 323.3l-24.9 18 -47.5-34.2 -47.5 34.2 -24.9-18 72.4-78.2L314.9 323.3zM134.5 101.3V30h93v71.3H134.5zM48.2 455l101.3-109.5 45.5 32.8 47.5-34.2 47.5 34.2 45.5-32.8L436.8 455H48.2z"/></svg>'
	iconDiv.innerHTML = svgString

	// give them classes
	wrapperDiv.classList.add('achievos')
	iconDiv.classList.add('achievos-icon')
	titleAnchor.classList.add('achievos-title')
	pointsDiv.classList.add('achievos-points')

	// give them content
	titleAnchor.setAttribute('href', 'https://www.achievos.com')
	titleAnchor.setAttribute('target', '_blank')
	var titleContent = doc.createTextNode(response.title)
	var pointsContent = doc.createTextNode(response.points + ' points')

	// add each element to the main wrapper
	titleAnchor.appendChild(titleContent)
	pointsDiv.appendChild(pointsContent)
	contentDiv.appendChild(titleAnchor)
	contentDiv.appendChild(pointsDiv)
	wrapperDiv.appendChild(iconDiv)
	wrapperDiv.appendChild(contentDiv)

	// create the css
	var css = doc.createElement('style')
	css.type = "text/css"
	css.innerHTML = `
	.achievos {
		display: flex;
		position: fixed;
		top: 15px;
		left: 15px;
		color: #333;
		background-color: rgba(255, 255, 255, 0.9);
		font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
		line-height: 1;
		padding: 10px;
		max-width: 200px;
		border-radius: 2px;
		font-size: 16px;
		backdrop-filter: blur(3px) saturate(200%);
		border: 1px solid rgba(210,210,210,0.7);
		z-index: 1999999999;
		opacity: 0;
		transform: scale(0.80);
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
	}, 5000)

}
