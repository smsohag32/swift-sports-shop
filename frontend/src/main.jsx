import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { Provider } from 'react-redux'
import store from './redux-store/store'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} >

         </RouterProvider>
         <Toaster
            position="top-right"
            richColors={true}
            duration={2000}
         />
      </Provider>
   </StrictMode>
)
