export function retrieve(username, callback) {


    const requestGet = new XMLHttpRequest();

	requestGet.open('GET', '/db?user=' + username, true);

    requestGet.onload = function() {

        if (requestGet.status >= 200 && requestGet.status < 400) {
			callback(JSON.parse(requestGet.responseText))
        } else {
			callback('err')
        }
    };

	requestGet.onerror = function() {
		callback('err')
	}

	requestGet.send();

}


export function post(username, callback) {

    const requestPost = new XMLHttpRequest();

    requestPost.open('POST', 'http://localhost:8081/db?user=' + username, true);
    requestPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );

    requestPost.onreadystatechange = function () {

        // readystate 4 means 'complete'
        // status 200 means 'ok'
        if (requestPost.readyState !== 4) {
            return
        }

		// user exists already
		if (requestPost.status === 302) {
			callback(302)
			return
		}

        if (requestPost.responseText !== 'err') {
            // all good in the hood
            //console.log(requestPost.responseText);
			callback(200)
        }

    };

	requestPost.onerror = function() {
		callback('err')
	}


    // need to encode the string so the xmlhttprequeset doesn't strip it
    requestPost.send();
};
