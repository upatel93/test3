/*********************************************************************************
* BTI325 – Test 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: _Ujjval_Patel_ Student ID: __153763214__ Date: _November 22, 2022_
*
* Online (Cyclic) URL:
*  https://good-shoe-fly.cyclic.app/
*
********************************************************************************/

const express = require('express');
const { resolve } = require('path');
const path = require('path');
const exphbs = require('express-handlebars');
const students = require('./data_prep');
const { request } = require('http');
const { response } = require('express');


const app = express();

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

let port = process.env.PORT || 8080;

let onStart = function (){
    console.log(`Express http server listening on ${port}`);
}

app.get("/",(request, response) => { // Home Route
    response.render("home");
});



app.get("/BSD",(request, response) =>{
    students.getBSD().then((data)=>{
        response.render("students",{students:data});
    }).catch((err)=>{
        response.send(err);
    })
});

app.get("/highGPA",(request, response) =>{
    students.highGPA().then((data)=>{
        response.render("student",{student:data[0]});
    }).catch((err)=>{
        response.send(err);
    })
});

app.get("/allStudents",(request,response)=>{
    students.allStudents().then((data)=>{
        response.render("students",{students:data});
    }).catch((err)=>response.send(err));
})

app.get("*",(request, response) =>{
    response.send("Error 404: page not found.");
});

students.init().then(function(){
    app.listen(port,onStart);
});
