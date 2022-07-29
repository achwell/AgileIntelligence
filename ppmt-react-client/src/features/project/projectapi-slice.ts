import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Project from "../../models/Project"

export const projectApiSlice = createApi({
    reducerPath: "project",
    baseQuery: fetchBaseQuery({
        //baseUrl: "http://localhost:8080",
        prepareHeaders(headers) {
            headers.set("Authorization", localStorage.getItem("token") ||"")
            return headers
        }
    }),
    tagTypes: ['Project'],
    endpoints(builder) {
        return {
            addProject: builder.mutation<Project, Partial<Project>>({
                query: (body) => ({
                    url: "/api/project",
                    method: 'POST',
                    body,
                }),
                invalidatesTags: [{ type: 'Project', id: 'LIST' }],
            }),
            deleteProject: builder.mutation<Project, Partial<Project>>({
                query: (body) => ({
                    url: `/api/project/${body.projectIdentifier}`,
                    method: 'DELETE',
                }),
                invalidatesTags: [{ type: 'Project', id: 'LIST' }],
            }),
            updateProject: builder.mutation<Project, Partial<Project>>({
                query: (body) => ({
                    url: `/api/project/${body.projectIdentifier}`,
                    method: 'PUT',
                    body,
                }),
                invalidatesTags: [{ type: 'Project', id: 'LIST' }],
            }),
            fetchProjects: builder.query<Project[], number | void>({
                query(_) {
                    return "/api/project"
                },
                providesTags: (result) =>
                    result
                        ? [
                            ...result.map(({ id }) => ({ type: 'Project' as const, id })),
                            { type: 'Project', id: 'LIST' },
                        ]
                        : [{ type: 'Project', id: 'LIST' }],
            }),
            fetchProject: builder.query<Project, string>({
                query(projectId) {
                    return `/api/project/${projectId}`
                },
                providesTags: (result) => result ? [{ type: 'Project', id: result.projectIdentifier }] : [{ type: 'Project' }]
            })
        }
    }
})
export const {useAddProjectMutation, useDeleteProjectMutation, useFetchProjectQuery, useFetchProjectsQuery, useUpdateProjectMutation} = projectApiSlice