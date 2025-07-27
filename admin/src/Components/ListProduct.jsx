import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListProduct = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/allproducts`)
        setProducts(res.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-auto object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">
                Category: <span className="font-medium">{product.category}</span>
              </p>
              <p className="text-gray-600 mb-1">
                Old Price:{' '}
                <span className="font-medium">₹{product.old_price}</span>
              </p>
              <p className="text-gray-600 mb-1">
                New Price:{' '}
                <span className="font-medium text-green-600">
                  ₹{product.new_price}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Added on: {new Date(product.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListProduct
