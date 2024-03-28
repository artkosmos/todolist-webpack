import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { v4 as uuid } from 'uuid';

import { mainThunk } from '@/api';
import { Dialog } from '@/components/shared/dialog';
import { InfoTitle } from '@/components/shared/info-title';
import { ListTable } from '@/components/shared/list-table';
import { ButtonPrimary } from '@/components/shared/primary-button';
import {
  EditFormButtons,
  type IEditTaskAction,
  type ITaskFormConfig,
  TaskForm,
} from '@/components/shared/task-form';
import { TASK } from '@/routes';
import { AppDispatch, useAppSelector } from '@/store';

import './style.scss';

export const ListCreator = () => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [dataInitialization, setDataInitialization] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(mainThunk.getTaskList()).finally(() =>
      setDataInitialization(false),
    );
  }, []);

  const list = useAppSelector(state => state.main.list);
  const isLoading = useAppSelector(state => state.main.isLoading);
  const error = useAppSelector(state => state.main.error);

  const createTaskFormConfig: ITaskFormConfig = useMemo(() => {
    return {
      cancelButtonTitle: t('create_form_config.cancel_button'),
      confirmButtonTitle: t('create_form_config.add_button'),
      nameFieldLabel: t('create_form_config.name_label'),
      dateFieldLabel: t('create_form_config.date_label'),
      dateRequiredValidationMsg: t('create_form_config.date_validation'),
      nameRequiredValidationMsg: t('create_form_config.name_validation'),
      nameFieldRegExp: '[a-z0-9а-я\\s]+$',
    } as const;
  }, [t]);

  const onCreateFormAction = ({ name, model }: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false);
        break;
      }
      case EditFormButtons.CONFIRM: {
        const idLength = 8;
        const date = model.date;
        const title = model.title;
        const id = uuid().slice(0, idLength);
        dispatch(mainThunk.createTask({ date, title, id }));
        setOpenEditDialog(false);
        break;
      }
    }
  };

  const deleteListHandler = (taskId: string) => {
    dispatch(mainThunk.deleteTask(taskId));
  };

  const navigateHandler = (taskId: string) => {
    navigate(`${TASK}/${taskId}`);
  };

  if (!list && error) {
    return <InfoTitle title={error} />;
  }

  return (
    <div className={'list-creator'}>
      <div className={'list-creator__add-task-block add-task-block'}>
        <Dialog title={t('dialog_title')} isOpen={openEditDialog}>
          <TaskForm
            onAction={onCreateFormAction}
            task={{ id: '', title: '', date: '' }}
            config={createTaskFormConfig}
          />
        </Dialog>
        <ButtonPrimary
          className={'add-task-block__button'}
          title={t('create_button')}
          onClick={() => setOpenEditDialog(true)}
          disabled={dataInitialization}
        />
      </div>
      {isLoading || dataInitialization ? (
        <div className={'list-creator__loader'}>
          <CircularProgress data-testid={'loader'} />
        </div>
      ) : (
        <div className={'list-creator__table-block'}>
          {!!list.length && (
            <ListTable
              list={list}
              deleteTask={deleteListHandler}
              onRowClick={navigateHandler}
            />
          )}
          {!list.length && <InfoTitle title={t('no_data')} />}
        </div>
      )}
    </div>
  );
};
