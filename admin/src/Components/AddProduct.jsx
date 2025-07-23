import React, { useState } from 'react'
import upload from '../assets/Admin_Assets/upload_area.svg'
import axios from 'axios'

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: 'women',
    new_price: '',
    old_price: '',
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData({ ...productData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setImageFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !productData.name ||
      !productData.new_price ||
      !productData.old_price ||
      !productData.category ||
      !imageFile
    ) {
      alert('Please fill in all fields and upload an image.')
      return
    }

    try {
      // 1️⃣ Upload image to backend
      const formData = new FormData()
      formData.append('product', imageFile)

      const uploadRes = await axios.post(
        'http://localhost:4000/upload',
        formData
      )

      const imageUrl = uploadRes.data.image_url

      const productRes = await axios.post('http://localhost:4000/addproduct', {
        name: productData.name,
        category: productData.category,
        new_price: Number(productData.new_price),
        old_price: Number(productData.old_price),
        image: imageUrl,  // ✅ must be included!
    })


      console.log('Product added:', productRes.data)
      alert('Product added successfully!')

      // Reset form
      setProductData({
        name: '',
        category: 'women',
        new_price: '',
        old_price: '',
      })
      setImagePreview(null)
      setImageFile(null)
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Error adding product')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <div className="mb-6">
        <p className="mb-2 text-gray-700 font-medium">Product Name</p>
        <input
          type="text"
          name="name"
          placeholder="Type here"
          value={productData.name}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="mb-2 text-gray-700 font-medium">Old Price</p>
          <input
            type="number"
            name="old_price"
            placeholder="Type here"
            value={productData.old_price}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <p className="mb-2 text-gray-700 font-medium">New Price</p>
          <input
            type="number"
            name="new_price"
            placeholder="Type here"
            value={productData.new_price}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-gray-700 font-medium">Product Category</p>
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="women">Women</option>
          <option value="kid">Kid</option>
          <option value="men">Men</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="file-input"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded p-6 cursor-pointer hover:border-blue-500 transition-colors"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-40 w-auto object-contain"
            />
          ) : (
            <>
              <img src={upload} alt="Upload" className="h-16 w-16 mb-2" />
              <p className="text-gray-600">Click to upload product image</p>
            </>
          )}
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageChange}
            required
            hidden
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
      >
        Add
      </button>
    </form>
  )
}

export default AddProduct
