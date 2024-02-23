const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://paplu:papludash@cluster0.iyduksp.mongodb.net/agricultural-app')

const FarmerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    phoneno : {
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    username:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    address : {
        type:String,
        required:true,
        trim:true,
        maxLength:200
    },
})

const BuyerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    phoneno : {
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    username:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    address : {
        type:String,
        required:true,
        trim:true,
        maxLength:200
    }
})

const CropSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Farmer',
        required:true
    },
    nameOfcrop:{
        type:String,
        required:true,
        trim:true
    },
    startMonth:{
        type: String,
        required:true
    },
    endMonth:{
        type:String,
        required:true
    }
})

const Farmer = mongoose.model('Farmer', FarmerSchema)
const Crop = mongoose.model('Crop',CropSchema)
const Buyer = mongoose.model('Buyer',BuyerSchema)

module.exports = {
    Farmer,
    Crop,
    Buyer
}