const express = require('express');
const { resolve } = require('path');
const path = require('path');
const students = require('./test2_moduleA');

const app = express();


let port = process.env.PORT || 8080;

let onStart = function (){
    console.log(`Express http server listening on ${port}`);
}

app.get("/",(request, response) => { // Home Route
    response.send("<h2>Declaration</h2>"+ "<br><br>" + 
    "<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect "+
    "<br> whether my work is done remotely or onsite. Any test or assignment is an act of trust between <br>"+
    " me and my instructor, and especially with my classmate... even when no one is wtching. "+
    "<br>I declare I will not break that trust</p>" + 
    "<span>Name: </span>"+
    "<span style='background-color: yellow;' >Ujjval Patel</span>" + "<br> <br>"+ 
    "<span>Student: </span>"+ "<span style='background-color: yellow;' >153763214</span>"  + "<br><br>"+ 
    "<a href='/BSD'>Click to visit BSD Students</a>"+ "<br><br>"+
    "<a href='/highGPA'>Click to see who has the highest GPA</a>");
});

app.get("/BSD",(request, response) =>{
    students.getBSD().then((data)=>{
        response.json(data);
    })
});

app.get("/highGPA",(request, response) =>{
    students.highGPA().then((data)=>{
        response.send("<h4>Highest GPA:</h4>" + 
        "Student ID:" + 4 );
    })
});

app.get("*",(request, response) =>{
    response.send("Error 404: page not found.");
});

students.init().then(function(){
    app.listen(port,onStart);
});
