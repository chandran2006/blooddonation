package com.blooddonation.system.service;

import com.blooddonation.system.dto.ReportActionDTO;
import com.blooddonation.system.dto.ReportDTO;
import com.blooddonation.system.entity.Report;
import com.blooddonation.system.entity.User;
import com.blooddonation.system.repository.ReportRepository;
import com.blooddonation.system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Transactional
    public Report createReport(String reporterEmail, ReportDTO reportDTO) {
        User reporter = userRepository.findByEmail(reporterEmail)
                .orElseThrow(() -> new RuntimeException("Reporter not found"));
        User reportedUser = userRepository.findById(reportDTO.getReportedUserId())
                .orElseThrow(() -> new RuntimeException("Reported user not found"));

        Report report = new Report();
        report.setReporter(reporter);
        report.setReportedUser(reportedUser);
        report.setReason(reportDTO.getReason());
        report.setDescription(reportDTO.getDescription());
        return reportRepository.save(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAllByOrderByReportDateDesc();
    }

    public List<Report> getReportsByStatus(Report.ReportStatus status) {
        return reportRepository.findByStatusOrderByReportDateDesc(status);
    }

    public List<Report> getMyReports() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reportRepository.findAllByOrderByReportDateDesc().stream()
                .filter(report -> report.getReporter().getId().equals(user.getId()))
                .toList();
    }

    @Transactional
    public Report takeAction(Long reportId, ReportActionDTO actionDTO) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        report.setStatus(actionDTO.getStatus());
        report.setActionTaken(actionDTO.getActionTaken());
        report.setActionDate(LocalDateTime.now());
        return reportRepository.save(report);
    }
}
