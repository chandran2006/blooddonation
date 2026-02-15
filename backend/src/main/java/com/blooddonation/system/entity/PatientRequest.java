package com.blooddonation.system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String patientName;
    
    @Column(nullable = false)
    private String bloodGroup;
    
    @Column(nullable = false)
    private String hospitalName;
    
    @Column(nullable = false)
    private String city;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UrgencyLevel urgencyLevel = UrgencyLevel.NORMAL;
    
    @Column(nullable = false)
    private LocalDateTime requestDate = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;
    
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
    
    @ManyToOne
    @JoinColumn(name = "accepted_by")
    private User acceptedBy;
    
    @Column(name = "accepted_date")
    private LocalDateTime acceptedDate;
    
    public enum UrgencyLevel {
        NORMAL, EMERGENCY
    }
    
    public enum Status {
        PENDING, ACCEPTED, COMPLETED
    }
}
