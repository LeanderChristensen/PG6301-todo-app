export interface TaskItem {
  id: number;
  title: string;
  checked: boolean;
  description?: string;
}

export type TaskDelta = Partial<Omit<TaskItem, "id">>;
// export type TaskChangeHandler = (id: number, taskDelta: TaskDelta) => void;
export type TaskChangeHandler = (id: number, checked: boolean) => void;
