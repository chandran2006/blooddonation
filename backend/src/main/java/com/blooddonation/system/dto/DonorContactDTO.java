package com.blooddonation.system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonorContactDTO {
    private Long donorId;
    private Long requestId;
    private String message;
}
