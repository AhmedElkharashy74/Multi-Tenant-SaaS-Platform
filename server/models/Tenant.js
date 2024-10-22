const mongoose = require('mongoose');
const user = require('./User')

const tenantSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        index : true,
        required : true,
    },
    domain : {
        type : String,
        required : true,
        index : true,
        unique : true,
    },
    admin : {
        type : mongoose.Types.ObjectId(user),
        ref : 'User',
        required : true,
        index : true,

    }
},{
    timestamps : true
})

module.exports = mongoose.model('Tenant', tenantSchema);
