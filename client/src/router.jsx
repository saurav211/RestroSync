import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Order from './pages/order/Order';
import TablePage from './pages/Table/Table';
import OrderLine from './pages/OrderLine/OrderLine';
import Dashboard from './pages/dashboard/Dashboard';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>Page not found</div>
    },
    {
        path: '/order',
        element: <Order />,
        errorElement: <div>Order page not found</div>
    },
    {
        path: '/tables',
        element: <TablePage />,
        errorElement: <div>Table page not found</div>
    },
    {
        path: '/order-line',
        element: <OrderLine />,
        errorElement: <div>Order line page not found</div>
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <div>Dashboard page not found</div>
    }
]);