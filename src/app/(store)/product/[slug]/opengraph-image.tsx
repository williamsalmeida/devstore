/* eslint-disable @next/next/no-img-element */
import { env } from '@/env'
import { api } from '@/data/api'
import { ImageResponse } from 'next/og'
import { zinc } from 'tailwindcss/colors'
import { Product } from '@/data/types/products'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  })

  const product = await response.json()

  return product
}

export default async function Image({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: zinc[950],
        }}
      >
        <span
          style={{
            color: zinc[50],
            fontSize: 32,
            padding: 20,
          }}
        >
          {product.title}
        </span>
        <img src={productImageURL} alt="" />
      </div>
    ),
    {
      ...size,
    },
  )
}
