package com.blooddonation.system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonorRecommendationDTO {
    private Long donorId;
    private String name;
    private String email;
    private String phone;
    private String bloodGroup;
    private String city;
    private Integer totalDonations;
    private Boolean available;
    private Integer matchScore;
    private String eligibilityStatus;
    private Integer daysUntilEligible;
}
