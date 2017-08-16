Achievos
==

A Chrome browser extension that rewards achievements for discovering websites.

While developing locally run
`npm start`
which starts the Gulp watch task as well as the Express server.

Livereload runs on `localhost:3000`.
Example of successful result:
`http://localhost:3000/request?url=zombo.com`

Deliberately not including the `urls.js` file in the Git repo as this is where the shheeecrets are.



Routes
===

/all
shows all users and their achievements

/db
with a query string of email address shown in database will show you that user. eg
http://localhost:8081/db?user=asdf@asdf.com

/request
with a query string of url. eg
http://localhost:8081/request?url=zombo.com
