const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
const {ObjectId} = require('mongodb');



async function checkifinputexists(vari) {
    if(!vari)
    throw "No input is provided in some field";
}

async function checkifstring(vari){
    if(typeof(vari)!=="string")
    throw 'Input is not a string';
}

async function checkifemptystring(vari){
if(vari.trim().length===0)
throw "string cant be empty or all white spaces";

}

async function checkifarray(vari){
    if(!Array.isArray(vari))
    throw "input is not array";
}

async function checkifproperflightcode(vari){ 
     //flight code is alphanumeric; first character has to be an aplhabet//min length 2; max length:6
    if(!vari)
    throw "No flight code provided";

    if(typeof(vari)!=="string")
    throw 'flight code is not a string';
    if(vari.trim().length===0)
    throw "flight code cant be empty or all white spaces";

    vari=vari.trim()
    vari=vari.toUpperCase()

    if(!isAlphaNumeric(vari))
    throw "flight code can have only alphanumeric value"
  
    if(!vari[0].match(/[a-z]/i))
    throw "first character of flight code should be an alphabet"
    
    if(vari.length<2)
    throw "minimum length of flight code  should be two"

    if(vari.length>6)
    throw "maximum length of flight code is 6 "

    return vari
}

//right
async function checkifproperdeparr(vari){
    // departure and arrival should be string, alphabets, min length 2, max length 20
    if(!vari)
    throw "No departure or arrival city is provided";
    if(typeof(vari)!=="string")
    throw 'departure or arrival is not a string';
    if(vari.trim().length===0)
    throw "departure or arrival city cant be empty or all white spaces";

    vari=vari.trim()
    vari=vari.toLowerCase()

    if(!(/^[A-Za-z\s]*$/.test(vari)))
    throw 'city can only have alphabets'

    if(vari.length<2)
    throw "minimum length of arrival and departure cities  should be two"

    if(vari.length>30)
    throw "maximum length of arrival and departure cities should be 30 "

    return vari
}

//right
async function checkifproperDate(date){
    if(!date) throw 'No date passed';
    if(typeof date!=='string') throw 'date must be valid string';
    if(date.trim().length==0) throw 'date can not be empty string';
    const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    date=date.trim();
    var c_year = new Date().getFullYear();  
    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    arr=date.split('-');
    if(arr.length !== 3){
        throw 'invalid Date';
    }

    month=arr[1];
    day=arr[2];
    year=arr[0];

    if(month.length!==2 || day.length!==2 || year.length!==4){
        throw 'invalid Date';
    }


    if(re_for_specialcharacter.test(month) || re_for_specialcharacter.test(day) || re_for_specialcharacter.test(year)){
        throw 'invalid Date';
    }

    month= Number(month);
    day= Number(day);
    year= Number(year);


    if(!Number.isInteger(month) || !Number.isInteger(day)  || !Number.isInteger(year)){
        throw 'invalid Date';
    }

    if(month<0 || month>12){
        throw 'invalid Date';
    }
    if(month==2){
        if(day>28){
            throw 'invalid Date';
        }
    }
    if(day>ListofDays[month-1]){
        throw 'invalid Date';
    }
    return date;
}

//right
async function checkifproperNoOfPass(NoOfPass){
    if(!NoOfPass) throw 'No passengers passed!';
    if(typeof NoOfPass !== 'number') throw 'Number of passengers is not a number.';
    return NoOfPass;
}

async function checkifproperarrdepttime(vari){
   // must be in format hh:mm eg 00:01,00:11,18:12
   if(!vari)
   throw "No arrival or departure time is provided";

   if(typeof(vari)!=="string")
   throw 'departure or arrival time is not a string';
   if(vari.trim().length===0)
   throw "departure or arrival time cant be empty or all white spaces";

   vari=vari.trim()

   let regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
   if (!regex.test(vari))
   throw 'not proper arrival/departure time format'

   return vari

}

async function checkifproperduration(vari){
//must be in the format _._h _._m eg 19h 23m
if(!vari)
   throw "No duration is provided";

   if(typeof(vari)!=="string")
   throw 'duration is not a string';
   if(vari.trim().length===0)
   throw "duration cant be empty or all white spaces";

   vari=vari.trim()


return vari
}


async function checkifpropermiles(vari){
//must be a positive number less than 9538 miles
   if(!vari)
   throw "miles not provided";

   if(typeof(vari)!=="number")
   throw 'miles is not a number';
   if(!(Number.isInteger(Number(vari)) && Number(vari) > 1 && Number(vari)<9538))
   throw "not proper miles , should be an integer between 1 and 9538"

}

//right
async function checkifproperclasstype(vari){

    if(!vari)
    throw "class name not provided";
 
    if(typeof(vari)!=="string")
    throw 'class name is not a string';
    if(vari.trim().length===0)
    throw "class name cant be empty or all white spaces";
 
    vari=vari.trim() 
    vari=vari.toLowerCase()
    if(vari!=="economy" && vari!=="business" && vari!=="first" && vari!=="premium economy")
    throw "please provide a valid flight class - economy,business,premium economy or first class"

    return vari
}

