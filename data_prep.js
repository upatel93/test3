const { rejects } = require('assert');
const fileSystem = require('fs'); // including for reading files
const { resolve } = require('path');
let students = []; // to hold the students in the array
let highestGPA = [];
let bsdStudents = []; // to hold bsd students..


module.exports.init = function(){
    return new Promise((resolve, reject) => {
        fileSystem.readFile('./students.json', (error, data) => { // reading file
          if (error) {  // if file isnt found or any issue with file
            reject("unable to read file");
          }
          else{ // if successfull
          students = JSON.parse(data);
          resolve();
          }
        });
    });
}

module.exports.getBSD = function(){
    return new Promise((resolve,reject)=>{
        bsdStudents = []; // to clear

        for( let i of students){
            if(i.program == "BSD"){
                bsdStudents.push(i);
            }
        }

        if(bsdStudents.length == 0){
            reject("No results returned");
        }
        resolve(bsdStudents);
    });
};

module.exports.highGPA = ()=>{
    return new Promise((resolve, reject)=>{
        for(let i of students){
            if(i.gpa == 4){
                highestGPA.push(i)
            }
        }
        if(highestGPA.length == 0){
            reject('Failed finding the student with the highest GPA');
        }
        resolve(highestGPA);
    });

};

module.exports.allStudents = ()=>{
    return new Promise ((resolve,reject)=>{
        if(students.length > 0){
            resolve(students);
        }
        else{
            reject("No Students");
        }
    })
}