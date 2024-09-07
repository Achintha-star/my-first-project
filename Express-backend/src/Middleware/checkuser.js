 const user = require('../model/user.js');
 const jwt  = require('jsonwebtoken');

 module.exports = async(req,res,next)=> {

  try{
    const token = req.headers.authorization.split(' ')[1];

    if(!req.headers.authorization){

      res.status(401).json("user token to access is missing");
    }
    const decoded = jwt.verify(token,"secret_keyword");
    req.user = decoded ; 
    next();
   }

  catch(e){

    res.status(401).json({msg: "invalid token/unorthorized access"});
    console.log("erro",e);
   }

}