# Project Pink Point

An application for easily tracking climbing routes.

Prepare:

    `npm install -g sails`
    
    `npm install`

Host application / api:

    `sails lift`

Run tests:

    `mocha`

In order to import the routes from Kletterzentrum, run:

	`sails console`
	
	and
	
	`Kletterzentrum.importRoutes();`

Execute the requests in folder postman against the running application.
