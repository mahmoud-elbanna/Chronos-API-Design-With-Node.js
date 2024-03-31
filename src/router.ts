import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product'
import { handleInputErrors } from './modules/middleware'
import { updateProduct } from './functions_helper/funcsUpdate'
/*
router file represents an Express router configuration for handling various routes related to products, updates, and update points.
It utilizes the express-validator middleware for input validation.
*/

const router = Router()                // const router to initializes an Express router using Router() function provided by Express
                                       // The router will be used to define the routes for handling product, update and updatepoint related request

// Implement routes for CRUD operations on product resources
router.get('/product', getProducts)    // Defines a route for handling HTTP GET requests to the '/product' endpoint. When a GET request is made to '/product', it will invoke the getProducts handler function
router.get('/product/:id', getOneProduct)  // The ':id' part in the route acts as a URL parameter and can be accessed within the handler function. When a GET request is made to this endpoint, it will invoke the getOneProduct

router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {
    const productId = req.params.id;   // Extract the product ID from the URL parameter

    const updatedProductName = req.body.name;  // Extract the updated product name from the request body

    // a function called `updateProduct`
    // that takes the product ID and the updated name as arguments and updates the product
    updateProduct(productId, updatedProductName)
        .then(() => {
            // If the product update was successful, send a success response
            res.status(200).json({ message: 'Product updated successfully' });
        })
        .catch((error) => {
            // If there was an error updating the product, send an error response
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
  
}) // handleInputErrors middleware handles input validation errors and body('name').isString() middleware checks if the 'name' field in the request body is a string.

router.post('/product', body('name').isString(), handleInputErrors, createProduct) // HTTP POST requests to the '/product' endpoint , invok func createProduct
router.delete('/product/:id', deleteProduct)              // func deleteProduct to implement


// Implement routes for CRUD operations on update resources.
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',                           // optional validation rules for fields like 'title', 'body', 'status', and 'version'.
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
)

router.post('/update',                 //  It specifies validation rules for required fields like 'title', 'body', and 'productId'.
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
)

router.delete('/update/:id', deleteUpdate)

// Define placeholder routes for update point resources
router.get('/updatepoint', () => {})                // PUT requests to update an existing update point
router.get('/updatepoint/:id', () => {})              // The 'name' and 'description' fields are specified as optional and should be strings
router.put('/updatepoint/:id',                         // When a PUT request is made to this endpoint, it will execute 
  body('name').optional().isString(),                  // function to update the specified update point.
  body('description').optional().isString(),
  () => {}
)

router.post('/updatepoint',                          // func to create a new update point.
  body('name').isString(),                          // The 'name' and 'description' fields are specified as required strings.
  body('description').isString(),                   // and it requires the 'updateId' field to exist and be a string.
  body('updateId').exists().isString(),            // POST request is made to this endpoint, it will execute the provided func
  () => {}
)

router.delete('/updatepoint/:id', () => {})      // delete an existing update point by its ID.
                                                // When a DELETE request is made to this endpoint, it will execute the function
export default router                           // exports the router instance, making it available for use in other parts of the application.