package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Project;

public interface ProjectService {

    Project createProject(Project project, String username);

    Project findProjectByIdentifier(String Id, String username);

    Project findProjectById(Long id);

    Iterable<Project> findAllProjects(String username);

    void deleteProjectByIdentifier(String projectId, String username);

    Project updateProject(String projectId, Project project, String username);
}
