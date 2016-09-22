const doc = document

export function getUserFromExtension() {

	console.log('getUserFromExtension')
	const event = new CustomEvent('extGetCurrentUser')
	doc.dispatchEvent(event)

}

export function setCurrentUser(username) {

	console.log('setCurrentUser')
	const event = new CustomEvent('extSetCurrentUser', {
		'detail': username
	})
	doc.dispatchEvent(event)

}

export function resetUserInExtension() {

	console.log('resetUserInExtension')
	const event = new CustomEvent('extResetStorage')
	doc.dispatchEvent(event)
}
