package com.blooddonation.system.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateDonorRequest {
    private String phone;
    private String city;
    private String bloodGroup;
    private LocalDate lastDonationDate;
    private Boolean available;
}
