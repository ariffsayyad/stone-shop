'use client'
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import { assets } from "@/assets/assets"
import Image from "next/image"
import { EditIcon, TrashIcon, PlusIcon } from "lucide-react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addProduct, updateProduct, deleteProduct } from "@/lib/features/product/productSlice"

export default function AdminProducts() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: ""
    })

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (response.ok) {
                const data = await response.json()
                setProducts(data)
                // Update Redux store
                data.forEach(product => dispatch(addProduct(product)))
            } else {
                // Fallback to localStorage if API fails
                const storedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
                setProducts(storedProducts)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            // Fallback to localStorage
            const storedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
            setProducts(storedProducts)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProductData({ ...productData, image: URL.createObjectURL(file) })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const productPayload = {
                name: productData.name,
                description: productData.description,
                price: parseFloat(productData.price),
                images: productData.image ? [productData.image] : [assets.product_img1],
                category: productData.category,
                storeId: "store_1" // Default store ID for admin products
            }

            if (editingProduct) {
                // Update existing product via API
                const response = await fetch(`/api/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...productPayload,
                        inStock: parseInt(productData.stock) > 0
                    }),
                })

                if (response.ok) {
                    const updatedProduct = await response.json()
                    const updatedProducts = products.map(p =>
                        p.id === editingProduct.id ? updatedProduct : p
                    )
                    setProducts(updatedProducts)
                    dispatch(updateProduct(updatedProduct))
                    toast.success("Product updated successfully!")
                } else {
                    throw new Error('Failed to update product')
                }
            } else {
                // Add new product via API
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productPayload),
                })

                if (response.ok) {
                    const newProduct = await response.json()
                    const updatedProducts = [newProduct, ...products]
                    setProducts(updatedProducts)
                    dispatch(addProduct(newProduct))
                    toast.success("Product added successfully!")
                } else {
                    throw new Error('Failed to add product')
                }
            }

            // Reset form
            setProductData({
                name: "",
                description: "",
                price: "",
                image: "",
                category: "",
                stock: ""
            })
            setShowAddForm(false)
            setEditingProduct(null)
        } catch (error) {
            console.error('Error saving product:', error)
            toast.error("Failed to save product. Please try again.")
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setProductData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            image: product.image,
            category: product.category,
            stock: product.stock.toString()
        })
        setShowAddForm(true)
    }

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                const updatedProducts = products.filter(p => p.id !== productId)
                setProducts(updatedProducts)
                dispatch(deleteProduct(productId))
                toast.success("Product deleted successfully!")
            } else {
                throw new Error('Failed to delete product')
            }
        } catch (error) {
            console.error('Error deleting product:', error)
            toast.error("Failed to delete product. Please try again.")
        }
    }

    if (loading) return <Loading />

    return (
        <div className="text-slate-500">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl">Product <span className="text-slate-800 font-medium">Management</span></h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-900 transition"
                >
                    <PlusIcon size={18} />
                    Add Product
                </button>
            </div>

            {/* Add/Edit Product Form */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Product Name"
                                className="border border-slate-300 p-2 rounded outline-slate-400"
                                required
                            />
                            <input
                                name="category"
                                value={productData.category}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Category"
                                className="border border-slate-300 p-2 rounded outline-slate-400"
                                required
                            />
                        </div>
                        <textarea
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                            rows={3}
                            className="border border-slate-300 p-2 rounded outline-slate-400 w-full"
                            required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                type="number"
                                step="0.01"
                                placeholder="Price"
                                className="border border-slate-300 p-2 rounded outline-slate-400"
                                required
                            />
                            <input
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="Stock Quantity"
                                className="border border-slate-300 p-2 rounded outline-slate-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border border-slate-300 p-2 rounded outline-slate-400 w-full"
                            />
                            {productData.image && (
                                <Image
                                    src={productData.image}
                                    alt="Preview"
                                    width={100}
                                    height={100}
                                    className="mt-2 rounded"
                                />
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
                            >
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddForm(false)
                                    setEditingProduct(null)
                                    setProductData({
                                        name: "",
                                        description: "",
                                        price: "",
                                        image: "",
                                        category: "",
                                        stock: ""
                                    })
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white border border-slate-200 rounded-lg p-4">
                        <Image
                            src={product.images?.[0] || product.image || assets.product_img1}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{product.name}</h3>
                        <p className="text-slate-600 text-sm mb-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-800 font-bold">${product.price}</span>
                            <span className="text-sm text-slate-500">Stock: {product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                        <span className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs mb-4">
                            {product.category}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(product)}
                                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition flex items-center justify-center gap-1"
                            >
                                <EditIcon size={14} />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition flex items-center justify-center gap-1"
                            >
                                <TrashIcon size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500">No products found. Add your first product!</p>
                </div>
            )}
        </div>
    )
}
