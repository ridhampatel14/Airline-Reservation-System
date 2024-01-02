const mongoCollections = require('../config/mongoCollections');
const flights = mongoCollections.flights;
const bookings = mongoCollections.bookings;
const {ObjectId} = require('mongodb');
const helper =require('../helper');

const createFlight = async (
  flightCode,
  departure,
  arrival,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  miles,
  price,
  seats
  ) => {
    flightCode = await helper.checkifproperflightcode(flightCode);
    departure = await helper.checkifproperdeparr(departure);
    arrival = await helper.checkifproperdeparr(arrival);
    departureDate = await helper.checkifproperDate(departureDate);
    departureTime = await helper.checkifproperarrdepttime(departureTime);
    arrivalDate = await helper.checkifproperDate(arrivalDate);
    arrivalTime = await helper.checkifproperarrdepttime(arrivalTime);
    price = Number(price)
    price = await helper.checkifproperprice(price);
    seats = Number(seats)
    seats = await helper.checkifproperNoOfPass(seats);
    miles = Number(miles)
    await helper.checkifpropermiles(miles);
    

    const flightcollection = await flights();
    const flightList = await flightcollection.find({}).toArray();
    for(k=0;k<flightList.length;k++){
        if(flightCode==flightList[k].flightCode)
        throw "Cannot create a flight with a pre-existing flight code"
    }

    let flight1 = {
        flightCode: flightCode,
        departure: departure,
        arrival: arrival,
        departureDate: departureDate,
        departureTime: departureTime,
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,   
        miles: miles,
        seats: seats,
        price: price,
        bookedSeats: 0,
        reviews: []
    }
    const insertInfo = await flightcollection.insertOne(flight1);

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add flight';

    const newId = insertInfo.insertedId.toString();
    const flight = await getFlightById(newId);
    flight._id = flight._id.toString();
    return flight;

};

const getAllFlights = async () => {    

  const flightCollection = await flights();
  const arr = await flightCollection.find({}).toArray();
  if (arr===null) return [];
  for(i in arr){
    arr[i]._id=arr[i]._id.toString();
  }
  return arr;

};

const getFlightById = async (flightId) => {  
    
    if(!flightId)
    throw `no id is given`;
    if(typeof(flightId)!=="string")
    throw `type of id is not a string`;
    if(flightId.trim().length===0)
    throw 'id cannot be empty or all white spaces';
    flightId=flightId.trim();
    if(!ObjectId.isValid(flightId))
    throw `id is not valid`;
    const flightCollection =await flights();
    const flightbyid= await flightCollection.findOne({_id:new ObjectId(flightId)});
    if(flightbyid===null){ 
        throw `no flight found with that id`;
    }
    flightbyid._id=flightbyid._id.toString()
    return flightbyid;

};

const removeFlight = async (flightId) => {
  if(!flightId) throw `no id is given`;
  if(typeof(flightId)!=="string") throw `type of id is not a string`;
  if(flightId.trim().length===0) throw 'id cannot be empty or all white spaces';
  flightId = flightId.trim();
  if(!ObjectId.isValid(flightId)) throw `id is not valid`;

  const flightCollection = await flights();
  var deletename = await getFlightById(flightId);

  if (!deletename || deletename === undefined) {
    throw `Could not delete flight with id of ${flightId}`;
  }
  
  const deletedflight = await flightCollection.deleteOne({_id: ObjectId(flightId)});

  if (deletedflight.deletedCount === 0) {
    throw `Could not delete flight with id of ${flightId}`;
  }

  return (`${deletename.flightId} has been successfully deleted! `);

};

const updateSeat = async (flightId) => {
  if(!flightId) throw `no id is given`;
  if(typeof(flightId)!=="string") throw `type of id is not a string`;
  if(flightId.trim().length===0) throw 'id cannot be empty or all white spaces';
  flightId = flightId.trim();
  if(!ObjectId.isValid(flightId)) throw `id is not valid`;

  const flightCollection = await flights();
  const flight = await getFlightById(flightId);
  const updatedFlight = {
    bookedSeats: flight.bookedSeats + 1
  };
  const updatedInfo = await flightCollection.updateOne({_id: new ObjectId(flightId)},
  {$set: updatedFlight}
  );

  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update flight successfully';
  }
  return true;
};

