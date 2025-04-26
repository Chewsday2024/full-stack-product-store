import express from 'express'
import { createProduct, deleteProduct, getAllProducts, updatedProduct } from '../controllers/product.controller.js'


const router = express.Router()

router.get('/', getAllProducts)

router.post('/', createProduct)

router.put('/:id', updatedProduct)

router.delete('/:id', deleteProduct)



export default router