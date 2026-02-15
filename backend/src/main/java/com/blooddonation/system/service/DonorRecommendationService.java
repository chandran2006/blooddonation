package com.blooddonation.system.service;

import com.blooddonation.system.dto.DonorRecommendationDTO;
import com.blooddonation.system.entity.Donor;
import com.blooddonation.system.entity.PatientRequest;
import com.blooddonation.system.exception.ResourceNotFoundException;
import com.blooddonation.system.repository.DonorRepository;
import com.blooddonation.system.repository.PatientRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonorRecommendationService {

    private final DonorRepository donorRepository;
    private final PatientRequestRepository patientRequestRepository;

    public List<DonorRecommendationDTO> recommendDonors(Long requestId) {
        // Fetch the patient request
        PatientRequest request = patientRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + requestId));

        // Fetch all donors
        List<Donor> allDonors = donorRepository.findAll();

        // Calculate scores and map to DTO
        return allDonors.stream()
                .map(donor -> calculateDonorScore(donor, request))
                .sorted((d1, d2) -> Integer.compare(d2.getMatchScore(), d1.getMatchScore()))
                .limit(5)
                .collect(Collectors.toList());
    }

    private DonorRecommendationDTO calculateDonorScore(Donor donor, PatientRequest request) {
        int score = 0;
        
        // 1. Blood Group Match (+50)
        if (donor.getBloodGroup().equals(request.getBloodGroup())) {
            score += 50;
        }

        // 2. Same City (+20)
        if (donor.getUser().getCity() != null && 
            donor.getUser().getCity().equalsIgnoreCase(request.getCity())) {
            score += 20;
        }

        // 3. Availability (+15)
        if (donor.isAvailable()) {
            score += 15;
        }

        // 4. Check eligibility (90-day rule)
        boolean isEligible = checkEligibility(donor);
        String eligibilityStatus;
        int daysUntilEligible = 0;

        if (isEligible) {
            score += 10;
            eligibilityStatus = "Eligible";
        } else {
            eligibilityStatus = "Not Eligible";
            daysUntilEligible = calculateDaysUntilEligible(donor);
        }

        // 5. Experience (+5)
        if (donor.getTotalDonations() > 5) {
            score += 5;
        }

        // 6. Emergency Boost (+10)
        if (request.getUrgencyLevel() == PatientRequest.UrgencyLevel.EMERGENCY &&
            donor.getUser().getCity() != null &&
            donor.getUser().getCity().equalsIgnoreCase(request.getCity())) {
            score += 10;
        }

        // Map to DTO
        return new DonorRecommendationDTO(
                donor.getId(),
                donor.getUser().getName(),
                donor.getUser().getEmail(),
                donor.getUser().getPhone(),
                donor.getBloodGroup(),
                donor.getUser().getCity(),
                donor.getTotalDonations(),
                donor.isAvailable(),
                score,
                eligibilityStatus,
                daysUntilEligible
        );
    }

    private boolean checkEligibility(Donor donor) {
        if (donor.getLastDonationDate() == null) {
            return true;
        }
        
        long daysSinceLastDonation = ChronoUnit.DAYS.between(
                donor.getLastDonationDate(), 
                LocalDate.now()
        );
        
        return daysSinceLastDonation >= 90;
    }

    private int calculateDaysUntilEligible(Donor donor) {
        if (donor.getLastDonationDate() == null) {
            return 0;
        }
        
        long daysSinceLastDonation = ChronoUnit.DAYS.between(
                donor.getLastDonationDate(), 
                LocalDate.now()
        );
        
        if (daysSinceLastDonation >= 90) {
            return 0;
        }
        
        return (int) (90 - daysSinceLastDonation);
    }
}
