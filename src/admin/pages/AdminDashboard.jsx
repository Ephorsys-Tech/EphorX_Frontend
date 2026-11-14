import { useNavigate } from "react-router-dom";

import admin from "../../assets/admindashboard.png";

import DashboardWelcome from "./dashboard/DashboardWelcome";
import DashboardStats from "./dashboard/DashboardStats";
import EnrollmentAnalytics from "./dashboard/EnrollmentAnalytics";
import PopularCourses from "./dashboard/PopularCourses";
import RecentEnrollments from "./dashboard/RecentEnrollments";
import BookedDemoSessions from "./dashboard/BookedDemoSessions";
import CampaignActivity from "./dashboard/CampaignActivity";

import useAdminDashboardData from "./dashboard/useAdminDashboardData";
import buildDashboardViewModel from "./dashboard/buildDashboardViewModel";

export default function AdminDashboard({
  data,
  onAction,
  onViewAll,
  onJoinSession,
}) {
  const navigate = useNavigate();

  const {
    dashboardData,
    loading,
    failedApis,
    bookedDemoSessions,
    demoBookingsLoading,
    demoBookingsError,
  } = useAdminDashboardData();

  const source = {
    ...(dashboardData || {}),
    ...(data || {}),
  };

  const viewModel = buildDashboardViewModel({
    source,
    bookedDemoSessions,
  });

  const handleViewAll = (section) => {
    const routes = {
      "Popular Courses": "/admin/course",
      "Recent Enrollments": "/admin/enrollments",
      "Booked Demo Sessions": "/admin/book-demo",
      "Recent Activity": "/admin/activity",
    };

    const path = routes[section];

    if (path) {
      navigate(path);
    } else {
      onViewAll?.(section);
    }
  };

  const handleCampaignAction = () => {
    if (viewModel.campaigns.length > 0) {
      navigate("/admin/campaigns");
    } else {
      onAction?.("campaign");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-75 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5 pb-6">
      {failedApis.length > 0 && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">
          Some dashboard information could not be loaded: {failedApis.join(", ")}.
          Other available information is still displayed.
        </div>
      )}

      <DashboardWelcome adminImage={admin} onNavigate={navigate} />

      <DashboardStats stats={viewModel.dashboardStats} />

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <EnrollmentAnalytics
          chartData={viewModel.chartData}
          hasEnrollmentDates={viewModel.hasEnrollmentDates}
        />

        <PopularCourses
          courses={viewModel.popularCourses}
          onViewAll={() => handleViewAll("Popular Courses")}
        />
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        <RecentEnrollments
          enrollments={viewModel.recentEnrollmentRows}
          onViewAll={() => handleViewAll("Recent Enrollments")}
        />

        <BookedDemoSessions
          bookings={viewModel.recentBookedDemoSessions}
          loading={demoBookingsLoading}
          error={demoBookingsError}
          onJoinSession={onJoinSession}
          onViewAll={() => handleViewAll("Booked Demo Sessions")}
        />

        <CampaignActivity
          campaignTitle={viewModel.campaignTitle}
          campaignDescription={viewModel.campaignDescription}
          hasCampaigns={viewModel.campaigns.length > 0}
          activityItems={viewModel.activityItems}
          onCampaignAction={handleCampaignAction}
        />
      </section>
    </div>
  );
}
