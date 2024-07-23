const JWT=require("jsonwebtoken")
const {JWTTOKENS}=require("../config/key")
const mongoose =require("mongoose")
const User=mongoose.model("UserData")



module.exports=(req,res,next)=>{
       const {authorization} =req.headers;
       if(!authorization){
           return res.status(422).json({error:"You are not authorized"})
       }
       const token =authorization.replace("Bearer ","")
JWT.verify(token,JWTTOKENS,(err,payload)=>{
    if(err){
        return res.status(402).json({errror:"You are not verify"})
    }
    const {_id} =payload;
User.findById(_id).then(userdata=>{
    req.user=userdata
    next()
})
})



}