const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config()
const port = process.env.PUBLIC_PORT || 3000;
const {connection,isConnected}=require('./config/db')
const moviesData = require('./config/data');
const { moviesModel, moviesSchema } = require('./model/movies');
const CRUD_routes = require('./routes/routes');
const cors=require('cors')
const joi=require('joi');
const { userModel } = require('./model/user.model');

app.use(express.json())
app.use(cors())

const schema=joi.object({
  email:joi.string().email().required(),
  password:joi.string().min(3).max(10).required()
})

const validateUserInput=(Input)=>{

  // console.log(email,password)
  const {error,value}=schema.validate(Input);

  if(error){
      console.log({message:"Validation failed", error})
      return false
  }else{
     console.log("Validation successfull")
     return true
  }
}

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});





//hi

app.post("/login", async (req,res)=>{
  console.log(req.headers)

// console.log(email,password)
const {email,password}= req.body
  let user=await userModel.findOne({email})

  if(user){
    console.log(user, "user")
      // const payload = { userId: user.id };
      


    res.send({"msg":"Logged In Successfully","token":user.email})
  }else{
    res.send({"msg":"Please Sign-Up First"})
    }
  
 })



app.post("/signup",async (req,res)=>{

  let result=validateUserInput(req.body);

  if(!result){
   res.send("Invalid data in the request");
   return;
  }

 try{
   const user = new userModel(req.body);
   await user.save();
   res.status(201).json({msg:"Validation & SignUp done Successfully",data:user.toJSON()})
 }catch(e){
   console.log(e)
   res.status(400).json({message:'Sign Up Failed', error: e})    
  }
  })



app.use("/routes",CRUD_routes)

app.listen(port,async () => { 
  try {
    await connection;
    console.log("Connected to DB successfully")
    
  } catch (error) {
     console.log("Error connecting to DB");
     console.log(error);
  }

  console.log(`Server is listening on port ${port}`);

});
