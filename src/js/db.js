export function retrieve(user) {

    let requestGet = new XMLHttpRequest();

	requestGet.open('GET', '/db?user=' + user, true);

    requestGet.onload = function() {

        if (requestGet.status >= 200 && requestGet.status < 400) {
            console.log(requestGet.responseText)

        } else {
            console.log('fail')
        }
    };

	requestGet.send();

}


export function post(user, callback) {

    let requestPost = new XMLHttpRequest();

    requestPost.open('POST', 'http://localhost:8081/db?user=' + user, true);
    requestPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );

    requestPost.onreadystatechange = function () {

		//console.log(requestPost.status);

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
			callback('success')
        }

    };

	requestPost.onerror = function() {
		callback('err')
	}


    // need to encode the string so the xmlhttprequeset doesn't strip it
    requestPost.send();
};
