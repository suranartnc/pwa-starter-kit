import React from 'react'
import styled from 'styled-components'

import Layout from '@common/components/Layout'

const HomePageTitle = styled.h1`
  color: #ff0000;
`

export default function HomePage() {
  return (
    <Layout>
      <HomePageTitle>HomePage</HomePageTitle>
    </Layout>
  )
}
