const mongoose = require('mongoose');

const properitiesSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    location: String,
    area:String,
    image: String,
    number_of_rooms: Number,
    number_of_bathrooms: Number,
    near_by_places: {
        type:[String]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('properities', properitiesSchema);