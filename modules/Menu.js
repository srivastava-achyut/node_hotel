const mongoose=require('mongoose')

const menuSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            emum:['Starter','Breakfast','Lunch','Dinner'],
            required:true
        },
        isVeg:{
            type:Boolean,
            required:true
        },
        description:{
            type:String
        }
    }
)
module.exports=mongoose.model('Menu',menuSchema)