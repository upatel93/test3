const fileSystem = require('fs'); // including for reading files
let students = []; // to hold the students in the array
let highestGPA = [];


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
        if(students.length == 0){
            reject("no results returned");
        }
        resolve(students);
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
            reject('"Failed finding the student with the highest GPA');
        }
        resolve(highestGPA);
    });

};