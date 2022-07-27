package io.agileintelligence.ppmt.service;

import io.agileintelligence.ppmt.domain.Project;
import io.agileintelligence.ppmt.repository.ProjectRepository;
import io.agileintelligence.ppmt.exceptions.ProjectIdException;
import io.agileintelligence.ppmt.exceptions.ProjectNotFoundException;
import org.springframework.stereotype.Service;

import static java.time.LocalDateTime.now;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project saveProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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
        return projectRepository.save(existingProject);
    }
}
