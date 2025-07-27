import React, { useState } from 'react'
import axios from 'axios'

const RemoveProduct = () => {
  const [productId, setProductId] = useState('')
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    setError('')
    setProduct(null)

    if (!productId) {
      setError('Please enter a product ID')
      return
    }

    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/allproducts`)
      const found = res.data.find((p) => p.id === Number(productId))

      if (found) {
        setProduct(found)
      } else {
        setError('Product not found')
      }
    } catch (err) {
      console.error(err)
      setError('Error fetching product')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!product) return

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}" (ID: ${product.id})?`
    )

    if (!confirmDelete) return

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/removeproduct`, {
        id: product.id,
      })

      alert('Product deleted successfully!')
      setProductId('')
      setProduct(null)
    } catch (err) {
      console.error(err)
      alert('Error deleting product')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Remove Product</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          Enter Product ID
        </label>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {product && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-auto object-contain mb-2"
          />
          <p>ID: {product.id}</p>
          <p>Category: {product.category}</p>
          <p>Old Price: ₹{product.old_price}</p>
          <p>New Price: ₹{product.new_price}</p>

          <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Delete Product
          </button>
        </div>
      )}
    </div>
  )
}

export default RemoveProduct
