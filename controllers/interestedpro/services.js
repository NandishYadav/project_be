const interestedpro = require('../../models/interestedpro');

const createObject = async object => {
    try {
        return await interestedpro.create(object);
    } catch (error) {
        console.error(error)
    }
};

const getAllObjects = async (filters) => {
    try {
        const query = filters.query || {};
        const select = filters.select || {};
        const pageNum = filters.pageNum || 1;
        const pageSize = filters.pageSize || 10;
        const skip = (pageNum - 1) * pageSize;
        return await interestedpro.find(query).select(select).skip(skip).limit(pageSize).lean().exec();
    } catch (error) {
        console.error(error)
    }
};

const getAllObjectsCount = async (query) => {
    try {
        return await interestedpro.countDocuments(query).exec();
    } catch (error) {
        console.error(error)
    }
};

const getObjectById = async id => {
    try {
        return await interestedpro.findById(id).lean().exec();
    }
    catch (error) {
        console.error(error)
    }
};

const updateObject = async (id, object) => {
    try {
        return await interestedpro.findByIdAndUpdate
            (id, object, { new: true, runValidators: true }).lean().exec();
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = { createObject, getAllObjects, getObjectById, updateObject, getAllObjectsCount };
