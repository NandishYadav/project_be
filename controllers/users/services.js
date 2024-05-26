const users = require('../../models/users') // Import the model

const createObject = async object => {
  try {
    return await users.create(object)
  } catch (error) {
    console.error(error)
  }
}
const getUserByEmail = async email => {
    try {
        return await users.findOne({ email: email }).lean().exec();
    }catch(error){
        console.error(error);
    }
}

const updateObject = async (objectId, object) => {
  try {
    return await users.findByIdAndUpdate(objectId, object, { new: true })
  } catch (error) {
    console.error(error)
  }
}

const getObjectById = async objectId => {
  try {
    return await users.findById(objectId)
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createObject, updateObject, getObjectById, getUserByEmail }

// createObject({ first_name: 'John', last_name: 'Doe', email: 'test@gmail.com', phone_number: '1234567890', password: 'password' })
// .then(console.log).catch(console.error);