const updateFlight = async (
  id,
  flightCode,
  departure,
  arrival,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  miles,
  price,
  seats
) => {

  if(!id)
  throw `no id is given`;
  if(typeof(id)!=="string")
  throw `type of id is not a string`;
  if(id.trim().length===0)
  throw 'id cannot be empty or all white spaces';
  id=id.trim();
  if(!ObjectId.isValid(id))
  throw `id is not valid`;

  flightCode=await helper.checkifproperflightcode(flightCode)
  departure=await helper.checkifproperdeparr(departure)
  arrival=await helper.checkifproperdeparr(arrival)
  departureDate=await helper.checkifproperDate(departureDate)
  departureTime=await helper.checkifproperarrdepttime(departureTime)
  arrivalDate=await helper.checkifproperDate(arrivalDate)
  arrivalTime=await helper.checkifproperarrdepttime(arrivalTime)
  price = await helper.checkifproperprice(price);
  seats = await helper.checkifproperNoOfPass(seats);
  await helper.checkifpropermiles(miles)
  miles=miles.trim()

  const flightCollection = await flights();
  let fff=await getFlightById(id)  
  const flightList = await flightCollection.find({}).toArray();

  for(k=0;k<flightList.length;k++){
    if(fff._id!=flightList[k]._id && flightCode==flightList[k].flightCode)
    throw "Cannot create a flight with a pre-existing flight code"
  }

  let updatedflight = {
    flightCode:flightCode,
    departure:departure,
    arrival:arrival,
    departureDate:departureDate,
    departureTime:departureTime,
    arrivalDate:arrivalDate,
    arrivalTime:arrivalTime,    
    miles:miles,
    seats: seats,
    price: price,
  }

  const updatedInfo = await flightCollection.updateOne({_id: ObjectId(id)},
  {$set: updatedflight}
  );
//if (updatedInfo.modifiedCount === 0) {
 // throw 'could not update flight successfully';
//}
return await getFlightById(id);

};

const searchFlightsResult = async ( 
  departure,
  arrival,
  date
) => {

  //error cheking 
  if(!departure) throw 'No departure passed!';
  if(!arrival) throw 'No arrival passed!';
  if(!date) throw 'No date passed';

  departure=await helper.checkifproperdeparr(departure)
  arrival=await helper.checkifproperdeparr(arrival)
  date=await helper.checkifproperDate(date)
  var today = new Date();
  var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  if(new Date(date)<new Date(today_date)) throw 'you can not add date which is lower than today';
  //error cheking done
  const flightCollection =await flights();

  //creating date array for next week of selected date
  let date_arr=[];  
  date_arr.push(date);
  date=new Date(date);
  for (let i = 1; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    date=date.toISOString();
    date_arr.push(date.split('T')[0]);
    date=new Date(date) 
  }
  //getting flights based on dates and other parameters 
  const flightsList = await flightCollection.find({'departure':departure,'arrival':arrival,'departureDate':{ $in: date_arr }}).toArray();
  return flightsList;

}

const getArrDep = async () => {
  const flightCollection = await flights();
  const arr1 = await flightCollection.find({}, { projection: { departure : 1 , _id: 0, arrival : 1} }).toArray();
  if (arr1===null) return [];
  let arr = []
  let dep = [] 
  let final = []
  for(i of arr1){
    arr.push(i['arrival'])
    dep.push(i['departure'])
  }
  arr = [...new Set(arr)]
  dep = [...new Set(dep)]
  let temp = [{
    label: 'Select Arrival',
    value: 'Select Arrival'
  }]
  let temp1 = [{
    label: 'Select Departure',
    value: 'Select Departure'
  }]
  for(i of arr){
    temp.push({
      label: i,
      value: i
    })
  }
  for(i of dep){
    temp1.push({
      label: i,
      value: i
    })
  }
  final.push(temp,temp1)
  return final;
}

const BookTicket = async (flightId,bookedPerson) => {
  const bookingCollection = await bookings();
  let flight = await getFlightById(flightId)

  const users = await bookingCollection.find({ emailId: bookedPerson.emailId, flightId: new ObjectId(flightId)}).toArray();
  if(users.length !== 0){
    throw 'you already booked this flight'
  }

  const flag = await updateSeat(flightId);
  if(flag){
    bookedPerson['flightId'] = new ObjectId(flightId);    
    const insertInfo = await bookingCollection.insertOne(bookedPerson);

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add booking';

    console.log('inserted booking all done!!!!!!')
    flight = await getFlightById(flightId);
    return {
      flight:flight,
      booking: bookedPerson
    }  
  }else{
    throw 'can not proceed your request!';
  }
}

const Bookings = async(emailId) => {

  const bookingCollection = await bookings();
  const res = await bookingCollection.find({ emailId: emailId}).toArray();
  if(!res){
    throw 'No Bookings found!'
  }

  const promises = res.map(async (element) => {
    const temp = await getFlightById(element.flightId.toString());
    element.flightDetails = temp;
    return element;
  });
  
  const updatedRes = await Promise.all(promises);
    
  return updatedRes;
}

const AddReviews = async(flightId, review , emailId ) => {
  let flight = await getFlightById(flightId);
  let re = {
    review: review,
    emailId: emailId
  }
  const flightCollection = await flights();

  let inserted = await flightCollection.updateOne( 
    { _id: new ObjectId(flightId)}, 
    { $push: { reviews: re } }
  )
  if (!inserted.acknowledged || inserted.modifiedCount == 0)
    throw 'Could not add review';
  
  let temp = await getFlightById(flightId);
  return temp.reviews;
}

module.exports = {
  AddReviews,
  createFlight,
  getAllFlights,
  getFlightById,
  removeFlight,
  updateFlight,
  searchFlightsResult,
  getArrDep,
  BookTicket,
  Bookings
};
