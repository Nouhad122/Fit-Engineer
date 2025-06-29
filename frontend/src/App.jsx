import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import Home from './Pages/Home'
import ClientFormPage from './Pages/ClientFormPage'
import AdminDashboardPage from './Pages/AdminDashboardPage'
import DetailsPage from './Pages/DetailsPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/client-form',
          element: <ClientFormPage />
        },
        {
          path: '/admin-dashboard',
          element: <AdminDashboardPage />
        },
        {
          path: '/client-details/:id',
          element: <DetailsPage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
