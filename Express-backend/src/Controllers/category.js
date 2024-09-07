const express = require('express');
const category = require('../model/category.js');
const router = express.Router();
const checkuser = require('../middleware/checkuser.js')

//to here,all the related API's of related database model's should be copied..(with a routs. instead app.)


//1- post--- //

router.post('/',async(req,res)=>{  
    try {
     
       const {name, description}= req.body; 
                                         
       const data = new category({ 
     
         name,                 
         description  })
 
       await data.save()         
       res.sendStatus(200);
 
    }
 
    catch (e){
      
     console.log("error",e);
     res.sendStatus(500);
    }
 })  ;

 // 2- get-- to get the data that stored 

 router.get('/', checkuser ,  async (req,res)=> {


    try{

       const data = await category.find(); 
       res.status(200).json(data);    
       console.log("see the converted json obj : ",JSON.stringify(data));
    }


    catch(e){

      res.sendStatus(500);
      console.log('error',e);
    }

})

// 3- put---updating the data stored data

router.put('/:id', async (req,res)=>{

    try{
        
       const {id }= req.params;  
       const {name}= req.body;   
   
      await category.updateOne({_id:id},{name:name}); 
                                                      
      res.sendStatus(200); }
        
   
    
   
    catch(e){
   
      res.sendStatus(500);
      console.log("error",e);
   
    }
   
   
   })
   
   // 4- delete ---to deleting stored items
   
   router.delete('/:id',async(req,res)=>{
   
       try{
      
            const {id}= req.params;
               
            await category.deleteOne({_id:id});  
      
            res.sendStatus(200);
      
      
       }
      
       catch(e) {
      
         res.sendStatus(500);
         console.log("error",e)
      
      
       }
      
      
      })


 module.exports = router;
 