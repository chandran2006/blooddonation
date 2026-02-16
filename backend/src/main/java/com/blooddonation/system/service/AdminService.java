package com.blooddonation.system.service;

import com.blooddonation.system.dto.PatientRequestDTO;
import com.blooddonation.system.dto.UserDTO;
import com.blooddonation.system.entity.PatientRequest;
import com.blooddonation.system.entity.User;
import com.blooddonation.system.exception.ResourceNotFoundException;
import com.blooddonation.system.repository.PatientRequestRepository;
import com.blooddonation.system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PatientRequestRepository patientRequestRepository;

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }

    public List<PatientRequestDTO> getAllRequests() {
        List<PatientRequest> requests = patientRequestRepository.findAll();
        return requests.stream()
                .map(this::mapRequestToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setCity(user.getCity());
        dto.setRole(user.getRole().name());
        dto.setEnabled(user.isEnabled());
        return dto;
    }

    private PatientRequestDTO mapRequestToDTO(PatientRequest request) {
        PatientRequestDTO dto = new PatientRequestDTO();
        dto.setId(request.getId());
        dto.setPatientName(request.getPatientName());
        dto.setBloodGroup(request.getBloodGroup());
        dto.setHospitalName(request.getHospitalName());
        dto.setCity(request.getCity());
        dto.setUrgencyLevel(request.getUrgencyLevel().name());
        dto.setRequestDate(request.getRequestDate());
        dto.setStatus(request.getStatus().name());
        dto.setCreatedByEmail(request.getCreatedBy().getEmail());
        if (request.getAcceptedBy() != null) {
            dto.setAcceptedByName(request.getAcceptedBy().getName());
            dto.setAcceptedByEmail(request.getAcceptedBy().getEmail());
            dto.setAcceptedDate(request.getAcceptedDate());
        }
        return dto;
    }
}
