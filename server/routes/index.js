const express = require("express")
const FarmerRouter = require("./farmer")
const BuyerRouter = require("./buyer")
const rootRouter = express.Router()

rootRouter.use('/farmer',FarmerRouter)
rootRouter.use('/buyer',BuyerRouter)

module.exports = rootRouter