import { fireEvent, render } from '@testing-library/react';

import { ITask } from '@/common/types';

import { ListTable } from './list-table';

import '@testing-library/jest-dom';

describe('testing of table component', () => {
  const list: ITask[] = [
    { id: '1', title: 'Task 1', date: new Date().toString() },
    { id: '2', title: 'Task 2', date: new Date().toString() },
  ];

  test('should render with tasks in list', () => {
    const { getByRole, getByTestId } = render(<ListTable list={list} />);

    const table = getByRole('table');
    const row1 = getByTestId('table-row-1');
    const row2 = getByTestId('table-row-2');

    expect(table).toContainElement(row1);
    expect(table).toContainElement(row2);
  });

  test('should render with an empty task list', () => {
    const { getByRole, queryAllByTestId } = render(<ListTable list={[]} />);

    const table = getByRole('table');
    const rows = queryAllByTestId(/table-row-/);

    expect(table).toBeInTheDocument();
    expect(rows.length).toBe(0);
  });

  test('should trigger callback when a row is clicked', () => {
    const onRowClick = jest.fn();

    const { getByTestId } = render(
      <ListTable list={list} onRowClick={onRowClick} />,
    );

    const row = getByTestId('table-row-2');

    fireEvent.click(row);

    expect(onRowClick).toHaveBeenCalledWith(list[1].id);
  });

  test('should execute callback when a delete icon is clicked', () => {
    const deleteTask = jest.fn();
    const { getByTestId } = render(
      <ListTable list={list} deleteTask={deleteTask} />,
    );

    const row = getByTestId('table-row-2');
    const deleteIcon = row.querySelector('svg');

    fireEvent.click(deleteIcon);

    expect(deleteTask).toHaveBeenCalledWith('2');
  });
});
