import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import * as stores from './stores'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/index.css'

function renderApp() {
  ReactDOM.render(
    <Provider {...stores}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root'),
  )
}

renderApp()

if (module.hot) {
  module.hot.accept(['./components/App.jsx'], () => {
    renderApp()
  })
}
