package com.blooddonation.system.service;

import com.blooddonation.system.dto.AuthResponse;
import com.blooddonation.system.dto.LoginRequest;
import com.blooddonation.system.dto.RegisterRequest;
import com.blooddonation.system.entity.Donor;
import com.blooddonation.system.entity.Hospital;
import com.blooddonation.system.entity.User;
import com.blooddonation.system.exception.BadRequestException;
import com.blooddonation.system.repository.DonorRepository;
import com.blooddonation.system.repository.HospitalRepository;
import com.blooddonation.system.repository.UserRepository;
import com.blooddonation.system.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final DonorRepository donorRepository;
    private final HospitalRepository hospitalRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setCity(request.getCity());
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        user.setEnabled(true);

        user = userRepository.save(user);

        if (user.getRole() == User.Role.DONOR) {
            Donor donor = new Donor();
            donor.setUser(user);
            donor.setBloodGroup(request.getBloodGroup());
            donor.setAvailable(true);
            donor.setTotalDonations(0);
            donorRepository.save(donor);
        } else if (user.getRole() == User.Role.HOSPITAL) {
            Hospital hospital = new Hospital();
            hospital.setUser(user);
            hospital.setHospitalName(request.getHospitalName());
            hospital.setLicenseNumber(request.getLicenseNumber());
            hospitalRepository.save(hospital);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getEmail(), user.getRole().name(), "Registration successful");
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getEmail(), user.getRole().name(), "Login successful");
    }
}
