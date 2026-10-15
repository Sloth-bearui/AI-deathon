import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Providers } from './providers';
import { router } from './router';

export const App: React.FC = () => (
  <Providers>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </Providers>
);
