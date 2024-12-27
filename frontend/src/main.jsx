import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { Provider } from 'react-redux'
import store from './redux-store/store'
import AuthProvider from './context/AuthProvider'


createRoot(document.getElementById('root')).render(
   <StrictMode>
      <AuthProvider>
         <Provider store={store}>
            <RouterProvider router={router} >
            </RouterProvider>
         </Provider>
      </AuthProvider>

   </StrictMode>
)
