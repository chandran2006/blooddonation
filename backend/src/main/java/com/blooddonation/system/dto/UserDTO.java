package com.blooddonation.system.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String city;
    private String role;
    private boolean enabled;
}
