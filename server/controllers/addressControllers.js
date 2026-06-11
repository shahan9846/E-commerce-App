const Address = require('../models/addressModels')

const createAddress = async (req, res) => {
    try {
        const user = req.userId;
        await Address.updateMany({ user }, { isDefault: false });
        await Address.create({ ...req.body, user, isDefault: true });
        const addresses = await Address.find({ user });
        res.json({ addresses, message: "address added successfully", });
        // 1. updateMany → remove old primary
        // 2. create → new address as primary
        // 3. Only one primary address allowed
    } catch (error) {
        res.status(500).json({ message: "Address not added" });
    }
};

const fetchAddress = async (req, res) => {
    try {
        const user = req.userId;
        const addresses = await Address.find({ user })
        res.status(200).json(addresses)
    } catch (error) {
        res.status(500).json({ message: 'Not get adddress' })
    }
}

const editAddress = async (req, res) => {
    try {
        const user = req.userId;
        await Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
        const addresses = await Address.find({ user });
        res.status(201).json({ addresses, message: 'Address updated' })
    } catch (error) {
        res.status(500).json({ message: 'Not edit adddress' })
    }
}


const setPrimaryAddress = async (req, res) => {
    try {
        const user = req.userId;
        const addressId = req.params.id;
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(403).json({ message: "No address" });
        }
        await Address.updateMany({ user }, { isDefault: false });
        await Address.findByIdAndUpdate(addressId, { isDefault: true }, { new: true });
        const addresses = await Address.find({ user });
        res.json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error updating primary" });
    }
};


const deleteAddress = async (req, res) => {
    try {
        const user = req.userId;
        const addressId = req.params.id;
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        const isPrimary = address.isDefault;
        await Address.findByIdAndDelete(addressId);
        let remaining = await Address.find({ user });
        if (isPrimary && remaining.length > 0) {
            await Address.findByIdAndUpdate(remaining[0]._id, { isDefault: true });
            // re-fetch after update
        }
        const addresses = await Address.find({ user });
        res.json({ addresses, message: "Address deleted successfully", });
        // 1.get user and address
        // 2.if the delete one is isPrimary
        // 3.set as first one isPrimary
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error deleting address" });
    }
};

module.exports = { createAddress, editAddress, fetchAddress, setPrimaryAddress, deleteAddress }