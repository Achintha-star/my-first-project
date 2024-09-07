const express = require('express');
const user = require('../model/user.js');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

async function register (req,res){
 
    try{

          const {firstname,lastname,email,password}= req.body ;

        //check if the email already exist..
        const existingUser = await user.findOne({email: new RegExp(`^${email}$`,"i")});
       
        if(existingUser){
           return  res.status(400).json(`email ${email} already exists`); 
          }

        //else..starts the password hashing process---(encrypting the pw b4 store in the DB) 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);

        await user.create({
           
            firstname,
            lastname,
            email,
            password:hash });

      res.sendStatus(200);


   }

    catch(e){

        res.sendStatus(500)
        console.log("error is :", e);
    }

}

async function login(req,res){

   try{

       const {email,password} = req.body;         // when we loging we enter a email/user name, password..send it here as req in obj 
                                           
       const existingUser = await user.findOne({email:new RegExp(`^${email}$`,"i")});       // finding specific object in the database by using a element in it and save it..in here..by email
                                                                                       //doing it by using a reg exp pattern..dont need to remember syntaxes..just know the  scenario    
        if(!existingUser){

        return res.status(401).json("User doesnt exist");         // if user doesnt exist in the DB..will go to this block and display it
        }


        const correct_password = await bcrypt.compare(password,existingUser.password); // if exist, now enterd password will check..with the selected user's password in the DB

        if(! correct_password){

        return res.status(401).json("incorrect password"); // if the password not correct, will go this block 
        }
  
        const token = jwt.sign({existingUser : existingUser._id}, 'secret_keyword');  // otherwise since the password is correct..token will be created
                                                                                      
       
        return res.status(200).json({

        token,
        full_name : existingUser.firstname+" "+ existingUser.lastname
    })

   }

 catch(e){
    
    res.sendStatus(500);  
    console.log("error",e);
   }
}

router.post('/register', register);
router.post('/login', login);

module.exports = router;
