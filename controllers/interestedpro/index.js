const {createObject, getAllObjects,getAllObjectsCount, getObjectById, updateObject} = require('./services');

const properitieControllers = {
    markInterested: async (req,res) => {
        try {
            const interested = await createObject(req.body);
            res.status(201).json({
                data: interested,
                message: "Interested Properitie created successfully"
            });
        } catch (error) {
            res.status(500).json({
                status:"success",
                data:intrested,
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