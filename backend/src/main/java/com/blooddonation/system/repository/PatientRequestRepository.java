package com.blooddonation.system.repository;

import com.blooddonation.system.entity.PatientRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PatientRequestRepository extends JpaRepository<PatientRequest, Long> {
    List<PatientRequest> findByCreatedById(Long userId);
}
