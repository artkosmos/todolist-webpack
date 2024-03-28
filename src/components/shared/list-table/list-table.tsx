import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';

import { ITask } from '@/common/types';
import { TableBodyRow } from '@/components/shared/list-table';

import './style.scss';

type Props = {
  list: ITask[];
  className?: string;
  deleteTask?: (id: string) => void;
  onRowClick?: (id: string) => void;
};

export const ListTable = ({
  list,
  deleteTask,
  className,
  onRowClick,
}: Props) => {
  const { t } = useTranslation('home');

  const taskList = useMemo(() => {
    return list.map(task => {
      return (
        <TableBodyRow
          data-testid={`table-row-${task.id}`}
          onClick={() => onRowClick(task.id)}
          key={task.id}
          task={task}
          deleteRow={deleteTask}
        />
      );
    });
  }, [list]);

  const classNames = clsx('table-container', className);

  return (
    <div className={classNames}>
      <table className={'list-table'} cellSpacing={0}>
        <thead>
          <tr>
            <th>{t('table_column_1')}</th>
            <th>{t('table_column_2')}</th>
            <th>{t('table_column_3')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{taskList}</tbody>
      </table>
    </div>
  );
};
