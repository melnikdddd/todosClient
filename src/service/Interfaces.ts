export type Task = string;
export type Id = number;



export interface ITodo {
    id: Id;
    tasks: Task[];
    parentsId: Id[];
    childrenId: Id[];
}
