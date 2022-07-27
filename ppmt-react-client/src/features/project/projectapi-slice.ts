import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Project from "../../models/Project";

export const projectApiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
        // prepareHeaders(headers) {
        //     headers.set("x-api-key", "wfddfeqwf")
        //     return headers
        // }
    }),
    endpoints(builder) {
        return {
            addProject: builder.mutation<Project, Partial<Project>>({
                query: (body) => ({
                    url: "api/project",
                    method: 'POST',
                    body,
                }),
            }),
            updateProject: builder.mutation<Project, Partial<Project>>({
                query: (body) => ({
                    url: `api/project/${body.projectIdentifier}`,
                    method: 'PUT',
                    body,
                }),
            }),
            // addProject: builder.mutation<Project, Partial<Project> & Pick<Project, "id">>({
            //     query: ({id, ...project}) => ({
            //         url: "",
            //         method: 'POST',
            //         body: project,
            //     }),
            // }),
            fetchProjects: builder.query<Project[], number | void>({
                query(_) {
                    return "/api/project"
                }
            }),
            fetchProject: builder.query<Project, string>({
                query(projectId) {
                    return `/api/project/${projectId}`
                }
            })
        }
    }
})
export const {useAddProjectMutation, useFetchProjectQuery, useFetchProjectsQuery, useUpdateProjectMutation} = projectApiSlice