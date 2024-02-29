const express = require("express")
const FarmerRouter = express.Router()
const {Farmer, Buyer, Crop, readyCrops} = require('../db/index')
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
            farmer:farmer.username,
            userId:farmer._id
        })
    }catch(e){
        return res.json({
            message:"there is some problem, please try again later"
        })
    }  
})

const updatedBody = zod.object({
    username:zod.string().optional(),
    password:zod.string().optional(),
    phoneno:zod.string().optional()
})

FarmerRouter.post('/updateaccount/:id', async(req,res)=>{
    try {
        const {success} = updatedBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
                message:'Incorrect inputs'
            })
        }
        const id = req.params.id
        const farmer = await Farmer.findByIdAndUpdate(id, req.body, { new: true });
        if(farmer){
            return res.json({
                farmer
            })
        }else{
            return res.json({
                msg:'There is some error , try again later'
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            msg:'There is some error , try again later'
        })
    }

})

const signInObject = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

FarmerRouter.post('/signin',async(req,res)=>{
    try {
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
        
            return res.status(200).json({
                token:token,
                farmer:farmer.username,
                userId:farmer._id
            })
        }
    } catch (error) {
        return res.status(411).json({
            message:'Error while logging in'
        })
    }
})


FarmerRouter.post('/readytosell/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const farmer = await Farmer.findById(id)
        const {nameOfcrop, pricePerKg, amountAvailable} = req.body
        if(farmer){
            const CropReady = await readyCrops.create({
                userId:id,
                nameOfcrop,
                pricePerKg,
                amountAvailable
            })
            console.log(CropReady);
            if(CropReady){
                return res.json({
                    CropReady:CropReady
                })
            }else{
                return res.json({
                    msg:'There is some problem please try again later'
                })
            }
        }else{
            return res.json({
                msg:'There is some problem please try again later'
            })
        }
    } catch (error) {
        return res.json({
            msg:'There is some problem please try again later'
        })
    }
})



FarmerRouter.get('/bulk/:id', async(req,res)=>{
    try{
        const filter = req.query.filter || ""
        const id = req.params.id
            const allcrops = await Crop.find({
                userId:id,
                $or:[{
                    nameOfcrop :{
                        "$regex":filter
                    }
                },
            ]
            })
            const allReadyCrops = await readyCrops.find({
                userId:id
            })
            return res.json({
                crop: allcrops.map(crop =>({
                    nameOfcrop : crop.nameOfcrop,
                    startmonth: crop.startMonth,
                    endmonth: crop.endMonth,
                    _id: crop._id
                })),
                readyToSell: allReadyCrops.map(crop=>({
                    nameOfcrop: crop.nameOfcrop,
                    amountAvailable: crop.amountAvailable,
                    pricePerKg: crop.pricePerKg,
                    _id:crop._id
                }))
            })
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
    endMonth:zod.string()
})

//facing issue in adding crop details
FarmerRouter.post('/cropdetails/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const {success} = cropBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
                msg:'Incorrect Inputs'
            })
        }
        const farmer = await Farmer.findById(id)
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
                    nameOfcrop:crop.nameOfcrop,
                    userId:id
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
    } catch (error) {
        return res.status(411).json({
            msg:'Network issue , try again later'
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
    try{
        const {success} = updateBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
                message:'Error while updating information'
            })
        }
        const userId = req.userId
        await Crop.findOneAndUpdate({
            nameOfcrop:req.body.nameOfcrop
        },req.body)
        return res.json({
            message:'Updated successfully'
        })
    }catch(e){
        return res.status(411).json({
            message:'Error while updating information'
        })
    }
})

FarmerRouter.delete('/deletefuturecrop/:id',async(req,res)=>{
    try {
        const id = req.params.id
        await Crop.findByIdAndDelete(id)
        return res.status(200).json({
            msg:'Delete success'
        })
    } catch (error) {
        return res.status(200).json({
            msg:'Network issue'
        })
    }
})

FarmerRouter.delete('/deletereadycrop/:id',async(req,res)=>{
    try {
        const id = req.params.id
        console.log('delete to ready crop');
        const crop = await readyCrops.findByIdAndDelete(id)
        console.log('deleted '+crop);
        return res.json({
            msg:'Delete successfull'
        })
    } catch (error) {
        return res.json({
            msg:'Network issue'
        })
    }
})

FarmerRouter.get('/profile/:id', async(req,res)=>{
    try {
        const userId = req.params.id
        const farmer = await Farmer.findById(userId)
        console.log(farmer);
        if(farmer){
            return res.json({
                farmer: farmer
            })
        }else{
            return res.json({
                msg:'The farmer does not exists'
            })
        }
    } catch (error) {
        return res.json({
            msg:'Network issue, try again later'
        })
    }
})

const readyCropBody = zod.object({
    amount: zod.number(),
    price: zod.number(),

})

FarmerRouter.post('/getaccount', async(req,res)=>{
    try {
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
    } catch (error) {
        return res.json({
            msg:'Network issue , try again later'
        })
    }
})
module.exports = FarmerRouter