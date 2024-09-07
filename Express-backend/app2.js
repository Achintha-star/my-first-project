// BACK END---when we have a database to connecting with..code would be little different..
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose'); //(2) additional package will wanted to imported- mongoose: for DB handle
const category = require('./src/model/category.js'); // (3)this exteral model file also need to be imported- model file: that include the model(we defined) of the database structure
const user = require('./src/model/user.js');

const app = express();
const port = 4000;


app.use(bodyparser.json());  

const routes = require('./src/controllers/index.js');
routes.forEach(([name,handler]) => app.use(`/${name}`,handler));

app.use(bodyparser.urlencoded({ extended: false })); 

/* or---> app.use(express.json());
          app.use(express.urlencoded({extended:false})); */

const connectionURL = 'mongodb+srv://user2000:test234@app3.59vlq.mongodb.net/?retryWrites=true&w=majority&appName=app3'


//(4)connecting to the database(mongo DB)
//----------------------------------------------------------------------------
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })                                                              /* ----no need remember this part of the code syntax..
                                                             just google it and include when needed */
  .catch((err) => {
    console.error("Database connection error:", err);
  });

//-----------------------------------------------------------------------------------


app.listen(port, ()=> {console.log("server started")});



//now the API syntaxes, will be little differnt this time.. 
//and if routing part enbales..these API's created in here should be copied into the related database model controller file

/*---------------------------------------------------------- 
//1- post--- //
app.post('/items',async(req,res)=>{  
  try {
   
  const {name, description}= req.body; // this time, req.body's object will be restructured and saved as a const
                                       
  const data = new category({ 
   
       name,                 // including the restructured part into the model's object and saved in a veriable
       description 
   })

   await data.save()         //store the variable's content in database
                             //async and await use to excute the code in a order..code with a 'await' key word always executing on the same position that the code existing on..not before or later   
   
   res.sendStatus(200);

  }

  catch (e){
    
   console.log("error",e);
   
   // if not success and data did not be saved
   res.sendStatus(500);
  }
})  ;



// 2- get-- to get the data that stored 

app.get('/getitems', async (req,res)=> {


    try{

       const data = await category.find(); //-- find () will get all the data from predefined database model
       res.status(200).json(data);    // rest is the same
       console.log("see the converted json obj : ",JSON.stringify(items));
    }


    catch(e){

      res.sendStatus(500);
      console.log('error',e);
    }

})

// 3- put---updating the data stored data

app.put('/updateitems/:id', async (req,res)=>{

 try{
     
    const {id }= req.params;  // req's params got id(will give the object that need to be update)..restructing{} that part and saved 
    const {name}= req.body;   //req's body will provide the value that need to be changed..restructing{} that part and saved

   await category.updateOne({_id:id},{name:name}); //passing those two parts to the category.updateone() 
                                                   // will changed the specific values of predefined database model(category)
   res.sendStatus(200); }
     

 

 catch(e){

   res.sendStatus(500);
   console.log("error",e);

 }


})

// 4- delete ---to deleting stored items

app.delete('/deleteitems/:id',async(req,res)=>{

 try{

      const {id}= req.params;
         
      await category.deleteOne({_id:id});  // will delete the object that include specific _id:value

      res.sendStatus(200);


 }

 catch(e) {

   res.sendStatus(500);
   console.log("error",e)


 }


}) ----------------------------------------------------------------------------------------*/



// connection string link to the mongoDB cloud= (mongodb+srv://achinthaudayanga150:3irU4USdD38JViBS@cluster0.t7dlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0)
//database username:  achinthaudayanga151
//database password: 6Z6JhgWLg8tWIjDd






