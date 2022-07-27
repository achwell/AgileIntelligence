package io.agileintelligence.ppmt.service;

import io.agileintelligence.ppmt.domain.Project;

public interface ProjectService {

    Project saveProject(Project project);

    Project findProjectByIdentifier(String Id);

    Project findProjectById(Long id);

    Iterable<Project> findAllProjects();

    void deleteProjectByIdentifier(String projectId);

    Project updateProject(String projectId, Project project);
}
