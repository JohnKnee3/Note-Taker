Configure an Express.js back end to serve static HTML files.

Configure an Express.js back end to create an API to handle GET and POST requests.

Parse parameters in server-side routes.

Submit form data to a server.

Implement separation of concerns for routing.

Deploy a server-side application to the Heroku platform.

As of 11.1.7
https://stormy-river-62917.herokuapp.com/api/animals
this will test querys

http://localhost:3001/api/animals/1
will work for both query and params

this may be functioning as intended??

11.1.3 Set up the initial files. The big thing here was we set up a new style of file called animals.json in the data folder which holds an object that has an array named "animals" inside of it. Made an empty server.js in the root.
11.1.4 Used npm init -y and then npm i express to install express.js. Then in server.js we required it, then added --const app = express();-- and finally opened a port for 3001 using app.listen().
11.1.5 The start of using .send to test if things work and then .get to actually grab the objects array from the animals.json. Then we set up filterByQuery function and called it in the .get so when we use the browser looks like this --http://localhost:3001/api/animals?name=Erica-- we can get Erica's object by her name. Very dense. May need to read agian.
11.1.6 We set up our Heroku and Heroku CLI. We use git add -A, git commit -m "Add Heroku" & git push heroku feature/MVP:main. You can use the address above to open the page or heroku open. Though I have never gotten both to work at the same time.
11.1.7 Created a get using params instead of query to search by id/ Params shows up before the "?" while query shows up after.
11.2.3 Introduced to the idea of POST instead of GET. POST allows the client to add things to the database. Quick example of the syntax is --app.post("/api/animals", (req, res) => {console.log(req.body); res.json(req.body)})-
11.2.4 Installed Insomnia which needed a step the module was unawate of. Then we used insomia to test our GET's to make sure things are working. Then we tried a POST to send in an animal ogbject. This passed but came back as undefined bbecause our server does not know how to convert the sent in object to the json format yet.
11.2.5 Introduced --app.use(express.urlencoded({ extended: true }));-- and --app.use(express.json());-- set up the data to be used by req.body and then converts it into the json format.
11.2.6 Created a function to handle adding a new animalsArray. Then we required fs and path to make it so we can write the files and convert them to json to add to the animals.json file. Finally we added some validation to make sure everything in the object appears before we add it to the page. If just one item is missing we spit out an error and do not add to the page.
11.3.3 Downloaded the front end files and put them all in the newly created public folder. Then we just looked over the files to get an idea of where we are heading.
11.3.4 Used app.get with sendFile(path.join) to go get the index.html in the public folder and display it to the browser. Then we used an express function --app.use(express.static("public"));-- to make sure all files in the "public" folder are referenced each time the page is deployed.
11.3.5 Used Fetch to get the HTML to talk to our api/animals POST and performs it's function to put the newly created data from the frant end into the back end.
11.3.6 Used 3 new app.get senfFile's to get the animals.html and zookeeper.html to display. The third we added was a catch all that returns you to the index.html if you select something that is not valid.
11.3.7 Added a new fetch that went to our server.js which then went into animals.json and got the info we needed to diplay to the page. Then it used the printResults() already built for us to actually create the boxes to display it to the page. I may have to reread this one so I can understand it better.
11.4.3 We moved all of the functions from our server.js to the animals.js in the lib folder. Then we added the requires for the fs and path up top and used module.export to kick them out at the bottom.
11.4.4 Introduced to ROUTER and separated a ton of things out of the server.js. Really dense stuff that will have to referenced to understand. But essentially ROUTER lets us use express() everywhere without constantly creating NEW express calls. It can work with the existing call and send it through several files. The require looks like this --const router = require('express').Router();-- we change all the app.get to router.get etc.. and we export it like this --module.exports = router;--.
11.4.5 Set up tests for the functions in the animals.js file. Added jest.mock("fs") to make sure the tests don't actually create and add things to the back end while we are simply trying to test to see if it works.
