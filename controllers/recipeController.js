const recipes = require("../model/recipeSchema")
const users = require("../model/userSchema")

exports.uploadRecipe = async (req, res) => {
    try {
        const userId = req.payload
        const thumbnail = req.file.filename
        const { title, calories, time, description, serves, cuisine, ingredients, instructions } = req.body
        const existingRecipe = await recipes.findOne({ title })

        if (existingRecipe) {
            res.status(406).json('This recipe title already exists')
        }
        else {
            const newRecipe = new recipes({
                title,
                calories,
                time,
                description,
                serves,
                cuisine,
                ingredients,
                instructions,
                thumbnail,
                userId
            })
            await newRecipe.save()
            await users.findByIdAndUpdate(userId, {
                $push: { uploadrecipe: newRecipe._id }
            })
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getAllRecipe = async (req, res) => {
    try {
        const searchKey = req.query.search
        console.log("swas", searchKey);
        const query = {
            title: {
                $regex: searchKey, $options: 'i'
            }
        }

        const allRecipes = await recipes.find(query)
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getUserRecipe = async (req, res) => {
    try {
        const userId = req.payload
        const userRecipes = await recipes.find({ userId })
        res.status(200).json(userRecipes)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.deleteUserRecipe = async (req, res) => {
    console.log('inside delete');

    try {
        const { id } = req.params
        const recipe = await recipes.findByIdAndDelete({ _id: id })
        await users.findByIdAndUpdate(recipe.userId, {
            $pull: { uploadrecipe: id }
        })
        res.status(200).json(recipe)

    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getARecipe = async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await recipes.findOne({ _id: id }).populate("userId")
        res.status(200).json(recipe)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.editRecipr = async (req, res) => {
    try {
        const { id } = req.params
        const { title, calories, time, description, serves, cuisine, ingredients, instructions, thumbnail } = req.body
        const uploadImage = req.file ? req.file.filename : thumbnail
        const existingRecipe = await recipes.findByIdAndUpdate({ _id: id }, {
            title,
            calories,
            time, description,
            serves, cuisine, ingredients, instructions,
            thumbnail: uploadImage
        }, { new: true })
        await existingRecipe.save()
        res.status(200).json(existingRecipe)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getAllUserRecipes = async (req, res) => {
    try {
        const { id } = req.params
        const existingRecipes = await recipes.find({userId:id})
        res.status(200).json(existingRecipes)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}