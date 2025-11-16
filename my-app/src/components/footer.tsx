import { FooterClient } from './footerClient'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: products }, overview] = await Promise.all([
    payload.find({
      collection: 'products',
      sort: 'order',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'overview',
      depth: 2,
    }),
  ])

  return <FooterClient products={products} />
}
