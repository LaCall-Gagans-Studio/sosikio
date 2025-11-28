import { FooterClient } from './footerClient'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: products }] = await Promise.all([
    payload.find({
      collection: 'products',
      sort: 'order',
      depth: 2,
    }),
  ])

  return <FooterClient products={products} />
}
