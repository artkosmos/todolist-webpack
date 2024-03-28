import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

import { type AppStore, type RootState, setupStore } from '@/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  initialRouterPath?: string[];
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    initialRouterPath,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <MemoryRouter initialEntries={initialRouterPath}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
