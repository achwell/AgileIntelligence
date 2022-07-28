package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repository.BacklogRepository;
import io.agileintelligence.ppmtool.repository.ProjectRepository;
import io.agileintelligence.ppmtool.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class ProjectTaskServiceImpl implements ProjectTaskService {

    private final BacklogRepository backlogRepository;

    private final ProjectTaskRepository projectTaskRepository;

    private final ProjectRepository projectRepository;

    public ProjectTaskServiceImpl(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository, ProjectRepository projectRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        //PTs to be added to a specific project, project != null, BL exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID: '" + projectIdentifier + "' does not exist");
        }
        //set the bl to pt
        projectTask.setBacklog(backlog);
        //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
        Integer backlogsequence = backlog.getPTSequence();
        // Update the BL SEQUENCE
        backlogsequence++;
        backlog.setPTSequence(backlogsequence);

        //Add Sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogsequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //INITIAL priority when priority null
        Integer priority = projectTask.getPriority();
        if (ObjectUtils.isEmpty(priority)) {
            projectTask.setPriority(3);
        }
        //INITIAL status when status is null
        String status = projectTask.getStatus();
        if (ObjectUtils.isEmpty(status)) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    @Override
    public Iterable<ProjectTask> findBacklogById(String backlogId) {
        Project project = projectRepository.findByProjectIdentifier(backlogId);
        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: '" + backlogId + "' does not exist");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId);
    }

    @Override
    public ProjectTask findPTByProjectSequence(String backlogId, String sequence) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID: '" + backlogId + "' does not exist");
        }
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task '" + sequence + "' not found");
        }
        if (!projectTask.getProjectIdentifier().equals(backlogId)) {
            throw new ProjectNotFoundException("Project Task '" + sequence + "' does not exist in project: '" + backlogId);
        }
        return projectTask;
    }

    @Override
    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String sequence) {
        ProjectTask projectTask = findPTByProjectSequence(backlogId, sequence);
        projectTask.setAcceptanceCriteria(updatedTask.getAcceptanceCriteria());
        projectTask.setDueDate(updatedTask.getDueDate());
        projectTask.setPriority(updatedTask.getPriority());
        projectTask.setStatus(updatedTask.getStatus());
        projectTask.setSummary(updatedTask.getSummary());
        return projectTaskRepository.save(projectTask);
    }

    @Override
    public void deletePTByProjectSequence(String backlogId, String sequence){
        ProjectTask projectTask = findPTByProjectSequence(backlogId, sequence);
        projectTaskRepository.delete(projectTask);
    }
}
