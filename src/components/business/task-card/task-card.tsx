import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { appThunk } from '@/api';
import { StarIcon } from '@/assets/icons/star-icon';
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
import { dateFormats } from '@/constants/date-formats';
import { useAppDispatch, useAppSelector } from '@/store';

import './style.scss';

type Props = {
  className?: string;
};

export const TaskCard = ({ className }: Props) => {
  const { id } = useParams<string>();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openImageDialog, setOpenImageDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('task');

  const currentTask = useAppSelector(state => state.main.currentTask);
  const isLoading = useAppSelector(state => state.main.isLoading);
  const error = useAppSelector(state => state.main.error);
  const isDarkTheme = useAppSelector(state => state.main.darkTheme);

  useEffect(() => {
    dispatch(appThunk.getTask(id));
  }, []);

  const updateTaskFormConfig: ITaskFormConfig = useMemo(() => {
    return {
      imageField: {
        label: t('edit_form_config.image_button_text'),
      },
      nameField: {
        label: t('edit_form_config.name_label'),
        validationMsg: t('edit_form_config.name_validation'),
        formatRegExp: '[a-z0-9а-я\\s]+$',
      },
      dateField: {
        label: t('edit_form_config.date_label'),
        validationMsg: t('edit_form_config.date_validation'),
        locale: i18n.language,
        dateFormat: dateFormats[i18n.language],
        datePickerMode: isDarkTheme ? 'dark' : 'light',
      },
      checkbox: {
        label: t('edit_form_config.checkbox_label'),
      },
      cancelButtonTitle: t('edit_form_config.cancel_button'),
      confirmButtonTitle: t('edit_form_config.edit_button'),
    };
  }, [i18n.language, isDarkTheme]);

  const onEditFormAction = ({ name, model }: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false);
        break;
      }
      case EditFormButtons.CONFIRM: {
        const { title, date, image, important } = model;
        dispatch(appThunk.updateTask({ title, date, image, important, id }));
        setOpenEditDialog(false);
        break;
      }
    }
  };

  const classNames = useMemo(() => {
    return {
      card: clsx('task-card', className),
      title: clsx('task-card__title'),
      list: clsx('task-card__list'),
      info: clsx('task-card__info'),
      imageDialog: clsx('task-card__image-dialog'),
      image: clsx('task-card__image-dialog_image'),
    };
  }, []);

  if (isLoading) {
    return (
      <CircularProgress
        data-testid={'loader'}
        className={'task-card__loader'}
      />
    );
  }

  if (!currentTask || error) {
    return <InfoTitle title={error} />;
  }

  return (
    <Card className={classNames.card}>
      <p className={classNames.title}>
        {t('card_title')}
        {currentTask.important && <StarIcon width={30} height={30} />}
      </p>
      <div className={classNames.info}>
        <ul className={classNames.list}>
          <li>
            <span className={'task-card__point'}>{t('id')}: </span>
            {currentTask.id}
          </li>
          <li>
            <span className={'task-card__point'}>{t('name')}:&nbsp;&nbsp;</span>
            {currentTask.title}
          </li>
          <li>
            <span className={'task-card__point'}>{t('date')}:&nbsp;&nbsp;</span>
            {dayjs(currentTask.date).format(dateFormats[i18n.language])}
          </li>
        </ul>
        {currentTask.image && (
          <img
            className={'task-card__image'}
            src={currentTask.image}
            alt={'task image'}
            onClick={() => setOpenImageDialog(true)}
          />
        )}
      </div>
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
      <Dialog
        isOpen={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        className={classNames.imageDialog}
        maxWidth={'md'}
      >
        <img
          src={currentTask.image}
          alt={'task-image'}
          className={classNames.image}
        />
      </Dialog>
    </Card>
  );
};
