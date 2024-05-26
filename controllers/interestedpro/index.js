const {createObject, getAllObjects,getAllObjectsCount, getObjectById, updateObject} = require('./services');
const userServices = require('../users/services');
const utiles = require('../../utiles');

const properitieControllers = {
    markInterested: async (req,res) => {
        try {
            const {properitie,posted_by} = req.body;
            const user = req.user;
            const interested = await createObject(req.body);
            const ownerDetails = await userServices.getObjectById(posted_by);
            const sendMailToOwner = await utiles.sendMail(ownerDetails.email, 'Interested in your property', 'You have a new interested in your property'
            , `Hello ${ownerDetails.first_name}, <br> You have a new interested in your property. <br> 
            name: ${user.first_name} ${user.last_name} <br> email: ${user.email} <br> phone_number: ${user.phone_number} <br>
            <br> <br> Regards, <br> Team Properitie`
            );
            const sendMailToInterested = await utiles.sendMail(user.email, 'Interested in your property', 'You have shown interest in a property'
            , `Hello ${user.first_name}, <br> You have shown interest in a property. <br>
            owner: ${ownerDetails.first_name} ${ownerDetails.last_name} <br> email: ${ownerDetails.email} <br> phone_number: ${ownerDetails.phone_number} <br>
            <br> <br> Regards, <br> Team Properitie`
            );
            res.status(201).json({
                data: interested,
                message: "Interested Properitie created successfully"
            });
        } catch (error) {
            res.status(500).json({
                status:"Internal Server Error",
                 message: error.message });
        }
    },
    getAllInterested: async (req, res) => {
        try {
            const {pageNum, pageSize} = req.body;

            const filters = {
                pageNum: pageNum,
                pageSize: pageSize,
            }
            const interested = await getAllObjects(filters);
            const count = await getAllObjectsCount();
            res.status(200).json({
                status: 'success',
                data: interested || [],
                count: count || 0,
                message: "Interested Properities fetched successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getInterestedById: async (req, res) => {
        try {
            const interested = await getObjectById(req.params.id);
            if (!interested) {
                return res.status(404).json({ message: 'Interested Properitie not found' });
            }
            res.status(200).json(interested);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateInterested: async (req, res) => {
        try {
            const interested = await updateObject(req.params.id, req.body);
            if (!interested) {
                return res.status(404).json({ message: 'Interested Properitie not found' });
            }
            res.status(200).json({
                data: interested,
                message: "Interested Properitie updated successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = properitieControllers;