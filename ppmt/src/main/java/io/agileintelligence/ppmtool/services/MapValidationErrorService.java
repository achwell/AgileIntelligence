package io.agileintelligence.ppmtool.services;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.Map;

public interface MapValidationErrorService {
    ResponseEntity<Map<String, String>> MapValidationService(BindingResult result);
}
