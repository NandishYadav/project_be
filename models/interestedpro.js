const mongoose = require('mongoose');

const interestedproSchema = new mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    properitie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properities',
        required: true
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isInterested: {
        type: Boolean,
        default: true
    }
  },
{
    timestamps: true
});

module.exports = mongoose.model('interestedpro', interestedproSchema);