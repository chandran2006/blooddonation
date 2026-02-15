package com.blooddonation.system.repository;

import com.blooddonation.system.entity.Report;
import com.blooddonation.system.entity.Report.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByStatusOrderByReportDateDesc(ReportStatus status);
    List<Report> findAllByOrderByReportDateDesc();
}
