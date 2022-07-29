package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProjectTaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    private final ProjectTaskService projectTaskService;

    private final MapValidationErrorService mapValidationErrorService;

    public BacklogController(ProjectTaskService projectTaskService, MapValidationErrorService mapValidationErrorService) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }


    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlogId, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }
        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlogId, projectTask, principal.getName());
        return new ResponseEntity<>(projectTask1, CREATED);
    }

    @GetMapping("/{backlogId}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlogId, Principal principal) {
        return projectTaskService.findBacklogById(backlogId, principal.getName());
    }

    @GetMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String sequence, Principal principal) {
        ProjectTask projectTask = projectTaskService.findPTByProjectSequence(backlogId, sequence, principal.getName());
        return new ResponseEntity<>(projectTask, OK);
    }

    @PatchMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String backlogId, @PathVariable String sequence, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
            return errorMap;
        }
        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlogId, sequence, principal.getName());
        return new ResponseEntity<>(updatedTask, OK);
    }

    @DeleteMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlogId, @PathVariable String sequence, Principal principal) {
        projectTaskService.deletePTByProjectSequence(backlogId, sequence, principal.getName());
        return new ResponseEntity<>("Project Task " + sequence + " was deleted successfully", OK);
    }

}