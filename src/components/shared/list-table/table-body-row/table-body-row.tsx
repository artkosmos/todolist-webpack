import { type ComponentPropsWithoutRef, MouseEvent } from 'react';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { DeleteIcon } from '@/assets/icons/delete-icon';
import { StarIcon } from '@/assets/icons/star-icon';
import type { ITask } from '@/common/types';

type Props = {
  task: ITask;
  deleteRow: (id: string) => void;
  isMobile?: boolean;
  dateFormat?: string;
} & ComponentPropsWithoutRef<'tr'>;

export const TableBodyRow = ({
  task,
  deleteRow,
  isMobile,
  dateFormat,
  ...rest
}: Props) => {
  const deleteRowHandler = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    deleteRow(task.id);
  };

  const classNames = {
    delete: clsx('table-delete-icon', 'table-delete-icon_dark'),
    taskTitle: clsx('list-table__task-title'),
  };

  return (
    <tr key={task.id} {...rest}>
      {!isMobile && <td>{task.id}</td>}
      <td className={classNames.taskTitle}>{task.title}</td>
      {!isMobile && <td>{dayjs(task.date).format(dateFormat)}</td>}
      <td>{task.important && <StarIcon className={'table-star-icon'} />}</td>
      <td>
        <DeleteIcon className={classNames.delete} onClick={deleteRowHandler} />
      </td>
    </tr>
  );
};
