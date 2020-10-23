import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO'
import { client } from '@/lib/prismic'
import PrismicDom from 'prismic-dom'
import Prismic from 'prismic-javascript'
import { Document } from 'prismic-javascript/types/documents'

interface HomeProps {
  recommendedProducts: Document[]
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, your alwesome e-commerce"
        shouldExcludeTitleSuffix
        image="HelpyLogo"
      />

      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
