import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { router } from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'mobx-react'
import RootStore from './Shared/Stores/root.store'
import { RouterProvider } from 'react-router-dom'
const rootStore = new RootStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider {...rootStore}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
