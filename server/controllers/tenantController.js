const Tenant = require('../models/Tenant');
const mongoose = require('mongoose');

// Create a new Tenant
exports.create = async (req, res) => {
    const { name, domain, admin } = req.body;

    // Check for existing Tenant by name or domain
    const ifName = await Tenant.findOne({ name });
    const ifDomain = await Tenant.findOne({ domain });
    if (ifName || ifDomain) {
        return res.status(400).json({ error: 'Name or Domain already exists' });
    }

    try {
        const newTenant = new Tenant({
            name,
            domain,
            admin
        });
        await newTenant.save();
        res.status(201).json(newTenant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read Tenants with pagination
exports.findAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Page and limit must be positive integers' });
        }

        const query = {};

        const tenants = await Tenant.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        
        const totalTenants = await Tenant.countDocuments(query);

        res.status(200).json({
            page,
            limit,
            totalTenants,
            totalPages: Math.ceil(totalTenants / limit),
            tenants
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Tenant
exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, domain, admin } = req.body;

    try {
        const updatedTenant = await Tenant.findByIdAndUpdate(id, { name, domain, admin }, { new: true });
        if (!updatedTenant) {
            return res.status(404).json({ error: 'Tenant not found' });
        }
        res.status(200).json(updatedTenant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Find a Tenant by ID
exports.findOne = async (req, res) => {
    const { id } = req.body;
    try {
        const response = await Tenant.findById(id);
        if (response) {
            res.status(200).json(response); // Return the found tenant data
        } else {
            res.status(404).json({ msg: "Tenant not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Delete a Tenant by ID
exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedTenant = await Tenant.findByIdAndDelete(id); // Await the deletion
        if (deletedTenant) {
            res.status(200).json({ deletedTenant });
        } else {
            res.status(404).json({ msg: "Tenant not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
