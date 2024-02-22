const express = require("express")
const FarmerRouter = express.Router()
const {Farmer, Buyer, Crop} = require('../db/index')
const zod = require("zod")
const jwt = require("jsonwebtoken")
const authMiddleWare = require("../authMiddleWare")
const signUpBody = zod.object({
    password: zod.string(),
    email: zod.string().email(),
    phoneno: zod.string(),
    address:zod.string(),
    username:zod.string()
})

FarmerRouter.post('/signup',async(req,res)=>{
    try{
        const {success} = signUpBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
                message:'Email already taken/ incorrect inputs'
            })
        }
        const email = req.body.email
        const phoneno = req.body.phoneno
        const address = req.body.address
        const password = req.body.password
        const username = req.body.username

        let isAlreadyExists = await Farmer.findOne({
            email
        })
        if(isAlreadyExists){
            return res.status(411).json({
                message: "Email already taken/ incorrect inputs"
            })
        }
        const farmer = await Farmer.create({
            email,
            password,
            username,
            phoneno,
            address
        })
        const user_id = farmer._id
        const token = jwt.sign({
            user_id
        },"secret")
        return res.json({
            message:'Farmer account created successfully',
            token:token,
            farmer:farmer.username
        })
    }catch(e){
        return res.json({
            message:"there is some problem, please try again later"
        })
    }  
})

const signInObject = zod.object({
    username:zod.string(),
    password:zod.string()
})

FarmerRouter.post('/signin',async(req,res)=>{
    console.log('a sign in request');
    const {success} = signInObject.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:'Incorrect inputs'
        })
    }
    const username = req.body.username
    const password = req.body.password

    const farmer = await Farmer.findOne({
        username,
        password
    })
    if(farmer){
        const user_id = user._id
        const token = jwt.sign({
            user_id
        },"secret")
    
        res.status(200).json({
            token:token,
            farmer:farmer.username
        })
        return
    }

    res.status(411).json({
        message:'Error while logging in'
    })
})



FarmerRouter.get('/bulk', async(req,res)=>{
    const filter = req.query.filter || ""
    const token = req.headers.authorization
    try{
        const allcrops = await Crop.find({
            $or:[{
                nameOfcrop :{
                    "$regex":filter
                }
            },
        ]
        })
        res.json({
            crop: allcrops.map(crop =>({
                nameOfcrop : crop.nameOfcrop,
                startmonth: crop.startMonth,
                endmonth: crop.endMonth,
                _id: crop._id
            }))
        })
    }catch(e){
        console.log(e)
    }
   
})

const updateBody = zod.object({
    nameOfcrop: zod.string().optional(),
    startMonth: zod.number().optional(),
    endMonth: zod.number().optional()
})


FarmerRouter.put('/',authMiddleWare, async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:'Error while updating information'
        })
    }
    try{
        await Crop.findOneAndUpdate({
            nameOfcrop:req.body.nameOfcrop
        },req.body)
        res.json({
            message:'Updated successfully'
        })
    }catch(e){
        res.status(411).json({
            message:'Error while updating information'
        })
    }
})


module.exports = FarmerRouter