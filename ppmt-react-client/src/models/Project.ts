export default interface IProject {
    id: number
    projectName: string
    projectIdentifier: string
    description?: string
    start_date?: string
    end_date?: string
    created_At?: string
    updated_At?: string
    projectLeader?: string
}