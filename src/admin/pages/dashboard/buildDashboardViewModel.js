import {
  extractRecords,
  firstText,
  firstValue,
  getCourseId,
  getCourseName,
  getEnrollmentDate,
  getInitials,
  getNumericCount,
  getPersonName,
  getRecordDate,
  getRecordId,
  getStatus,
  parseDate,
} from "./dashboardUtils";

import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Megaphone,
  Users,
} from "lucide-react";

export default function buildDashboardViewModel({
  source,
  bookedDemoSessions = [],
}) {
  const courses = extractRecords(source.courses, ["courses", "items"]);

  const courseEnrollments = extractRecords(source.courseEnrollments, [
    "courseEnrollments",
    "enrollments",
  ]);

  const webinarEnrollments = extractRecords(source.webinarEnrollments, [
    "webinarEnrollments",
    "webinarEnroll",
    "enrollments",
  ]);

  const demoBookings = extractRecords(source.demoBookings, [
    "demoBookings",
    "bookings",
    "demos",
  ]);

  const campaigns = extractRecords(source.campaigns, [
    "campaigns",
    "activeCampaigns",
    "activeCampaign",
    "campaign",
  ]);

  const allEnrollments = [
    ...courseEnrollments.map((record) => ({ record, type: "Course" })),
    ...webinarEnrollments.map((record) => ({ record, type: "Webinar" })),
  ];

  const dashboardStats = [
    {
      title: "Courses",
      value: courses.length,
      icon: BookOpen,
      color: "blue",
    },
    {
      title: "Course Enrollments",
      value: courseEnrollments.length,
      icon: GraduationCap,
      color: "purple",
    },
    {
      title: "Webinar Enrollments",
      value: webinarEnrollments.length,
      icon: Users,
      color: "green",
    },
    {
      title: "Demo Bookings",
      value: demoBookings.length,
      icon: CalendarDays,
      color: "orange",
    },
    {
      title: "Active Campaigns",
      value: campaigns.length,
      icon: Megaphone,
      color: "cyan",
    },
  ];

  const currentDate = new Date();
  const chartMonths = Array.from({ length: 6 }, (_, index) => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 5 + index,
      1
    );
  });

  const chartData = chartMonths.map((monthDate) => {
    const count = allEnrollments.filter(({ record }) => {
      const enrollmentDate = parseDate(getEnrollmentDate(record));

      if (!enrollmentDate) return false;

      return (
        enrollmentDate.getMonth() === monthDate.getMonth() &&
        enrollmentDate.getFullYear() === monthDate.getFullYear()
      );
    }).length;

    return {
      month: monthDate.toLocaleDateString([], { month: "short" }),
      enrollments: count,
    };
  });

  const hasEnrollmentDates = allEnrollments.some(({ record }) => {
    return Boolean(parseDate(getEnrollmentDate(record)));
  });

  const popularCourses = courses
    .map((course) => {
      const courseName =
        firstText(course, ["courseName", "courseTitle", "title", "name"]) ||
        "Untitled Course";

      const courseId = getRecordId(course);

      const explicitCount = getNumericCount(
        firstValue(course, [
          "enrollmentCount",
          "totalEnrollments",
          "enrolledCount",
          "studentsEnrolled",
          "enrollments",
        ])
      );

      const matchedCount = allEnrollments.filter(({ record }) => {
        const enrollmentCourseName = getCourseName(record);
        const enrollmentCourseId = getCourseId(record);

        const nameMatches =
          enrollmentCourseName.toLowerCase() === courseName.toLowerCase();

        const idMatches =
          courseId && enrollmentCourseId && courseId === enrollmentCourseId;

        return nameMatches || idMatches;
      }).length;

      return {
        name: courseName,
        enrollments: explicitCount ?? matchedCount,
      };
    })
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 4);

  const recentEnrollmentRows = allEnrollments
    .map(({ record, type }, index) => {
      const name = getPersonName(record);
      const date = parseDate(getEnrollmentDate(record));

      return {
        key: getRecordId(record) || `${type}-${index}`,
        name,
        initials: getInitials(name),
        course: getCourseName(record),
        status: getStatus(
          record,
          type === "Course" ? "Enrolled" : "Registered"
        ),
        date,
      };
    })
    .sort((a, b) => {
      return (b.date?.getTime() || 0) - (a.date?.getTime() || 0);
    })
    .slice(0, 5);

  const activityItems = [
    ...recentEnrollmentRows
      .filter((item) => item.date)
      .map((item) => ({
        text: `${item.name} enrolled in ${item.course}`,
        date: item.date,
      })),

    ...demoBookings
      .map((record) => {
        const date = parseDate(getRecordDate(record));
        if (!date) return null;

        return {
          text: `New demo booking from ${getPersonName(record)}`,
          date,
        };
      })
      .filter(Boolean),

    ...campaigns
      .map((record) => {
        const date = parseDate(getRecordDate(record));
        if (!date) return null;

        const name =
          firstText(record, ["campaignName", "name", "title"]) || "Campaign";

        return {
          text: `Campaign available: ${name}`,
          date,
        };
      })
      .filter(Boolean),

    ...courses
      .map((record) => {
        const date = parseDate(getRecordDate(record));
        if (!date) return null;

        const name =
          firstText(record, ["courseName", "courseTitle", "title", "name"]) ||
          "New course";

        return {
          text: `Course added: ${name}`,
          date,
        };
      })
      .filter(Boolean),
  ]
    .sort((a, b) => b.date - a.date)
    .slice(0, 4);

  // Display only the two newest demo bookings.
  const recentBookedDemoSessions = [...bookedDemoSessions]
    .map((booking, index) => ({
      booking,
      index,
      createdAt: parseDate(
        firstValue(booking, [
          "createdAt",
          "created_at",
          "bookingCreatedAt",
          "bookedAt",
          "createdOn",
          "bookingDate",
          "date",
        ])
      ),
    }))
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) return b.createdAt - a.createdAt;
      if (a.createdAt) return -1;
      if (b.createdAt) return 1;
      return a.index - b.index;
    })
    .slice(0, 2);

  const activeCampaign = campaigns[0];

  const campaignTitle = activeCampaign
    ? firstText(activeCampaign, [
        "campaignName",
        "name",
        "title",
        "offerTitle",
      ]) || "Active Campaign"
    : "Boost Your Reach";

  const campaignDescription = activeCampaign
    ? firstText(activeCampaign, [
        "description",
        "details",
        "message",
        "objective",
        "content",
      ]) || "Your active campaign is running."
    : "Run targeted campaigns and attract more learners.";

  return {
    courses,
    courseEnrollments,
    webinarEnrollments,
    demoBookings,
    campaigns,
    dashboardStats,
    chartData,
    hasEnrollmentDates,
    popularCourses,
    recentEnrollmentRows,
    recentBookedDemoSessions,
    activityItems,
    campaignTitle,
    campaignDescription,
  };
}
