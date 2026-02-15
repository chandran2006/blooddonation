package com.blooddonation.system.dto;

import com.blooddonation.system.entity.Report.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportActionDTO {
    private ReportStatus status;
    private String actionTaken;
}
