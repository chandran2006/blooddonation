package com.blooddonation.system.service;

import com.blooddonation.system.dto.PatientRequestDTO;
import com.blooddonation.system.entity.PatientRequest;
import com.blooddonation.system.entity.User;
import com.blooddonation.system.exception.ResourceNotFoundException;
import com.blooddonation.system.repository.PatientRequestRepository;
import com.blooddonation.system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRequestRepository patientRequestRepository;
    private final UserRepository userRepository;

    @Transactional
    public PatientRequestDTO createRequest(PatientRequestDTO requestDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        PatientRequest request = new PatientRequest();
        request.setPatientName(requestDTO.getPatientName());
        request.setBloodGroup(requestDTO.getBloodGroup());
        request.setHospitalName(requestDTO.getHospitalName());
        request.setCity(requestDTO.getCity());
        request.setUrgencyLevel(PatientRequest.UrgencyLevel.valueOf(
                requestDTO.getUrgencyLevel() != null ? requestDTO.getUrgencyLevel().toUpperCase() : "NORMAL"));
        request.setRequestDate(LocalDateTime.now());
        request.setStatus(PatientRequest.Status.PENDING);
        request.setCreatedBy(user);

        request = patientRequestRepository.save(request);
        return mapToDTO(request);
    }

    public List<PatientRequestDTO> getMyRequests() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<PatientRequest> requests = patientRequestRepository.findByCreatedById(user.getId());
        return requests.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private PatientRequestDTO mapToDTO(PatientRequest request) {
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
