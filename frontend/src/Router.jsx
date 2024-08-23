import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/User/UserHome'
import { CompanyPrivateRoute, UserPrivateRoute } from './PrivateRoute'
import UserLogin from './pages/User/UserLogin'
import UserRegister from './pages/User/UserRegister'
import UserHome from './pages/User/UserHome'
import CompanyHome from './pages/Company/CompanyHome'
import CompanyLogin from './pages/Company/CompanyLogin'
import CompanyRegister from './pages/Company/CompanyRegister'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },

    { path: '/user/login', element: <UserLogin /> },
    { path: '/user/register', element: <UserRegister /> },
    { path: '/user', element: <UserPrivateRoute><UserHome /></UserPrivateRoute> },

    { path: "/company/login", element: <CompanyLogin /> },
    { path: "/company/register", element: <CompanyRegister /> },
    { path: "/company", element: <CompanyPrivateRoute><CompanyHome /></CompanyPrivateRoute> },
])

export default router