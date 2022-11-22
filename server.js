/*********************************************************************************
* BTI325 – Test 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: _Ujjval_Patel_ Student ID: __153763214__ Date: _October 18, 2022_
*
* Online (Cyclic) URL:
*  https://good-shoe-fly.cyclic.app/
*
********************************************************************************/

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
    }).catch((err)=>{
        response.send(err);
    })
});

app.get("/highGPA",(request, response) =>{
    students.highGPA().then((data)=>{
        response.send(
        "<h4>Highest GPA:</h4>" +
        "<p>Student ID: " + data[0].studId +"</p>"+
        "<p>Student Name: "+ data[0].name + "</p>"+
        "<p>Program: "+ data[0].program + "</p>"+
        "<p>Student GPA: "+ data[0].gpa + "</p>"
        );
    })
});

app.get("*",(request, response) =>{
    response.send("Error 404: page not found.");
});

students.init().then(function(){
    app.listen(port,onStart);
});
