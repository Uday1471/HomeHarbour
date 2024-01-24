const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    address: {
        type: String,
    },
    bathrooms: {
        type: Number,
    },
    bedrooms: {
        type: Number,
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
    },
    furnished: {
        type: Boolean,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    imgUrls: {
        front: {
            type: String,
        },
        back: {
            type: String,
        },
    },
    name: {
        type: String,
    },
    regularPrice: {
        type: Number,
    },
    type: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    parking: {
        type: Boolean,
        default: false
    },
    offer: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

exports.Property = mongoose.model('property', propertySchema);