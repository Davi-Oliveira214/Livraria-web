import { createBrowserRouter } from 'react-router'
import App from '../App'
import Adicionar from '../pages/adicionar'
import Home from '../pages/home/Index'

export const routers = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      children: [
         {
            path: '',
            element: <Home />,
         },
         {
            path: 'adicionar',
            element: <Adicionar />,
         },
      ],
   },
])
