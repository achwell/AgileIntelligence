package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.repository.BacklogRepository;
import io.agileintelligence.ppmtool.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class ProjectTaskServiceImpl implements ProjectTaskService {

    private final BacklogRepository backlogRepository;

    private final ProjectTaskRepository projectTaskRepository;

    public ProjectTaskServiceImpl(BacklogRepository backlogRepository, ProjectTaskRepository projectTaskRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
    }

    @Override
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        //Exceptions: Project not found

        //PTs to be added to a specific project, project != null, BL exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
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
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId);
    }
}
