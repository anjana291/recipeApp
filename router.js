const express = require('express')
const userController = require('./controllers/userControllers')
const recipeController = require('./controllers/recipeController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')

const router = new express.Router()

router.post('/register',userController.register)

router.post('/login',userController.login)

router.post('/upload-recipe',jwtMiddleware,multerConfig.single('thumbnail'),recipeController.uploadRecipe)

router.get('/get-all-recipe',recipeController.getAllRecipe)

router.get('/user-recipe',jwtMiddleware,recipeController.getUserRecipe)

router.delete('/delete-recipe/:id',jwtMiddleware,recipeController.deleteUserRecipe)

router.get('/get-recipe/:id',recipeController.getARecipe)

router.put('/update-profile',jwtMiddleware,multerConfig.single('profilepic'),userController.updateProfile)

router.put('/edit-recipe/:id',jwtMiddleware,multerConfig.single('thumbnail'),recipeController.editRecipr)

router.get('/user-profile/:id',userController.getUserDet)

router.get('/user-recipes/:id',recipeController.getAllUserRecipes)

module.exports = router