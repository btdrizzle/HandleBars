// Dependencies
var express = require("express");
var mysql = require("mysql");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Geauxtigers1",
    database: "seinfeld_db"
});
  
  // Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/cast", function(req,res) {
    connection.query("SELECT * FROM actors ORDER BY id",function(err,result) {
        res.json(result);
    })
});
app.get("/coolness-chart", function(req,res) {
    connection.query("SELECT * FROM actors ORDER BY coolness_points DESC",function(err,result) {
        res.json(result);
    })
});
app.get("/attitude-chart/:att", function(req,res) {
    let att = req.params.att;
    connection.query(`SELECT * FROM actors WHERE attitude='${att}'`, function(err,result) {
        const html = (`<h1>Actors with Attitude of ${att}<h1>`);
        html +=  ('<ul>')
        result.forEach(actor => {
            html += "<li><p> Name " + actor.name + "</p>";
            html += "<p>School: " + result[i].name + " </p></li>";
        })
        html += ('</ul>');
    })
});




app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});