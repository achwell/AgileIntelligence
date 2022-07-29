package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repository.BacklogRepository;
import io.agileintelligence.ppmtool.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;

@Service
public class ProjectTaskServiceImpl implements ProjectTaskService {

    private final BacklogRepository backlogRepository;

    private final ProjectTaskRepository projectTaskRepository;

    private final ProjectService projectService;

    public ProjectTaskServiceImpl(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository, ProjectService projectService) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectService = projectService;
    }

    @Override
    @Transactional
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        //PTs to be added to a specific project, project != null, BL exists
        Backlog backlog =  projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();

        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID: '" + projectIdentifier + "' does not exist");
        }
        //set the bl to pt
        projectTask.setBacklog(backlog);
        //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
        Integer backlogsequence = backlog.getPtSequence();
        if(backlogsequence == null) {
            backlogsequence = 0;
        }
        // Update the BL SEQUENCE
        backlogsequence++;
        backlog.setPtSequence(backlogsequence);
        backlogRepository.save(backlog);

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
    public Iterable<ProjectTask> findBacklogById(String backlogId, String username) {
        projectService.findProjectByIdentifier(backlogId, username);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId);
    }

    @Override
    public ProjectTask findPTByProjectSequence(String backlogId, String sequence, String username) {
        projectService.findProjectByIdentifier(backlogId, username);
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
    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String sequence, String username) {
        ProjectTask projectTask = findPTByProjectSequence(backlogId, sequence, username);
        projectTask.setAcceptanceCriteria(updatedTask.getAcceptanceCriteria());
        projectTask.setDueDate(updatedTask.getDueDate());
        projectTask.setPriority(updatedTask.getPriority());
        projectTask.setStatus(updatedTask.getStatus());
        projectTask.setSummary(updatedTask.getSummary());
        return projectTaskRepository.save(projectTask);
    }

    @Override
    public void deletePTByProjectSequence(String backlogId, String sequence, String username){
        ProjectTask projectTask = findPTByProjectSequence(backlogId, sequence, username);
        projectTaskRepository.delete(projectTask);
    }
}
