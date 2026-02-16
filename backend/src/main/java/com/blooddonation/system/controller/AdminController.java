package com.blooddonation.system.controller;

import com.blooddonation.system.dto.PatientRequestDTO;
import com.blooddonation.system.dto.UserDTO;
import com.blooddonation.system.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Admin", description = "Admin APIs")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete user by ID")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/requests")
    @Operation(summary = "Get all patient requests")
    public ResponseEntity<List<PatientRequestDTO>> getAllRequests() {
        return ResponseEntity.ok(adminService.getAllRequests());
    }
}
