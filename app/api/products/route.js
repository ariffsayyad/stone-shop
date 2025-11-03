import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                store: true,
                rating: true
            }
        })

        // Transform products to match frontend expectations
        const transformedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            mrp: product.mrp || product.price,
            images: product.images,
            image: product.images[0] || null, // For backward compatibility
            category: product.category,
            inStock: product.inStock,
            stock: product.inStock ? 10 : 0, // Default stock value
            storeId: product.storeId,
            store: product.store,
            rating: product.rating,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }))

        return NextResponse.json(transformedProducts)
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, description, price, images, category, storeId } = body

        if (!name || !description || !price || !images || !category || !storeId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                images,
                category,
                storeId
            },
            include: {
                store: true
            }
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }
}
