import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

import routes from '@routes'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {routes.map(({ path, exact, component }) => (
            <Route key={path} exact={exact} path={path} component={component} />
          ))}
        </div>
      </Router>
    </Provider>
  )
}
