import { fireEvent, render } from '@testing-library/react';

import { TaskCard } from '@/components/business/task-card';
import TaskDescription from '@/components/page/task-description/task-description';

import '@testing-library/jest-dom';

jest.mock('@/components/business/task-card', () => ({
  TaskCard: jest.fn(() => <span>Task Card</span>),
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('testing of task page', () => {
  test('should render nested content', () => {
    const { getByTestId } = render(<TaskDescription />);

    const homeButton = getByTestId('back-button');

    expect(homeButton).toBeInTheDocument();
    expect(TaskCard).toBeDefined();
    expect(TaskCard).toHaveBeenCalled();
  });

  test('should trigger navigate if home button is clicked', () => {
    const { getByTestId } = render(<TaskDescription />);

    const homeButton = getByTestId('back-button');

    fireEvent.click(homeButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
