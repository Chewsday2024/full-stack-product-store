import Proudct from '../models/product.model.js'
import mongoose from 'mongoose'



export const getAllProducts = async (req, res) => {
  try {
    const products = await Proudct.find({})

    res.status(200).json({ success: true, data: products })
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ success: false, message: 'Server Error'})
  }
}

export const createProduct = async (req, res) => {
  const product = req.body
  
  if (!product.name || !product.price || !product.image) {
    return (res
      .status(400)
      .json({
        success: false,
        message: 'Please provide all fields'
      })
    )
  }
  
  const newProduct = new Proudct(product)
  
  try {
    await newProduct.save()
    
    res.status(201).json({ success: true, data: newProduct })
  } catch (err) {
    console.error(err)
    
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const updatedProduct = async (req, res) => {
  const { id } = req.params

  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product Id' })
  }

  try {
    const updatedProduct = await Proudct.findByIdAndUpdate(id, product, { new: true })

    res.status(200).json({ success: true, data: updatedProduct })
  } catch (err) {
    console.error(err.message)

    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    await Proudct.findByIdAndDelete(id)

    res.status(200).json({ success: true, message: 'Product deleted'})
  } catch (err) {
    res.status(404).json({ success: false, message: 'Product not found'})
  }
}