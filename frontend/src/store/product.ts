import { create } from "zustand"

export type Props = {
  name: string,
  price: string,
  image: string,
  _id?: string
}

type ProductStore = {
  products: Props[],
  setProducts: ( products: Props[] ) => void,
  createProduct: ( newProduct: Props ) => Promise<{success: boolean, message: string}>,
  fetchProducts: () => Promise<{success: boolean, message: string} | void>,
  deleteProduct: ( pid: string ) => Promise<{success: boolean, message: string}>,
  updateProduct: ( pid: string, updatedProduct: Props) => Promise<{success: boolean, message: string}>
}


export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: ( products: Props[] ) => set({ products }),
  createProduct: async ( newProduct: Props ) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {success: false, message: 'Please fill in all fields.'}
    }

    const res = await fetch("/api/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })

    const data = await res.json()
    set((state) => ({ products: [...state.products, data.data] }))

    return { success: true, message: '已新增產品！' }
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    set({ products: data.data })
  },
  deleteProduct: async ( pid ) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'DELETE'
    })

    const data = await res.json()

    if (!data.success) return { success: false, message: data.message }

    set( state => ({ products: state.products.filter( product => product._id !== pid)}))

    return { success: true, message: '已刪除產品！' }
  },
  updateProduct: async (pid: string, updatedProduct: Props) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })

    const data = await res.json()

    if (!data.success) return { success: false, message: data.message }

    set( state => ({
      products: state.products.map( product => (product._id === pid ? data.data : product))
    }))

    return { success: true, message: '已修改產品！' }
  }
}))