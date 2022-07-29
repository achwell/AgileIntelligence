package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.ProjectTask;

public interface ProjectTaskService {
    ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username);

    Iterable<ProjectTask> findBacklogById(String backlogId, String username);

    ProjectTask findPTByProjectSequence(String backlogId, String sequence, String username);

    ProjectTask updateByProjectSequence(ProjectTask projectTask, String backlogId, String sequence, String username);

    void deletePTByProjectSequence(String backlogId, String sequence, String username);
}
