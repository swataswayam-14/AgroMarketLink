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
    email:zod.string().email(),
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
    const email = req.body.email
    const password = req.body.password

    const farmer = await Farmer.findOne({
        email,
        password
    })
    if(farmer){
        const user_id = farmer._id
        const token = jwt.sign({
            user_id
        },"secret")
    
        res.status(200).json({
            token:token,
            farmer:farmer.username,
            userId:farmer._id
        })
        return
    }

    res.status(411).json({
        message:'Error while logging in'
    })
})


const getAllCropBody = zod.object({
    email:zod.string().email(),
    password:zod.string()
})



FarmerRouter.post('/bulk', async(req,res)=>{
    const filter = req.query.filter || ""
    const {success} = getAllCropBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:'Incorrect Inputs'
        })
    }
    try{
        const email = req.body.email
        const password = req.body.password
        const farmer = await Farmer.findOne({
            email,
            password
        })
        if(farmer){
            const allcrops = await Crop.find({
                userId:farmer._id,
                $or:[{
                    nameOfcrop :{
                        "$regex":filter
                    }
                },
            ]
            })
            return res.json({
                crop: allcrops.map(crop =>({
                    nameOfcrop : crop.nameOfcrop,
                    startmonth: crop.startMonth,
                    endmonth: crop.endMonth,
                    _id: crop._id
                }))
            })
        }else{
            return res.json({
                msg:"invalid credentials"
            })
        }
    }catch(e){
        console.log(e)
        return res.json({
            msg:'There is some problem , try again later'
        })
    }
   
})

const cropBody = zod.object({
    nameOfcrop:zod.string(),
    startMonth:zod.string(),
    endMonth:zod.string(),
    email:zod.string(),
    password:zod.string()
})

//facing issue in adding crop details
FarmerRouter.post('/cropdetails', async(req,res)=>{
    const {success} = cropBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:'Incorrect Inputs'
        })
    }
    const email = req.body.email
    const password = req.body.password
    const farmer = await Farmer.findOne({
        email,
        password
    })
    if(farmer){
        const nameOfcrop = req.body.nameOfcrop
        const startMonth = req.body.startMonth
        const endMonth = req.body.endMonth

        const crop = await Crop.create({
            userId:farmer._id,
            nameOfcrop,
            startMonth,
            endMonth
        })
        if(crop){
            return res.status(201).json({
                msg:"The crop created successfully",
                nameOfcrop:crop.nameOfcrop
            })
        }else{
            return res.json({
                msg:"There is some problem in adding crop details"
            })
        }
    }else{
        return res.status(411).json({
            msg:'Invalid credentials'
        })
    }
})

const updateBody = zod.object({
    nameOfcrop: zod.string().optional(),
    startMonth: zod.string().optional(),
    endMonth: zod.string().optional()
})

//implement such that it is updated for only that specific farmer
FarmerRouter.put('/',authMiddleWare, async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:'Error while updating information'
        })
    }
    const userId = req.userId
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


FarmerRouter.get('/profile/:id', async(req,res)=>{
    const userId = req.params.id
    const farmer = await Farmer.findById(userId)
    if(farmer){
        return res.json({
            farmer
        })
    }else{
        return res.json({
            msg:'The farmer does not exists'
        })
    }
})

const readyCropBody = zod.object({
    amount: zod.number(),
    price: zod.number(),

})

FarmerRouter.post('/getaccount', async(req,res)=>{
    const email = req.body.email
    const farmer = await Farmer.findOne({
        email
    })
    if(farmer){
        const crop = await Crop.find({
            userId: farmer._id
        })
        if(crop){
            return res.json({
                allCrops:crop
            })
        }else{
            return res.json({
                msg:'You donot have any crops listed presently'
            })
        }
    }else{
        return res.json({
            msg:'Incorrect Credentials'
        })
    }
})

FarmerRouter.post('/readycrops', async(req,res)=>{
    const {success} = readyCropBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"Incorrect inputs"
        })
    }

})


module.exports = FarmerRouter