async function checkifproperclasscapacity(vari){
    // should be a number less than 500*2
    if(!vari)
    throw "class capacity not provided";
 
    if(typeof(vari)!=="number")
    throw 'class capacity is not a number';
    //if(vari.trim().length===0)
   // throw "class capacity cant be empty or all white spaces";
 
    //vari=vari.trim() 
    if(!(Number.isInteger(Number(vari)) && Number(vari) >= 0 && Number(vari)<1000))
    throw "capacity should be between 0 and 1000"

    return vari
}

async function checkifproperprice(vari){
    //should be a positive integer less than 100000
    if(!vari)
    throw "class price not provided";
 
    if(typeof(vari)!=="number")
    throw 'class price is not a number';
    if(!(Number.isInteger(Number(vari)) && Number(vari) >= 0 && Number(vari)<100000))
    throw "price should be between 0 and 100000"
    return vari
}


async function checkifproperfoodchoices(vari){
    if(!vari)
    throw "food choices not provided";
 
    if(!Array.isArray(vari))
    throw 'food choices is not an array';
    
    if(!vari.length>0)
    throw 'food choices array cant be empty'

    for(i=0;i<vari.length;i++){
        //console.log(vari[i])
        if(typeof(vari[i])!=="string")
        throw 'choice should be a string'
        //console.log(curfood)
        vari[i]=vari[i].trim()
        vari[i]=vari[i].toLowerCase()
        //console.log(curfood)
        if(vari[i].length===0)
        throw 'choice cant be empty or all white spaces'

        for(j=0;j<vari[i].length;j++){
            if(!vari[i][j].match(/^[A-Za-z\s]*$/))  
            throw 'choice should only be a string of alphabets'
        }

        if(vari[i].length>30)
        throw "food choice name is too long, ask the chef to change name"
        }
return vari
}

//right
async function checkifproperreview(vari){
    if(!vari)
    throw "review not provided";
 
    if(typeof(vari)!=='string')
    throw 'review is not a string';
    if(vari.trim().length===0)
    throw "review cant be empty or all white spaces";
 
    vari=vari.trim() 
    if(vari.length<2)
    throw 'review should atleast be 2 characters long'
    return vari

}

//right
async function checkifproperrating(vari){

    if(typeof(vari)!=="number")
    throw 'rating is not a number';
    
    if(!Number.isInteger(vari))
    throw "rating should be an integer"

    if(vari>5 || vari<0)
    throw 'rating should be between 0 and 5'

    return vari;
}

async function checkifproperflname(vari){
    if(!vari)
    throw "No first or last name provided";

    if(typeof(vari)!=="string")
    throw 'name is not a string';
    if(vari.trim().length===0)
    throw "name cant be empty or all white spaces";

    vari=vari.trim()
    vari=vari.toLowerCase()
    
    if(vari.length<2)
    throw 'both first and last names must be atleast two characters long'

let regex1 = /^[a-z ']+$/i
if(!regex1.test(vari))
throw 'name can only have alphabets and some some special characters'
return vari
}

async function checkifproperpassport(vari){
//should be 9 digits

    if(!vari)
    throw "No passport number  provided";
    if(vari==="000000000")
    throw "invalid passport number"

    if(typeof(vari)!=="string")
    throw 'passport number is not a string';
    if(vari.trim().length===0)
    throw "passport number cant be empty or all white spaces";

    vari=vari.trim()
    if(/\s/g.test(vari))
    throw "passport number cant have spaces"
 
    if(vari.length!==9)
    throw "length of passport number should be 9"

    for(i=0;i<vari.length;i++){
        if(!(Number.isInteger(Number(vari[i])) && Number(vari[i])>=0 && Number(vari[i])<=9))
        throw 'invalid passport number'

     return vari   
    }
}

async function checkifpropergender(vari){
    //can be male, female, other

    if(!vari)
    throw "No gender provided";
    if(typeof(vari)!=="string")
    throw 'gender is not a string';
    if(vari.trim().length===0)
    throw "gender cant be empty or all white spaces";
    vari=vari.trim()
    vari=vari.toLowerCase()

    if(vari!=="male" && vari!=="female")
    throw 'kindly select from: male,female'

return vari
}

//right
async function checkifproperemail(vari){
    if(!vari)
    throw "No email provided";
    if(typeof(vari)!=="string")
    throw 'email is not a string';
    if(vari.trim().length===0)
    throw "email cant be empty or all white spaces";
    vari=vari.trim()
    
    if(!(vari.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )))
    
    throw 'not proper email address'
    return vari
}
async function checkisproperpassword(vari){ // need to check if we trim password --- ATPK
    await checkifinputexists(vari)
    if(typeof(vari)!="string")
    throw "password has to be a string"
    if(vari.trim().length==0)
    throw "password cannot be all white spaces"
    if(((/\s/).test(vari))==true)
    throw "password cannot have whitespaces"
    if(vari.length<6)
    throw "password should be atleast 6 characters long"
    const testcondition = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
    if (!testcondition.test(vari)) 
    throw "password is not proper"
    //vari=vari.trim()
    return vari
    }

