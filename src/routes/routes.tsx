import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { HomeLazy } from '@/components/page/home';
import { TaskDescriptionLazy } from '@/components/page/task-description';
import { NotFound } from '@/components/shared/not-found';

import { HOME, TASK } from './constants';

export const router = createBrowserRouter([
  {
    path: HOME,
    element: (
      <Suspense>
        <HomeLazy />
      </Suspense>
    ),
  },
  {
    path: `${TASK}/:id`,
    element: (
      <Suspense>
        <TaskDescriptionLazy />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
