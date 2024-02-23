const express = require("express")
const BuyerRouter = express.Router()
const {Farmer, Buyer, Crop} = require('../db/index')
const zod = require("zod")
const jwt = require("jsonwebtoken")

const signUpBody = zod.object({
    password: zod.string(),
    email: zod.string().email(),
    phoneno: zod.string(),
    address:zod.string(),
    username:zod.string()
})

BuyerRouter.post('/signup',async(req,res)=>{
    try{
        console.log('inside try');
        const {success} = signUpBody.safeParse(req.body)
        console.log(success);
        if(!success){
            return res.status(411).json({
                message:'Email already taken/ incorrect inputs'
            })
        }
        console.log('after success');
        const email = req.body.email
        const phoneno = req.body.phoneno
        const address = req.body.address
        const password = req.body.password
        const username = req.body.username

        let isAlreadyExists = await Buyer.findOne({
            email
        })
        if(isAlreadyExists){
            return res.status(411).json({
                message: "Email already taken/ incorrect inputs"
            })
        }
        console.log('creating buyer');
        const buyer = await Buyer.create({
            email,
            password,
            username,
            phoneno,
            address
        })
        console.log('buyer created');
        const user_id = buyer._id
        const token = jwt.sign({
            user_id
        },"secret")
        return res.json({
            message:'Buyer account created successfully',
            token:token,
            buyer:buyer.username
        })
    }catch(e){
        return res.json({
            message:"there is some problem, please try again later"
        })
    }  
})

const signInObject = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

BuyerRouter.post('/signin',async(req,res)=>{
    const {success} = signInObject.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:'Incorrect inputs'
        })
    }
    const email = req.body.email
    const password = req.body.password

    const buyer = await Buyer.findOne({
        email,
        password
    })
    if(buyer){
        const userId = buyer._id
        const token = jwt.sign({
            userId
        },"secret")
    
        res.status(200).json({
            token:token,
            buyer:buyer.username
        })
        return
    }

    res.status(411).json({
        message:'Error while logging in'
    })
})



BuyerRouter.get('/bulk', async(req,res)=>{
    try{
        const farmers = await Farmer.find({})
        res.json({
            farmers: farmers.map(farmer =>({
                username:farmer.username,
                phoneno: farmer.phoneno,
                address: farmer.address,
                _id:farmer._id
            }))
        })
    }catch(e){
        console.log(e)
    }
   
})
BuyerRouter.get(`/:id`, async(req,res)=>{
    try {
        const farmer = await Farmer.findOne({
            _id:req.params.id
        })
        if(farmer){
            const cropDetails = await Crop.find({
                userId: req.params.id
            })
            if(cropDetails){
                return res.json({
                    crop: cropDetails.map(crop =>({
                        nameOfCrop: crop.nameOfcrop,
                        startMonth: crop.startMonth,
                        endMonth:crop.endMonth
                    })),
                    farmer:{
                        username:farmer.username,
                        address:farmer.address,
                        phoneNumber:farmer.phoneno
                    }
                })
            }else{
                return res.json({
                    msg:'Crop details not found'
                })
            }
        }else{
            return res.json({
                msg:'Farmer not found'
            })
        }
    } catch (error) {
        return res.json({
            msg:'There is some problem, please try again later'
        })
    }
})





module.exports = BuyerRouter