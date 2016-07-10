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


export function post(user) {

    let requestPost = new XMLHttpRequest();

    requestPost.open('POST', '/db?user=' + user, true);
    requestPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );

    requestPost.onreadystatechange = function () {
        // readystate 4 means 'complete'
        // status 200 means perfect
        if (requestPost.readyState !== 4 || requestPost.status !== 200) {
            return
        }

        if (requestPost.responseText !== 'err') {
            // all good in the hood
            console.log(requestPost.responseText);

        }

    };


    // need to encode the string so the xmlhttprequeset doesn't strip it
    requestPost.send();
};
