import { useEffect, useState } from "react";

import { courseApi } from "../../api/courseApi.js";
import { getCourseEnrollments } from "../../api/courseEnrollApi";
import { getWebinarEnrollments } from "../../api/webEnrollApi";
import { getAllDemoBookings } from "../../api/demoBookingApi";
import campaignApi from "../../api/campaignApi";

export default function useAdminDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failedApis, setFailedApis] = useState([]);

  const [bookedDemoSessions, setBookedDemoSessions] = useState([]);
  const [demoBookingsLoading, setDemoBookingsLoading] = useState(true);
  const [demoBookingsError, setDemoBookingsError] = useState("");

  // Fetch the latest two-section demo booking feed and refresh it every 30 seconds.
  useEffect(() => {
    let isMounted = true;
    let firstLoad = true;

    const fetchDemoBookings = async () => {
      try {
        const response = await getAllDemoBookings();

        const bookings = [
          response,
          response?.data,
          response?.bookings,
          response?.demoBookings,
          response?.data?.bookings,
          response?.data?.demoBookings,
        ].find(Array.isArray) || [];

        if (isMounted) {
          setBookedDemoSessions(bookings);
          setDemoBookingsError("");
        }
      } catch (error) {
        if (isMounted) {
          setDemoBookingsError(
            error?.response?.data?.message ||
              "Unable to fetch demo bookings."
          );
        }
      } finally {
        if (isMounted && firstLoad) {
          setDemoBookingsLoading(false);
          firstLoad = false;
        }
      }
    };

    fetchDemoBookings();
    const interval = setInterval(fetchDemoBookings, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Fetch the data used by the dashboard cards and analytics.
  useEffect(() => {
    let isMounted = true;

    const apiCalls = [
      {
        key: "courses",
        label: "Courses",
        request: () => courseApi.getAll(),
      },
      {
        key: "courseEnrollments",
        label: "Course Enrollments",
        request: () => getCourseEnrollments(),
      },
      {
        key: "webinarEnrollments",
        label: "Webinar Enrollments",
        request: () => getWebinarEnrollments(),
      },
      {
        key: "demoBookings",
        label: "Demo Bookings",
        request: () => getAllDemoBookings(),
      },
      {
        key: "campaigns",
        label: "Active Campaigns",
        request: () => campaignApi.getActive(),
      },
    ];

    const fetchDashboardData = async () => {
      try {
        const results = await Promise.allSettled(
          apiCalls.map((api) => api.request())
        );

        if (!isMounted) return;

        const responseData = {};
        const failures = [];

        results.forEach((result, index) => {
          const api = apiCalls[index];

          if (result.status === "fulfilled") {
            responseData[api.key] = result.value;
          } else {
            responseData[api.key] = [];
            failures.push(api.label);
            console.error(`${api.label} API failed:`, result.reason);
          }
        });

        setDashboardData(responseData);
        setFailedApis(failures);
      } catch (error) {
        console.error("Dashboard loading error:", error);

        if (isMounted) {
          setFailedApis(["Dashboard"]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    dashboardData,
    loading,
    failedApis,
    bookedDemoSessions,
    demoBookingsLoading,
    demoBookingsError,
  };
}
