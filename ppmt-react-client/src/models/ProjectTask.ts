export default interface IProjectTask {
    id: number
    projectSequence: string
    summary: string
    acceptanceCriteria?: string
    status: string
    priority: number
    dueDate: string
    projectIdentifier: string
    create_At: string
    update_At: string
}