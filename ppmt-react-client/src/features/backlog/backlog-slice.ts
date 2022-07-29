import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import IProjectTask from "../../models/ProjectTask";

export const backlogApiSlice = createApi({
    reducerPath: "backlog",
    baseQuery: fetchBaseQuery({
        prepareHeaders(headers) {
            headers.set("Authorization", localStorage.getItem("token") ||"")
            return headers
        }
    }),
    tagTypes: ['Backlog', 'ProjectTask'],
    endpoints(builder) {
        return {
            addProjectTaskToBacklog: builder.mutation<IProjectTask, Partial<IProjectTask>>({
                query: (body) => ({
                    url: `/api/backlog/${body.projectIdentifier}`,
                    method: 'POST',
                    body,
                }),
                invalidatesTags: [{ type: 'ProjectTask', id: 'LIST' },{ type: 'Backlog', id: 'LIST' },'ProjectTask','Backlog'],
            }),
            fetchProjectTasks: builder.query<IProjectTask[], string>({
                query(backlogId) {
                    return `/api/backlog/${backlogId}`
                },
                providesTags: (result) =>
                    result
                        ? [
                            ...result.map(({ id }) => ({ type: 'ProjectTask' as const, id })),
                            { type: 'ProjectTask', id: 'LIST' },
                        ]
                        : [{ type: 'ProjectTask', id: 'LIST' }],
            }),
            fetchProjectTask: builder.query<IProjectTask, {backlogId: string, sequence: string}>({
                query(params) {
                    return `/api/backlog/${params.backlogId}/${params.sequence}`
                },
                providesTags: (result) => result ? [{ type: 'ProjectTask', id: result.projectIdentifier }] : [{ type: 'ProjectTask' }]
            }),
            updateProjectTask: builder.mutation<IProjectTask, Partial<IProjectTask>>({
                query: (body) => ({
                    url: `/api/backlog/${body.projectIdentifier}/${body.projectSequence}`,
                    method: 'PATCH',
                    body,
                }),
                invalidatesTags: [{ type: 'ProjectTask', id: 'LIST' },{ type: 'Backlog', id: 'LIST' },'ProjectTask','Backlog'],
            }),
            deleteProjectTask: builder.mutation<IProjectTask, Partial<IProjectTask>>({
                query: (body) => ({
                    url: `/api/backlog/${body.projectIdentifier}/${body.projectSequence}`,
                    method: 'DELETE',
                }),
                invalidatesTags: [{ type: 'ProjectTask', id: 'LIST' },{ type: 'Backlog', id: 'LIST' },'ProjectTask','Backlog'],
            }),
        }
    }
})
export const {useAddProjectTaskToBacklogMutation, useDeleteProjectTaskMutation, useFetchProjectTasksQuery, useFetchProjectTaskQuery, useUpdateProjectTaskMutation} = backlogApiSlice