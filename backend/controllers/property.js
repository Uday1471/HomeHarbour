const { Property } = require("../models/property.model.js");

exports.createProperty = async (req, res) => {
    try {
        const { name, description, type, bedrooms, regularPrice, discountedPrice, furnished, parking, offer, latitude, longitude, imgUrls } = req.body;
        const data = await Property.create({
            name,
            description,
            type,
            bedrooms,
            regularPrice,
            discount: discountedPrice,
            furnished,
            parking,
            offer,
            latitude,
            longitude,
            imgUrls: {
                front: imgUrls.frontViewImage,
                back: imgUrls.backViewImage
            },
            userId: req.user.user_id
        });
        res.status(201).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.getAllProperties = async (req, res) => {
    try {
        let type = req.query.type;

        let data;
        if(type){
            if(type === "offer"){
                data = await Property.find({
                    offer: true
                });
            } else {
                data = await Property.find({
                    type
                });
            }
        } else {
            data = await Property.find({});
        }
        res.status(200).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.deleteProperty = async (req, res) => {
    try {
        const data = await Property.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.getProperty = async (req, res) => {
    try {
        const data = await Property.findOne({
            _id: req.params.id
        }).populate("userId");
        res.status(200).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.getUserProperties = async (req, res) => {
    try {
        const data = await Property.find({
            userId: req.user.user_id
        });
        res.status(200).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}