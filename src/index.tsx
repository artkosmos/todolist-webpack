import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { Header } from '@/components/business/header';
import { router } from '@/routes';
import { setupStore } from '@/store';

import './style/style.scss';

import './i18n.ts';

const rootElement = document.getElementById('root');
const container = createRoot(rootElement);

container.render(
  <Provider store={setupStore()}>
    <Header />
    <RouterProvider router={router} />
  </Provider>,
);
