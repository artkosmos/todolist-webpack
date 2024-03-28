import { act, fireEvent, waitFor } from '@testing-library/react';

import { mockedTaskList, renderWithProviders } from '@/__mocks__';
import { ListCreator } from '@/components/business/list-creator';

import '@testing-library/jest-dom';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('testing of list creator component', () => {
  const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');

  afterEach(() => localStorageGetItem.mockClear());

  test('should appear info title if list is empty', async () => {
    localStorageGetItem.mockReturnValueOnce(JSON.stringify(null));

    const { queryByRole, findByTestId } = renderWithProviders(<ListCreator />);

    const infoTitle = await findByTestId('info-title');
    const table = queryByRole('table');

    expect(infoTitle).toHaveTextContent('No available data');
    expect(table).not.toBeInTheDocument();
  });

  test('should appear table with tasks if list is not empty', async () => {
    localStorageGetItem.mockReturnValueOnce(JSON.stringify(mockedTaskList));

    const { findByRole, queryByTestId, getAllByTestId } = renderWithProviders(
      <ListCreator />,
    );

    const table = await findByRole('table');
    const tasks = getAllByTestId(/table-row-/);
    const info = queryByTestId('info-title');

    expect(info).not.toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(tasks).toHaveLength(mockedTaskList.length);
  });

  test('must be disabled button and active loader while init fetching', async () => {
    localStorageGetItem.mockReturnValueOnce(JSON.stringify(mockedTaskList));

    const { findByRole, getByTestId } = renderWithProviders(<ListCreator />);

    const addButton = getByTestId('primary-button');
    const loader = getByTestId('loader');

    expect(addButton).toBeDisabled();
    expect(addButton).toHaveTextContent('Add task');
    expect(loader).toBeInTheDocument();
    await waitFor(() => expect(loader).not.toBeInTheDocument());

    const table = await findByRole('table');

    expect(table).toBeInTheDocument();
    expect(addButton).not.toBeDisabled();
    expect(loader).not.toBeInTheDocument();
  });

  test('task should be created and added in a table', async () => {
    localStorageGetItem.mockReturnValueOnce(JSON.stringify(null));

    const { getByRole, getByTestId, getByLabelText, getByText } =
      renderWithProviders(<ListCreator />);

    const addButton = getByTestId('primary-button');

    await waitFor(() => expect(addButton).not.toBeDisabled());

    fireEvent.click(addButton);

    const dialog = getByTestId('dialog');
    const form = getByRole('form');
    const nameInput = getByLabelText('Task name');
    const dateInput = getByLabelText('Date');
    const confirmButton = getByText('Add');

    expect(dialog).toContainElement(form);
    expect(form).toContainElement(dateInput);
    expect(form).toContainElement(nameInput);
    expect(form).toContainElement(confirmButton);

    fireEvent.change(nameInput, { target: { value: 'New task' } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01T00:00' } });
    await act(() => fireEvent.click(confirmButton));

    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
    await waitFor(() => expect(loader).not.toBeInTheDocument());

    const table = getByRole('table');
    const row = getByTestId(/table-row/);

    expect(table).toContainElement(row);
    expect(row).toHaveTextContent('New task');
  });

  test('dialog should be closed if a cancel button was clicked', async () => {
    const { getByTestId, getByText } = renderWithProviders(<ListCreator />);

    const addButton = getByTestId('primary-button');

    await waitFor(() => expect(addButton).not.toBeDisabled());

    fireEvent.click(addButton);

    const dialog = getByTestId('dialog');
    const cancelButton = getByText('Cancel');

    expect(dialog).toContainElement(cancelButton);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });

  test('task should be removed from a table when icon is clicked', async () => {
    localStorageGetItem
      .mockReturnValueOnce(JSON.stringify(mockedTaskList))
      .mockReturnValueOnce(JSON.stringify(mockedTaskList));

    const { getAllByTestId, findByRole, getByTestId } = renderWithProviders(
      <ListCreator />,
    );

    const table = await findByRole('table');

    expect(table).toBeInTheDocument();

    const tasks = getAllByTestId(/table-row/);

    expect(tasks).toHaveLength(mockedTaskList.length);

    const taskToDelete = tasks[0];
    const deleteIcon = taskToDelete.querySelector('svg');

    fireEvent.click(deleteIcon);
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
    await waitFor(() => expect(loader).not.toBeInTheDocument());

    const updatedTasks = getAllByTestId(/table-row/);

    expect(updatedTasks).toHaveLength(mockedTaskList.length - 1);
  });

  test('should trigger navigate if task row is clicked', async () => {
    localStorageGetItem.mockReturnValueOnce(JSON.stringify(mockedTaskList));

    const { findAllByTestId } = renderWithProviders(<ListCreator />);

    const tasks = await findAllByTestId(/table-row/);
    const taskToClick = tasks[2];
    fireEvent.click(taskToClick);

    expect(mockedNavigate).toHaveBeenCalledWith('/task/151dfeb3');
  });
});
