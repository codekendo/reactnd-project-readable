import React from "react"
import { render } from "react-dom"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducers/"
import { Provider } from "react-redux"
import { createLogger } from "redux-logger"

const middleware = [thunk, createLogger()];


const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
