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
