package com.blooddonation.system.service;

import com.blooddonation.system.dto.DonorContactDTO;
import com.blooddonation.system.dto.DonorDTO;
import com.blooddonation.system.dto.PatientRequestDTO;
import com.blooddonation.system.dto.UpdateDonorRequest;
import com.blooddonation.system.entity.Donor;
import com.blooddonation.system.entity.PatientRequest;
import com.blooddonation.system.entity.User;
import com.blooddonation.system.exception.ResourceNotFoundException;
import com.blooddonation.system.repository.DonorRepository;
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
public class DonorService {

    private final DonorRepository donorRepository;
    private final UserRepository userRepository;
    private final PatientRequestRepository patientRequestRepository;

    public DonorDTO getProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Donor donor = donorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Donor profile not found"));

        return mapToDTO(donor);
    }

    @Transactional
    public DonorDTO updateProfile(UpdateDonorRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Donor donor = donorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Donor profile not found"));

        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getCity() != null) user.setCity(request.getCity());
        if (request.getBloodGroup() != null) donor.setBloodGroup(request.getBloodGroup());
        if (request.getLastDonationDate() != null) donor.setLastDonationDate(request.getLastDonationDate());
        if (request.getAvailable() != null) donor.setAvailable(request.getAvailable());

        userRepository.save(user);
        donor = donorRepository.save(donor);

        return mapToDTO(donor);
    }

    public List<PatientRequestDTO> getAllRequests() {
        List<PatientRequest> requests = patientRequestRepository.findAll();
        return requests.stream()
                .map(this::mapRequestToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PatientRequestDTO acceptRequest(Long requestId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        PatientRequest request = patientRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        request.setStatus(PatientRequest.Status.ACCEPTED);
        request.setAcceptedBy(user);
        request.setAcceptedDate(LocalDateTime.now());
        request = patientRequestRepository.save(request);
        return mapRequestToDTO(request);
    }

    @Transactional
    public void contactDonor(DonorContactDTO contactDTO) {
        // Fetch donor
        Donor donor = donorRepository.findById(contactDTO.getDonorId())
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found"));
        
        // Mark donor as unavailable after contact
        donor.setAvailable(false);
        donorRepository.save(donor);
        
        // Here you can add email/SMS notification logic
        // sendNotificationToDonor(donor, contactDTO.getMessage());
    }

    private DonorDTO mapToDTO(Donor donor) {
        DonorDTO dto = new DonorDTO();
        dto.setId(donor.getId());
        dto.setName(donor.getUser().getName());
        dto.setEmail(donor.getUser().getEmail());
        dto.setPhone(donor.getUser().getPhone());
        dto.setCity(donor.getUser().getCity());
        dto.setBloodGroup(donor.getBloodGroup());
        dto.setLastDonationDate(donor.getLastDonationDate());
        dto.setAvailable(donor.isAvailable());
        dto.setTotalDonations(donor.getTotalDonations());
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
