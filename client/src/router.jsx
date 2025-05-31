import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Order from './pages/order/order';
import TablePage from './pages/Table/Table';
import OrderLine from './pages/OrderLine/OrderLine';


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
        errorElement: <div>Order Line page not found</div>
    }
]);