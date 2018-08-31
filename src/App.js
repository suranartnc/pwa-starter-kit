import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import routes from '@routes'
import Layout from '@common/components/Layout'

export default function App() {
  return (
    <Router>
      <Layout>
        {routes.map(({ path, exact, component }) => (
          <Route key={path} exact={exact} path={path} component={component} />
        ))}
      </Layout>
    </Router>
  )
}
