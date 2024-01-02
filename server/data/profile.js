const mongoCollections = require('../config/mongoCollections');
const profiles = mongoCollections.profiles;
const {ObjectId} = require('mongodb');
const helper =require('../helper');


const createProfile = async (
  firstName,
  lastName,
  birthDate,
  Address,
  emailId,
  contactNumber,
  PassportNo,
) => {
  firstName=await helper.checkifproperflname(firstName)
  lastName=await helper.checkifproperflname(lastName)
  birthDate=await helper.checkifproperbirthdate(birthDate)
  await helper.checkifstring(Address)
  emailId=await helper.checkifproperemail(emailId)
  contactNumber = await helper.checkifproperphonenumber(contactNumber)  

  let newProfile = {
    firstName : firstName,
    lastName : lastName,
    birthDate : birthDate,
    Address : Address,
    emailId : emailId,
    contactNumber : contactNumber,
    PassportNo : PassportNo
  }
  const profileCollection = await profiles(); 

  const insertInfo = await profileCollection.insertOne(newProfile);

  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw 'could not add profile';
  }

  return insertInfo.insertedId.toString();
};


const checkifProfileExist = async (email) => {
    const profileCollection = await profiles(); 
	const user = await profileCollection.findOne({ emailId: email });
	if (user) {
		return true;
	} else {
		return false;
	}
};

const getProfile = async (email) => {
    const profileCollection = await profiles(); 
	const user = await profileCollection.findOne({ emailId: email });
	if (user) {
		return user;
	} else {
		throw 'can not find profile with this email ID';
	}
}

module.exports = {
  createProfile,
  checkifProfileExist,
  getProfile
};
