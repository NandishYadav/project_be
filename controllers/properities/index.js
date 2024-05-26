const {createObject, getAllObjects,getAllObjectsCount, getObjectById, updateObject} = require('./services');

const properitieControllers = {
    createProperitie: async (req,res) => {
        try {
            // Check if owner info is present
            if(!req.body.owner){
                return res.status(400).json({ message: 'Owner info is required' });
            } 
            const properitie = await createObject(req.body);
            res.status(201).json({
                data: properitie,
                message: "Properitie created successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getProperities: async (req, res) => {
        try {
            const {pageNum, pageSize,name,area,price,rooms} = req.body;

            const filters = {
                pageNum: pageNum,
                pageSize: pageSize,
            }
            if(name){
                filters.query = {name: name};
            };
            if(area){
                filters.query = {area: area};
            };
            if(price){
                filters.query = {price: price};
            };
            if(rooms){
                filters.query = {number_of_rooms: rooms};
            };
            const properities = await getAllObjects(filters);
            const count = await getAllObjectsCount(filters.query);
            res.status(200).json({
                status: 'success',
                data: properities || [],
                count: count || 0,
                message: "Properities fetched successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getProperitieById: async (req, res) => {
        try {
            const properitie = await getObjectById(req.params.id);
            if (!properitie) {
                return res.status(404).json({ message: 'Properitie not found' });
            }
            res.status(200).json(properitie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateProperitie: async (req, res) => {
        try {
            const properitie = await updateObject(req.params.id, req.body);
            if (!properitie) {
                return res.status(404).json({ message: 'Properitie not found' });
            }
            res.status(200).json({
                data: properitie,
                message: "Properitie updated successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = properitieControllers;