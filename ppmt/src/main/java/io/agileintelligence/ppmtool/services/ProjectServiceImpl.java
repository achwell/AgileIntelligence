package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.repository.BacklogRepository;
import io.agileintelligence.ppmtool.repository.ProjectRepository;
import io.agileintelligence.ppmtool.exceptions.ProjectIdException;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static java.time.LocalDateTime.now;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    private final BacklogRepository backlogRepository;

    private final UserRepository userRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, BacklogRepository backlogRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Project createProject(Project project, String username) {
        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }
            if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    @Override
    public Project findProjectByIdentifier(String id, String username) {
        Project project = projectRepository.findByProjectIdentifier(id.toUpperCase());
        if (project == null) {
            throw new ProjectNotFoundException("Project not found");
        }
        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }
        return project;
    }

    @Override
    public Project findProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException("Project not found"));
    }


    @Override
    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }


    @Override
    @Transactional
    public void deleteProjectByIdentifier(String projectId, String username) {
        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }

    @Override
    @Transactional
    public Project updateProject(String projectId, Project project, String username) {
        Project existingProject = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
            throw new ProjectNotFoundException("Project not found in your account");
        } else if (existingProject == null) {
            throw new ProjectNotFoundException("Cannot project project: " + projectId + " as it doesn't exist");
        }
        existingProject.setProjectName(project.getProjectName());
        existingProject.setDescription(project.getDescription());
        existingProject.setStart_date(project.getStart_date());
        existingProject.setEnd_date(project.getEnd_date());
        existingProject.setProjectLeader(project.getProjectLeader());
        existingProject.setUpdated_At(now());
        existingProject.setBacklog(backlogRepository.findByProjectIdentifier(existingProject.getProjectIdentifier().toUpperCase()));
        return projectRepository.save(existingProject);
    }
}
