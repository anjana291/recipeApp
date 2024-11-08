const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    calories: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    serves: {
        type: String,
        required: true
    },
    cuisine:{
        type:String,
        required:true
    },
    ingredients: {
        type:String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
}, { timestamps: true })

const recipes = mongoose.model("recipes", recipeSchema)

module.exports = recipes