async function checkifproperphonenumber(vari){

    if(!vari)
    throw "No phone number provided";
    if(vari==="0000000000")
    throw "invalid phone number"
    if(typeof(vari)!=="string")
    throw 'phone number is not a string';
    if(vari.trim().length===0)
    throw "phone number cant be empty or all white spaces";

    vari=vari.trim()
    if(/\s/g.test(vari))
    throw "phone number cant have spaces"
 
    if(vari.length!==10)
    throw "length of phone number should be 10"

    for(i=0;i<vari.length;i++){
        if(!(Number.isInteger(Number(vari[i])) && Number(vari[i])>=0 && Number(vari[i])<=9))
        throw 'invalid phone number'

     return vari }

}

//right
async function addDigitIfNeeded(n){
    return n > 9 ? "" + n: "0" + n;
}

async function checkifproperfirstname(firstName){
    if(!firstName)
    throw "No firstname provided";

    if(typeof(firstName)!=="string")
    throw 'Firstname is not a string';
    
    if(firstName.trim().length===0)
    throw "firstname cant be empty or all white spaces";

    firstName=firstName.trim();
    // firstName=firstName.toUpperCase();
    
    if(firstName.length<2)
    throw 'Firstname must be atleast two characters long';

    let regex1 = /^[a-zA-Z]+$/i;
    if(!regex1.test(firstName))
    throw 'Firstname can only have alphabets';
    return firstName;
}
async function checkifproperlastname(lastName){
    if(!lastName)
    throw "No Lastname provided";

    if(typeof(lastName)!=="string")
    throw 'Lastname is not a string';
    
    if(lastName.trim().length===0)
    throw "lastname cant be empty or all white spaces";

    lastName=lastName.trim();
    // lastName=lastName.toUpperCase();
    
    if(lastName.length<2)
    throw 'Lastname must be atleast two characters long';

    let regex2 = /^[a-zA-Z]+$/i;
    if(!regex2.test(lastName))
    throw 'Lastname can only have alphabets';
    return lastName;
}
async function checkifproperbirthdate(date){
    if(!date) throw 'No date passed';
        
    if(typeof date !=='string') throw 'date must be valid string';
    if(date.trim().length==0) throw 'date can not be empty string';
    const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    date=date.trim();
    var c_year = new Date().getFullYear();  
    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    arr=date.split('-');
    if(arr.length !== 3){
        throw 'invalid Date';
    }

    month=arr[1];
    day=arr[2];
    year=arr[0];

    if(month.length!==2 || day.length!==2 || year.length!==4){
        throw 'invalid Date';
    }


    if(re_for_specialcharacter.test(month) || re_for_specialcharacter.test(day) || re_for_specialcharacter.test(year)){
        throw 'invalid Date';
    }

    month= Number(month);
    day= Number(day);
    year= Number(year);


    if(!Number.isInteger(month) || !Number.isInteger(day)  || !Number.isInteger(year)){
        throw 'invalid Date';
    }


    if(month<0 || month>12){
        throw 'invalid Date';
    }
    if(month==2){
        if(day>28){
            throw 'invalid Date';
        }
    }
    if(day>ListofDays[month-1]){
        throw 'invalid Date';
    }
    return date;
}

async function checkifproperchoiceoffood(foodchoices){
    if(!foodchoices)
    throw "food choices not provided";
    if(typeof(foodchoices)!=="string")
    throw 'choice should be a string';
    //console.log(curfood)
    foodchoices=foodchoices.trim()
    // foodchoices=foodchoices.toLowerCase()
    //console.log(curfood)
    if(foodchoices.length===0)
    throw 'choice cant be empty or all white spaces';

    if(!foodchoices.match(/^[A-Za-z\s]*$/))  
    throw 'choice should only be a string of alphabets';                        

    if(foodchoices.length>30)
    throw "food choice name is too long, ask the chef to change name";
    return foodchoices;
}


module.exports = {
    checkifproperflightcode,checkifemptystring,checkifinputexists,checkifproperdeparr,checkifproperarrdepttime,checkifproperduration,
    checkifpropermiles,checkifproperclasstype, checkifproperclasscapacity,checkifproperprice,checkifproperfoodchoices,checkifproperreview,
    checkifproperrating, checkifproperflname,checkifproperpassport, checkifpropergender, checkifproperemail, checkifproperphonenumber,
    checkifproperDate,checkifproperNoOfPass,checkifstring,checkifarray,checkisproperpassword,checkifproperprice,addDigitIfNeeded,checkifproperfirstname,checkifproperlastname,checkifproperbirthdate,
    checkifproperchoiceoffood
}
