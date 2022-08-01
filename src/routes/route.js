const express = require('express');
const router = express.Router();
const { createUser, userLogin, getUserDetail, updateUser } = require("../controllers/userController")
const productController = require("../controllers/productController")
const { authorisation, authentication } = require("../middlewares/auth")
const { validateUserPut, validateProduct } = require("../middlewares/validation")
const {createCart} = require('../controllers/cartController.js');



//APIS for user
router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/user/:userId/profile", authentication, getUserDetail)
router.put('/user/:userId/profile', authentication, authorisation, validateUserPut, updateUser) //tested: working

//------------------------------------------------------------------------------------------------
//APIS for product
router.post("/products", validateProduct, productController.createProduct);
router.get("/products", productController.getProductsByQuery);
router.get("/products/:productId", productController.getProductsById)
router.put("/products/:productId",productController.updateProduct)
router.delete("/products/:productId",productController.deleteProduct)

//APIs for cart
router.post('/users/:userId/cart', createCart);          //POST /users/:userId/cart (Add to cart)



//--------------------------------------------------------------------------
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})  //awesome



module.exports=router;

