const { convertCSVToArray } = require('convert-csv-to-array');
const converter = require('convert-csv-to-array');


const data ="username,Name,DOB\n1317007,Aditya Anand  ,1998-10-13\n1317038,Shivani Dhiman   ,1997-09-25\n1317036,Nancy,1999-09-17\n1317001,Allan,1992-12-04\n1317002,Rajo,1991-06-23\n1317003,Surrendar,2000-05-06\n1317004,Jitendar,1999-10-26\n1317005,Rahul,1999-03-08";

const option = {
    header: false,
    separator: ',',
};

var converted_data = convertCSVToArray(data,{
    header: false,
    type: 'object',
    separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
});
var final= converted_data.slice(1);

var users = JSON.parse(JSON.stringify(final),function(key,value){
    if(typeof value === 'string'){
        return value.trim();
    }
    return value;
});

// console.log(final);
console.log(users);
console.log(JSON.stringify(users[0].username));

// for (var i=0;i<final.length;i++){
//     var user = final[i];
//     for (var j =0;user.length;j++){
//         console.log(user[j]);
//     }
// }