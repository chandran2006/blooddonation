package com.blooddonation.system.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PatientRequestDTO {
    private Long id;
    
    @NotBlank(message = "Patient name is required")
    private String patientName;
    
    @NotBlank(message = "Blood group is required")
    private String bloodGroup;
    
    @NotBlank(message = "Hospital name is required")
    private String hospitalName;
    
    @NotBlank(message = "City is required")
    private String city;
    
    private String urgencyLevel;
    private LocalDateTime requestDate;
    private String status;
    private String createdByEmail;
}
