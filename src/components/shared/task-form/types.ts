import type { ITask } from '@/common/types';

export enum EditFormButtons {
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
}

export interface IEditTaskAction {
  model?: ITask;
  name: EditFormButtons;
}

export interface EditTaskFormFields {
  title: string;
  date: string;
}

export interface ITaskFormConfig {
  cancelButtonTitle: string;
  confirmButtonTitle: string;
  nameFieldLabel?: string;
  nameRequiredValidationMsg?: string;
  dateRequiredValidationMsg?: string;
  dateFieldLabel?: string;
  nameFieldRegExp?: string;
}
