package com.blooddonation.system.controller;

import com.blooddonation.system.dto.DonorDTO;
import com.blooddonation.system.dto.PatientRequestDTO;
import com.blooddonation.system.dto.UpdateDonorRequest;
import com.blooddonation.system.service.DonorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donor")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Donor", description = "Donor APIs")
public class DonorController {

    private final DonorService donorService;

    @GetMapping("/profile")
    @Operation(summary = "Get donor profile")
    public ResponseEntity<DonorDTO> getProfile() {
        DonorDTO profile = donorService.getProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/update")
    @Operation(summary = "Update donor profile")
    public ResponseEntity<DonorDTO> updateProfile(@RequestBody UpdateDonorRequest request) {
        DonorDTO updated = donorService.updateProfile(request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/requests")
    @Operation(summary = "Get all blood requests")
    public ResponseEntity<List<PatientRequestDTO>> getAllRequests() {
        List<PatientRequestDTO> requests = donorService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/accept-request/{requestId}")
    @Operation(summary = "Accept blood request")
    public ResponseEntity<PatientRequestDTO> acceptRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(donorService.acceptRequest(requestId));
    }
}
