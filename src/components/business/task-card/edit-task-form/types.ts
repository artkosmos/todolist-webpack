import type {ITask} from "@/common";

export enum EditFormButtons {
  CANCEL = 'cancel',
  SAVE = 'save'
}

export interface IEditTaskAction {
  model?: ITask
  name: EditFormButtons
}

export interface EditTaskFormFields {
  title: string
  date: string
}