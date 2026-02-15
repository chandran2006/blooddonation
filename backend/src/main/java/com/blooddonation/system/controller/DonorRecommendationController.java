package com.blooddonation.system.controller;

import com.blooddonation.system.dto.DonorContactDTO;
import com.blooddonation.system.dto.DonorRecommendationDTO;
import com.blooddonation.system.service.DonorRecommendationService;
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
@Tag(name = "Donor Recommendation", description = "AI-based Donor Recommendation APIs")
public class DonorRecommendationController {

    private final DonorRecommendationService recommendationService;
    private final DonorService donorService;

    @GetMapping("/recommend/{requestId}")
    @Operation(
        summary = "AI Donor Recommendation",
        description = "Returns top 5 recommended donors using rule-based intelligent scoring algorithm. " +
                     "Scoring factors: Blood Group Match (+50), Same City (+20), Availability (+15), " +
                     "Eligibility (+10), Experience (+5), Emergency Boost (+10)"
    )
    public ResponseEntity<List<DonorRecommendationDTO>> recommendDonors(@PathVariable Long requestId) {
        List<DonorRecommendationDTO> recommendations = recommendationService.recommendDonors(requestId);
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/contact")
    @Operation(
        summary = "Contact Donor",
        description = "Allows patient/hospital to contact a donor. Automatically marks donor as unavailable after contact."
    )
    public ResponseEntity<String> contactDonor(@RequestBody DonorContactDTO contactDTO) {
        donorService.contactDonor(contactDTO);
        return ResponseEntity.ok("Donor contacted successfully. Donor marked as unavailable.");
    }
}
