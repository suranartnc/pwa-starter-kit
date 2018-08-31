import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import routes from '@routes'

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />

        {routes.map(({ path, exact, component }) => (
          <Route key={path} exact={exact} path={path} component={component} />
        ))}
      </div>
    </Router>
  )
}
