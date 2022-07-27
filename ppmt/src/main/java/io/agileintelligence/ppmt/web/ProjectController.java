package io.agileintelligence.ppmt.web;

import io.agileintelligence.ppmt.domain.Project;
import io.agileintelligence.ppmt.service.MapValidationErrorsService;
import io.agileintelligence.ppmt.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    private final ProjectService projectService;
    private final MapValidationErrorsService mapValidationErrorsService;

    public ProjectController(ProjectService projectService, MapValidationErrorsService mapValidationErrorsService) {
        this.projectService = projectService;
        this.mapValidationErrorsService = mapValidationErrorsService;
    }

    @PostMapping
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {
        ResponseEntity<Map<String, String>> errorMap = mapValidationErrorsService.MapValidationErrorsService(result);
        if (errorMap != null) {
            return errorMap;
        }
        Project newProject = projectService.saveProject(project);
        return new ResponseEntity<>(newProject, CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable String projectId) {
        Project project = projectService.findProjectByIdentifier(projectId);
        return new ResponseEntity<>(project, OK);
    }

    @GetMapping
    public Iterable<Project> getAllProjects() {
        return projectService.findAllProjects();
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<?> updateProject(@PathVariable String projectId, @Valid @RequestBody Project project, BindingResult result) {
        ResponseEntity<Map<String, String>> errorMap = mapValidationErrorsService.MapValidationErrorsService(result);
        if (errorMap != null) {
            return errorMap;
        }
        Project updatedProject = projectService.updateProject(projectId, project);
        return new ResponseEntity<>(updatedProject, CREATED);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> delete(@PathVariable String projectId) {
        projectService.deleteProjectByIdentifier(projectId);
        return new ResponseEntity<String>("Project "+projectId+" deleted successfully", OK);
    }
}
