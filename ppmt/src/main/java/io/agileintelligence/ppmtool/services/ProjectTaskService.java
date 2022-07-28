package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.ProjectTask;

import java.util.List;

public interface ProjectTaskService {
    ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask);

    Iterable<ProjectTask> findBacklogById(String backlogId);

    ProjectTask findPTByProjectSequence(String backlogId, String sequence);

    ProjectTask updateByProjectSequence(ProjectTask projectTask, String backlogId, String sequence);

    void deletePTByProjectSequence(String backlogId, String sequence);
}
