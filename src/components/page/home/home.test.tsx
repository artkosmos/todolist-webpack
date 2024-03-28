import { render } from '@testing-library/react';

import { ListCreator } from '@/components/business/list-creator';

import Home from './home';

import '@testing-library/jest-dom';

jest.mock('@/components/business/list-creator', () => ({
  ListCreator: jest.fn(() => <span>List Creator</span>),
}));

describe('testing of home page', () => {
  test('should render nested content', () => {
    render(<Home />);

    expect(ListCreator).toBeDefined();
    expect(ListCreator).toHaveBeenCalled();
  });
});
