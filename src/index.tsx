import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App'
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

reportWebVitals()
