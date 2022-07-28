import IProjectTask from "./ProjectTask";

export default interface Backlog {
    id: number
    ptSequence: number
    projectIdentifier: string
    projectTasks: IProjectTask[]
}