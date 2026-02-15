# Report System Documentation

## Overview
The report system allows users (Donors, Patients, Hospitals) to report other users for inappropriate behavior, and admins can view and take action on these reports.

## Backend Components

### Entity: Report
- **Fields**: id, reporter, reportedUser, reason, description, status, reportDate, actionTaken, actionDate
- **Status Enum**: PENDING, REVIEWED, RESOLVED, DISMISSED

### Repository: ReportRepository
- `findByStatusOrderByReportDateDesc(status)` - Get reports by status
- `findAllByOrderByReportDateDesc()` - Get all reports sorted by date

### Service: ReportService
- `createReport(reporterEmail, reportDTO)` - Create new report
- `getAllReports()` - Get all reports
- `getReportsByStatus(status)` - Filter by status
- `takeAction(reportId, actionDTO)` - Admin action on report

### Controller: ReportController
- **POST** `/api/reports` - Create report (authenticated users)
- **GET** `/api/reports` - Get all reports (admin only)
- **GET** `/api/reports/status/{status}` - Get by status (admin only)
- **PUT** `/api/reports/{reportId}/action` - Take action (admin only)

## Frontend Components

### ReportModal
- Modal form for submitting reports
- Fields: reason (dropdown), description (textarea)
- Reasons: Inappropriate Behavior, Fake Information, No Response, Harassment, Other

### ReportManagement
- Admin component to view all reports
- Table showing: ID, Reporter, Reported User, Reason, Date, Status
- Action modal to update status and add action notes

### Integration
- Report button added to DonorRecommendation component
- ReportManagement integrated into AdminDashboard with toggle button

## Security
- All authenticated users can create reports
- Only admins can view and take action on reports
- Configured in SecurityConfig

## Usage Flow
1. User clicks "Report" button on donor/user profile
2. Fills report form with reason and description
3. Report submitted with PENDING status
4. Admin views reports in dashboard
5. Admin takes action: REVIEWED, RESOLVED, or DISMISSED
6. Admin adds action notes explaining decision
