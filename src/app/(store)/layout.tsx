import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'
import { ReactNode } from 'react'

interface StoreLayoutProps {
  children: ReactNode
  modal?: ReactNode
}

export default function StoreLayout({ children, modal }: StoreLayoutProps) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-rows-app gap-5 p-8">
        <Header />
        {children}
        {modal}
      </div>
    </CartProvider>
  )
}
