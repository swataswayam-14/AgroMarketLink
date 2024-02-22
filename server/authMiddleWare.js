const authMiddleware = (req,res,next)=>{
    const authHeaders = req.headers.authorization || req.headers.Authorization
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        res.status(403).json({})
    }
    const token = authHeaders.split(' ')[1]
    try{
        const decoded = jwt.verify(token,"secret")
        req.userId = decoded.user_id
        next()
    }catch(e){
        return res.status(403).json({})
    }
}

module.exports = authMiddleware 