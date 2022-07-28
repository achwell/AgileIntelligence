package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.repository.BacklogRepository;
import io.agileintelligence.ppmtool.repository.ProjectRepository;
import io.agileintelligence.ppmtool.exceptions.ProjectIdException;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import org.springframework.stereotype.Service;

import static java.time.LocalDateTime.now;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    private final BacklogRepository backlogRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, BacklogRepository backlogRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }

    @Override
    public Project saveProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if(project.getId()==null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }
            if(project.getId()!=null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    @Override
    public Project findProjectByIdentifier(String id) {
        Project project = projectRepository.findByProjectIdentifier(id.toUpperCase());
        if (project == null) {
            throw new ProjectNotFoundException("Project not found");
        }
        return project;
    }

    @Override
    public Project findProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException("Project not found"));
    }


    @Override
    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }


    @Override
    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectNotFoundException("Cannot delete project: " + projectId + " as it doesn't exist");
        }
        projectRepository.delete(project);
    }

    @Override
    public Project updateProject(String projectId, Project project) {
        Project existingProject = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (existingProject == null) {
            throw new ProjectNotFoundException("Cannot project project: " + projectId + " as it doesn't exist");
        }
        existingProject.setProjectName(project.getProjectName());
        existingProject.setDescription(project.getDescription());
        existingProject.setStart_date(project.getStart_date());
        existingProject.setEnd_date(project.getEnd_date());
        existingProject.setUpdated_At(now());
        existingProject.setBacklog(backlogRepository.findByProjectIdentifier(existingProject.getProjectIdentifier().toUpperCase()));
        return projectRepository.save(existingProject);
    }
}
