import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { mainThunk } from '@/api';
import { Card } from '@/components/shared/card';
import { Dialog } from '@/components/shared/dialog';
import { InfoTitle } from '@/components/shared/info-title';
import { ButtonPrimary } from '@/components/shared/primary-button';
import {
  EditFormButtons,
  type IEditTaskAction,
  type ITaskFormConfig,
  TaskForm,
} from '@/components/shared/task-form';
import { type AppDispatch, useAppSelector } from '@/store';

import './style.scss';

type Props = {
  className?: string;
};

export const TaskCard = ({ className }: Props) => {
  const { id } = useParams<string>();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('task');

  const currentTask = useAppSelector(state => state.main.currentTask);
  const isLoading = useAppSelector(state => state.main.isLoading);
  const error = useAppSelector(state => state.main.error);

  useEffect(() => {
    dispatch(mainThunk.getTask(id));
  }, []);

  const updateTaskFormConfig: ITaskFormConfig = useMemo(() => {
    return {
      cancelButtonTitle: t('edit_form_config.cancel_button'),
      confirmButtonTitle: t('edit_form_config.edit_button'),
      dateFieldLabel: t('edit_form_config.date_label'),
      nameFieldLabel: t('edit_form_config.name_label'),
      dateRequiredValidationMsg: t('date_validation'),
      nameRequiredValidationMsg: t('name_validation'),
      nameFieldRegExp: '[a-z0-9а-я\\s]+$',
    } as const;
  }, [t]);

  const onEditFormAction = ({ name, model }: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false);
        break;
      }
      case EditFormButtons.CONFIRM: {
        const { title, date } = model;
        dispatch(mainThunk.updateTask({ title, date, id }));
        setOpenEditDialog(false);
        break;
      }
    }
  };

  if (isLoading) {
    return (
      <CircularProgress
        data-testid={'loader'}
        className={'task-card__loader'}
      />
    );
  }

  if (!currentTask) {
    return <InfoTitle title={error} />;
  }

  const classNames = clsx(className, 'task-card');

  return (
    <div className={classNames}>
      <Card>
        <p className={'task-card__title'}>{t('card_title')}</p>
        <ul className={'task-card__list'}>
          <li>
            <span className={'task-card__point'}>{t('id')}: </span>
            {currentTask.id}
          </li>
          <li>
            <span className={'task-card__point'}>{t('name')}: </span>
            {currentTask.title}
          </li>
          <li>
            <span className={'task-card__point'}>{t('date')}: </span>
            {dayjs(currentTask.date).format('DD.MM.YYYY hh:mm:ss a')}
          </li>
        </ul>
        <ButtonPrimary
          className={'task-card__edit-button'}
          onClick={() => setOpenEditDialog(true)}
          title={t('edit_button')}
        />
        <Dialog title={t('dialog_title')} isOpen={openEditDialog}>
          <TaskForm
            config={updateTaskFormConfig}
            onAction={onEditFormAction}
            task={currentTask}
          />
        </Dialog>
      </Card>
    </div>
  );
};
