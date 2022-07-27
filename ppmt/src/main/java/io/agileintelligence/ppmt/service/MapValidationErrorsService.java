package io.agileintelligence.ppmt.service;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.Map;

public interface MapValidationErrorsService {
    ResponseEntity<Map<String, String>> MapValidationErrorsService(BindingResult result);
}
