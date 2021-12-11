import { createContext, useContext, useState, ReactNode } from 'react'

interface ProductContextProps {
  currentProduct: string
}

interface ProductContextProviderProps {
  children: ReactNode
}

export const ProductContext = createContext({} as ProductContextProps)

export const ProductContextProvider = ({
  children
}: ProductContextProviderProps) => {
  const currentProduct = 'product1'

  return (
    <ProductContext.Provider value={{ currentProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  return useContext(ProductContext)
}
