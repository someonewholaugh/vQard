import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Collection from '@/pages/Collection';
import Discover from '@/pages/Discover';
import NotFound from '@/pages/NotFound';
import Create from '@/pages/vcard/Create';
import Edit from '@/pages/vcard/Edit';
import Detail from '@/pages/vcard/Detail';

const routes = [
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/collection',
    element: <Collection />
  },
  {
    path: '/discover',
    element: <Discover />
  },
  {
    path: '/c/:id/edit',
    element: <Edit />,
  },
  {
    path: '/c/:id',
    element: <Detail />,
  },
];

export const router = createBrowserRouter(routes);
