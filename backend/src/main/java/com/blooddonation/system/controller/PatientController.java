package com.blooddonation.system.controller;

import com.blooddonation.system.dto.PatientRequestDTO;
import com.blooddonation.system.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Patient", description = "Patient APIs")
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/request")
    @Operation(summary = "Create blood request")
    public ResponseEntity<PatientRequestDTO> createRequest(@Valid @RequestBody PatientRequestDTO request) {
        PatientRequestDTO created = patientService.createRequest(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/my-requests")
    @Operation(summary = "Get my blood requests")
    public ResponseEntity<List<PatientRequestDTO>> getMyRequests() {
        List<PatientRequestDTO> requests = patientService.getMyRequests();
        return ResponseEntity.ok(requests);
    }
}
