package com.blooddonation.system.controller;

import com.blooddonation.system.dto.PatientRequestDTO;
import com.blooddonation.system.service.HospitalService;
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
@RequestMapping("/api/hospital")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Hospital", description = "Hospital APIs")
public class HospitalController {

    private final HospitalService hospitalService;

    @PostMapping("/create-request")
    @Operation(summary = "Create blood request")
    public ResponseEntity<PatientRequestDTO> createRequest(@Valid @RequestBody PatientRequestDTO request) {
        PatientRequestDTO created = hospitalService.createRequest(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/all-requests")
    @Operation(summary = "Get all blood requests")
    public ResponseEntity<List<PatientRequestDTO>> getAllRequests() {
        List<PatientRequestDTO> requests = hospitalService.getAllRequests();
        return ResponseEntity.ok(requests);
    }
}
