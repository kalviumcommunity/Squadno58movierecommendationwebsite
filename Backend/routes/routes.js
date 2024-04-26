const express=require('express');
const{moviesModel}=require('../model/movies')
const CRUD_routes=express.Router()


CRUD_routes.get('/',async(req,res)=>{
    // console.log("req")
    try{
        const movies=await moviesModel.find()
        // console.log(movies)
        res.json(movies)
    }catch(err){
        console.log(err)
        res.send({'Error':err})
    }
})


CRUD_routes.post('/Create',async(req,res)=>{
    
    // console.log(req)
    
    let payload=req.body
    console.log(payload)
    try { 
        const newmovies=new moviesModel(payload)
        await newmovies.save()
        // await moviesModel.create(payload)
        console.log(newmovies,payload);
        res.send({"message":"movies created successfully"})
        
    } catch (error) {
        res.send('Error '+error)
        
    }
})

CRUD_routes.put('/Update/:id',async(req,res)=>{
    
    let id=req.params.id
    let payload=req.body
    console.log(id,payload)
    try {
        const movie=await moviesModel.findByIdAndUpdate(id,payload)
        res.json({"message":"movies updated successfully",movie})
    } catch(error){
        res.send('Error '+error)
    }
})

CRUD_routes.delete('/Delete/:id',async(req,res)=>{
    let id=req.params.id
    try {
        const movies=await moviesModel.findByIdAndDelete(id)
        res.json({"message":"movies deleted successfully"})
    } catch(error){
        res.send('Error '+error)
    }
})

module.exports=CRUD_routes