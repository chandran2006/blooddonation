package com.blooddonation.system.controller;

import com.blooddonation.system.dto.ReportActionDTO;
import com.blooddonation.system.dto.ReportDTO;
import com.blooddonation.system.entity.Report;
import com.blooddonation.system.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Report Management")
public class ReportController {
    private final ReportService reportService;

    @PostMapping
    @Operation(summary = "Create a report")
    public ResponseEntity<Report> createReport(@RequestBody ReportDTO reportDTO, Authentication authentication) {
        return ResponseEntity.ok(reportService.createReport(authentication.getName(), reportDTO));
    }

    @GetMapping
    @Operation(summary = "Get all reports (Admin only)")
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get reports by status (Admin only)")
    public ResponseEntity<List<Report>> getReportsByStatus(@PathVariable Report.ReportStatus status) {
        return ResponseEntity.ok(reportService.getReportsByStatus(status));
    }

    @GetMapping("/my-reports")
    @Operation(summary = "Get my submitted reports")
    public ResponseEntity<List<Report>> getMyReports() {
        return ResponseEntity.ok(reportService.getMyReports());
    }

    @PutMapping("/{reportId}/action")
    @Operation(summary = "Take action on report (Admin only)")
    public ResponseEntity<Report> takeAction(@PathVariable Long reportId, @RequestBody ReportActionDTO actionDTO) {
        return ResponseEntity.ok(reportService.takeAction(reportId, actionDTO));
    }
}
