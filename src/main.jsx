import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import mainRoute from './route/mainRoute'



ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={mainRoute}>
      
        </RouterProvider>
)
