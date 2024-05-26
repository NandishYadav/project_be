const userServices = require('./services');
const utiles = require('../../utiles');

const userControllers = {
    createUser: async (req,res) => {
        try { 
            if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
                return res.status(400).json({ message: 'Content can not be empty!' });
            }
            //validate password
            if(await utiles.validatePassword(req.body.password) !== "Valid"){
                return res.status(400).json({ message: await utiles.validatePassword(req.body.password) });
            }
             // Hash password before saving in database
            req.body.password = await utiles.hashPassword(req.body.password);
            const user = await userServices.createObject(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    loginUser: async (req,res) => {
        try {
            //get user by email
            const user = await userServices.getUserByEmail(req.body.email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            //check for password match
            const isMatch = await utiles.verifyPassword(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            delete user.password;

            user.token = await utiles.generateToken(user);
            res.status(200).json({data:user,message:"Login successful"});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await userServices.getAllObjects(req.body);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
      // Get User by id
    getUserById: async (req, res) => {
        try {
            const user = await userServices.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Update User by id
    updateUser: async (req, res) => {
        try {
            const user = await userServices.getObjectById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if(req.body.password){
                //validate password
                if(await validatePassword(req.body.password) !== "Valid"){
                    return res.status(400).json({ message: await validatePassword(req.body.password) });
                }
                // Hash password before saving in database
                req.body.password = await utiles.hashPassword(req.body.password);
            }
            const updateuser = await userServices.updateObject(req.params.id, req.body);
            res.status(200).json(updateuser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports =  userControllers;
  