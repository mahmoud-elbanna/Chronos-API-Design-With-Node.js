import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product'
import { handleInputErrors } from './modules/middleware'
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
