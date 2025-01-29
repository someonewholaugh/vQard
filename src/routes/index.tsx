import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Create from '@/pages/vcard/Create';
import Edit from '@/pages/vcard/Edit';
import Detail from '@/pages/vcard/Detail';
import Collection from '@/pages/vcard/Collection';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/c/:id/edit',
    element: <Edit />,
  },
  {
    path: '/c/:id',
    element: <Detail />,
  },
  {
    path: '/collection',
    element: <Collection />
  }
];

export const router = createBrowserRouter(routes);
