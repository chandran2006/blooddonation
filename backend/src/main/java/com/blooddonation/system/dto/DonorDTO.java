package com.blooddonation.system.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DonorDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String city;
    private String bloodGroup;
    private LocalDate lastDonationDate;
    private boolean available;
    private int totalDonations;
}
