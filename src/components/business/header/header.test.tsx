import { fireEvent, render, within } from '@testing-library/react';

import { Header } from '@/components/business/header/header';

import '@testing-library/jest-dom';

describe('testing of header component', () => {
  test('should render with app name and select with default language', () => {
    const { getByText, getByTestId, getByLabelText } = render(<Header />);

    const header = getByTestId('header');
    const appName = getByText(/Crazy Planner/);
    const select = getByLabelText('Language');

    expect(header).toContainElement(appName);
    expect(header).toContainElement(select);
    expect(select).toHaveTextContent('English');
  });

  test('select should contain only supported languages', () => {
    const numberOfLanguages = 2;

    const { getAllByRole, getByTestId } = render(<Header />);

    const select = getByTestId('select');
    const selectButton = within(select).getByRole('combobox');
    fireEvent.mouseDown(selectButton);

    const selectOptions = getAllByRole('option');

    expect(selectOptions).toHaveLength(numberOfLanguages);
    expect(selectOptions[0]).toHaveTextContent('English');
    expect(selectOptions[1]).toHaveTextContent('Russian');
  });

  test('should change app language', async () => {
    const { findByText, getByTestId, getByRole } = render(<Header />);

    const select = getByTestId('select');
    const selectButton = within(select).getByRole('combobox');
    fireEvent.mouseDown(selectButton);

    const lngOption = getByRole('option', { name: 'Russian' });
    fireEvent.click(lngOption);
    const appName = await findByText(/Сумасшедший Планировщик/);

    expect(appName).toBeInTheDocument();
  });
});
