import { IBase } from "./root.types"

export enum EnumTaskPriority {
    low = 'LOW',
    medium = 'MEDIUM',
    high = 'HIGH'
}

export enum EnumStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    OnHold = 'OnHold',
    Completed = "Completed"
}

export interface ITaskResponse extends IBase {
    name: string
    priority: EnumTaskPriority
    status: EnumStatus,
    dueDate: string,
    userId: number
}

export interface IResponseTaskLoader {
    tasks: ITaskResponse[]
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
