
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import admin from "../../assets/admindashboard.png"
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Megaphone,
  Activity,
  ArrowRight,
  Zap,
  Monitor,
  Palette,
  Clock,

  Calendar,
  Plus,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Existing API files
import { courseApi } from "../api/courseApi.js";
import { getCourseEnrollments } from "../api/courseEnrollApi";
import { getWebinarEnrollments } from "../api/webEnrollApi";
import { getAllDemoBookings } from "../api/demoBookingApi";
import campaignApi from "../api/campaignApi";

// --------------------------------------------------
// CONSTANTS
// --------------------------------------------------

const colorStyles = {
  blue: {
    card: "from-blue-50 to-white",
    icon: "bg-blue-100 text-blue-600",
    accent: "bg-blue-500",
  },
  purple: {
    card: "from-purple-50 to-white",
    icon: "bg-purple-100 text-purple-600",
    accent: "bg-purple-500",
  },
  green: {
    card: "from-emerald-50 to-white",
    icon: "bg-emerald-100 text-emerald-600",
    accent: "bg-emerald-500",
  },
  orange: {
    card: "from-orange-50 to-white",
    icon: "bg-orange-100 text-orange-600",
    accent: "bg-orange-500",
  },
  cyan: {
    card: "from-cyan-50 to-white",
    icon: "bg-cyan-100 text-cyan-600",
    accent: "bg-cyan-500",
  },
};

const courseIcons = [
  Monitor,
  Activity,
  Palette,
  Megaphone,
];

const enrollmentDateFields = [
  "enrolledAt",
  "enrollmentDate",
  "dateOfEnrollment",
  "registrationDate",
  "createdAt",
  "created_at",
  "createdOn",
  "date",
];

const demoDateFields = [
  "demoDate",
  "scheduledDate",
  "sessionDate",
  "preferredDate",
  "preferredDemoDate",
  "bookingDate",
  "startDate",
  "date",
];

// --------------------------------------------------
// REUSABLE HELPERS
// --------------------------------------------------

const firstValue = (object, keys) => {
  if (!object || typeof object !== "object") return null;

  for (const key of keys) {
    const value = object[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return null;
};

const firstText = (object, keys) => {
  const value = firstValue(object, keys);

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value).trim();
  }

  return "";
};

// Supports arrays and common API response wrappers.
const extractRecords = (response, preferredKeys = []) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const keys = [
    ...preferredKeys,
    "data",
    "results",
    "items",
    "records",
    "docs",
    "list",
    "result",
    "payload",
  ];

  for (const key of keys) {
    const value = response[key];

    if (Array.isArray(value)) {
      return value;
    }

    if (value && typeof value === "object") {
      const nested = extractRecords(value, preferredKeys);

      if (nested.length > 0) {
        return nested;
      }
    }
  }

  // Support APIs that return a single record instead of an array.
  const recordKeys = [
    "_id",
    "id",
    "courseName",
    "campaignName",
    "studentName",
    "demoDate",
    "bookingDate",
    "title",
    "name",
  ];

  if (recordKeys.some((key) => response[key] != null)) {
    return [response];
  }

  return [];
};

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const getEnrollmentDate = (record) => {
  return firstValue(record, enrollmentDateFields);
};

const getRecordDate = (record) => {
  return firstValue(record, [
    ...enrollmentDateFields,
    ...demoDateFields,
    "scheduledAt",
    "updatedAt",
  ]);
};

const getPersonName = (record) => {
  const directName = firstText(record, [
    "studentName",
    "learnerName",
    "userName",
    "fullName",
    "candidateName",
    "customerName",
    "name",
  ]);

  if (directName) return directName;

  const person = firstValue(record, [
    "student",
    "user",
    "learner",
    "customer",
    "candidate",
    "contact",
  ]);

  if (typeof person === "string") {
    return person;
  }

  if (person && typeof person === "object") {
    return (
      firstText(person, [
        "fullName",
        "name",
        "studentName",
        "userName",
      ]) || "Student"
    );
  }

  return "Student";
};

const getCourseName = (record) => {
  const directName = firstText(record, [
    "courseName",
    "courseTitle",
    "trainingName",
    "webinarName",
    "programName",
  ]);

  if (directName) return directName;

  const course = firstValue(record, [
    "course",
    "webinar",
    "program",
  ]);

  if (typeof course === "string") {
    return course;
  }

  if (course && typeof course === "object") {
    return (
      firstText(course, [
        "courseName",
        "courseTitle",
        "title",
        "name",
      ]) || "Course"
    );
  }

  return firstText(record, ["title"]) || "Course";
};

const getCourseId = (record) => {
  const value = firstValue(record, [
    "courseId",
    "course_id",
    "course",
  ]);

  if (value && typeof value === "object") {
    return String(
      firstValue(value, ["_id", "id", "courseId"]) || ""
    );
  }

  return value ? String(value) : "";
};

const getRecordId = (record) => {
  return firstText(record, [
    "_id",
    "id",
    "enrollmentId",
    "bookingId",
  ]);
};

const getStatus = (record, fallback = "Enrolled") => {
  const status = firstValue(record, [
    "status",
    "enrollmentStatus",
    "bookingStatus",
    "paymentStatus",
    "approvalStatus",
  ]);

  if (status === true) return "Active";
  if (status === false) return "Inactive";

  if (!status) return fallback;

  return String(status)
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getInitials = (name) => {
  return String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "ST";
};

const getNumericCount = (value) => {
  if (Array.isArray(value)) {
    return value.length;
  }

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

const formatTime = (record, date) => {
  const explicitTime = firstText(record, [
    "time",
    "demoTime",
    "preferredTime",
    "slotTime",
    "startTime",
    "scheduledTime",
  ]);

  if (explicitTime) return explicitTime;

  if (date && (date.getHours() !== 0 || date.getMinutes() !== 0)) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return "Time not specified";
};

const formatRelativeTime = (date) => {
  if (!date) return "";

  const difference = Date.now() - date.getTime();

  if (difference < 0) {
    return date.toLocaleDateString([], {
      day: "numeric",
      month: "short",
    });
  }

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(difference / 3600000);
  const days = Math.floor(difference / 86400000);

  if (minutes < 60) {
    return `${Math.max(1, minutes)}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
  });
};

// --------------------------------------------------
// SECTION HEADING
// --------------------------------------------------

function SectionHeading({ icon: Icon, title, action, onClick }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-800">
        <Icon size={20} className="text-blue-600" />
        {title}
      </h2>

      {action && (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
        >
          {action}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

// --------------------------------------------------
// MAIN DASHBOARD
// --------------------------------------------------

export default function AdminDashboard({
  data,
  onAction,
  onViewAll,
  onJoinSession,
}) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failedApis, setFailedApis] = useState([]);
  const navigate = useNavigate();

  // Navigate from each dashboard section's "View All" action.
  const handleViewAll = (section) => {
    const routes = {
      "Popular Courses": "/admin/course",
      "Recent Enrollments": "/admin/enrollments",
      "Upcoming Demo Sessions": "/admin/book-demo",
      "Recent Activity": "/admin/activity",

    };

    const path = routes[section];

    if (path) {
      navigate(path);
    } else {
      // Keep the existing callback as a fallback for any unmapped section.
      onViewAll?.(section);
    }
  };

  // ------------------------------------------------
  // FETCH ALL DASHBOARD APIs
  // ------------------------------------------------

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
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

            console.error(
              `${api.label} API failed:`,
              result.reason
            );
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
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ------------------------------------------------
  // NORMALIZE API RESPONSES
  // ------------------------------------------------

  const source = {
    ...(dashboardData || {}),
    ...(data || {}),
  };

  const courses = extractRecords(
    source.courses,
    ["courses", "items"]
  );

  const courseEnrollments = extractRecords(
    source.courseEnrollments,
    ["courseEnrollments", "enrollments"]
  );

  const webinarEnrollments = extractRecords(
    source.webinarEnrollments,
    ["webinarEnrollments", "webinarEnroll", "enrollments"]
  );

  const demoBookings = extractRecords(
    source.demoBookings,
    ["demoBookings", "bookings", "demos"]
  );

  const campaigns = extractRecords(
    source.campaigns,
    ["campaigns", "activeCampaigns", "activeCampaign", "campaign"]
  );

  const allEnrollments = [
    ...courseEnrollments.map((record) => ({
      record,
      type: "Course",
    })),
    ...webinarEnrollments.map((record) => ({
      record,
      type: "Webinar",
    })),
  ];

  // ------------------------------------------------
  // KPI DATA
  // ------------------------------------------------

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

  // ------------------------------------------------
  // ENROLLMENT ANALYTICS CHART
  // ------------------------------------------------

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
      const enrollmentDate = parseDate(
        getEnrollmentDate(record)
      );

      if (!enrollmentDate) return false;

      return (
        enrollmentDate.getMonth() === monthDate.getMonth() &&
        enrollmentDate.getFullYear() === monthDate.getFullYear()
      );
    }).length;

    return {
      month: monthDate.toLocaleDateString([], {
        month: "short",
      }),
      enrollments: count,
    };
  });

  const hasEnrollmentDates = allEnrollments.some(({ record }) => {
    return Boolean(parseDate(getEnrollmentDate(record)));
  });

  // ------------------------------------------------
  // POPULAR COURSES
  // ------------------------------------------------

  const popularCourses = courses
    .map((course) => {
      const courseName =
        firstText(course, [
          "courseName",
          "courseTitle",
          "title",
          "name",
        ]) || "Untitled Course";

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
          enrollmentCourseName.toLowerCase() ===
          courseName.toLowerCase();

        const idMatches =
          courseId &&
          enrollmentCourseId &&
          courseId === enrollmentCourseId;

        return nameMatches || idMatches;
      }).length;

      return {
        name: courseName,
        enrollments: explicitCount ?? matchedCount,
      };
    })
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 4);

  const maxCourseEnrollments = Math.max(
    ...popularCourses.map((course) => course.enrollments),
    1
  );

  const courseColors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-orange-500",
  ];

  // ------------------------------------------------
  // RECENT ENROLLMENTS
  // ------------------------------------------------

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

  // ------------------------------------------------
  // UPCOMING DEMO BOOKINGS
  // ------------------------------------------------

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const upcomingSessions = demoBookings
    .map((record, index) => {
      const date = parseDate(
        firstValue(record, demoDateFields)
      );

      const title =
        firstText(record, [
          "demoTitle",
          "sessionTitle",
          "topic",
          "courseName",
          "courseTitle",
        ]) || getCourseName(record);

      return {
        key: getRecordId(record) || `demo-${index}`,
        title: title === "Course" ? "Demo Session" : title,
        day: date ? date.getDate() : "",
        month: date
          ? date.toLocaleDateString([], { month: "short" })
          : "",
        time: formatTime(record, date),
        date,
        raw: record,
      };
    })
    .filter((session) => {
      return session.date && session.date >= startOfToday;
    })
    .sort((a, b) => a.date - b.date)
    .slice(0, 4);

  // ------------------------------------------------
  // ACTIVE CAMPAIGN
  // ------------------------------------------------

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

  // ------------------------------------------------
  // RECENT ACTIVITY
  // ------------------------------------------------

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
          firstText(record, [
            "campaignName",
            "name",
            "title",
          ]) || "Campaign";

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
          firstText(record, [
            "courseName",
            "courseTitle",
            "title",
            "name",
          ]) || "New course";

        return {
          text: `Course added: ${name}`,
          date,
        };
      })
      .filter(Boolean),
  ]
    .sort((a, b) => b.date - a.date)
    .slice(0, 4);

  // ------------------------------------------------
  // QUICK ACTIONS
  // ------------------------------------------------

  const quickActions = [
    {
      key: "add-course",
      label: "Add Course",
      icon: Plus,
      path: "/admin/add-course",
    },
    {
      key: "students",
      label: "View Enrollments",
      icon: Users,
      path: "/admin/enrollments",
    },
    {
      key: "demo",
      label: "Manage Demo Sessions",
      icon: Calendar,
      path: "/admin/book-demo",
    },
    {
      key: "campaign",
      label: "Create Campaign",
      icon: Megaphone,
      path: "/admin/campaigns",
    },
  ];
  // ------------------------------------------------
  // LOADING STATE
  // ------------------------------------------------

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

      {/* API ERROR NOTICE */}

      {failedApis.length > 0 && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">
          Some dashboard information could not be loaded:{" "}
          {failedApis.join(", ")}.
          Other available information is still displayed.
        </div>
      )}

      {/* WELCOME BANNER + QUICK ACTIONS */}

      <section className="relative grid overflow-hidden rounded-2xl bg-linear-to-r from-[#172477] via-blue-700 to-purple-600 text-white shadow-sm lg:grid-cols-[1fr_0.95fr]">

        {/* Welcome */}

        <div className="grid grid-cols-1 items-center gap-4 px-5 py-7 sm:px-5 md:grid-cols-[minmax(0,1fr)_280px]">

          {/* Left content */}
          <div className="flex flex-col justify-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-200">
              Education Management
            </p>

            <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl md:whitespace-nowrap">
              Welcome back, Admin!
            </h1>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-blue-100">
              Manage your platform and track your performance from one place.
            </p>
          </div>

          {/* Right image */}
          <div className="flex w-full items-center justify-center md:justify-end">
            <img
              src={admin}
              alt="Education management mascot"
              className="mx-auto h-36 w-full max-w-64 object-contain drop-shadow-xl sm:h-40 md:mx-0 md:h-44 lg:h-52
                        mr-15"
            />
          </div>

        </div>

        {/* Quick Actions */}

        <div className="border-t border-white/20 bg-white/10 px-5 py-6 backdrop-blur-sm lg:border-l lg:border-t-0 lg:px-7">
          <div className="mb-4 flex items-center gap-2">
            <Zap size={19} className="text-yellow-300" />

            <h2 className="text-lg font-bold">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((item, index) => {
              const Icon = item.icon;

              const iconColors = [
                "bg-blue-100 text-blue-600",
                "bg-purple-100 text-purple-600",
                "bg-teal-100 text-teal-600",
                "bg-orange-100 text-orange-600",
              ];

              return (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className="flex min-h-22.5 flex-col items-center justify-center gap-2 rounded-xl border border-white/70 bg-white px-2 py-3 text-center text-xs font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full ${iconColors[index % iconColors.length]}`}
                  >
                    <Icon size={21} />
                  </span>

                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* KPI CARDS */}

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {dashboardStats.map((item) => {
          const Icon = item.icon;
          const tone = colorStyles[item.color];

          return (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-linear-to-br ${tone.card} py-2 px-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Top Accent Line */}
              <div
                className={`absolute left-0 top-0 h-1 w-full ${tone.accent}`}
              />

              {/* Card Header */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {item.title}
                </p>

                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${tone.icon} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>
              </div>

              {/* KPI Value */}
              <div className="mt-5">
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {item.value.toLocaleString()}
                </h3>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Total {item.title.toLowerCase()}
                </p>
              </div>

              {/* Decorative Background */}
              <div
                className={`pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-10 ${tone.accent} transition-transform duration-500 group-hover:scale-150`}
              />
            </div>
          );
        })}
      </section>

      {/* ENROLLMENT CHART + POPULAR COURSES */}

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">

        {/* Enrollment Analytics */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <SectionHeading
            icon={Activity}
            title="Enrollment Analytics"
          />

          <div className="h-65 w-full">
            {hasEnrollmentDates ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="enrollmentGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3B82F6"
                        stopOpacity={0.25}
                      />

                      <stop
                        offset="100%"
                        stopColor="#3B82F6"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8EEF8"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="enrollments"
                    name="Enrollments"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fill="url(#enrollmentGradient)"
                    dot={{
                      fill: "#fff",
                      stroke: "#3B82F6",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-center text-sm text-slate-400">
                No enrollment date information available yet.
              </div>
            )}
          </div>
        </div>

        {/* Popular Courses */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <SectionHeading
            icon={GraduationCap}
            title="Popular Courses"
            action="View All"
            onClick={() => handleViewAll("Popular Courses")}
          />

          <div className="space-y-5">
            {popularCourses.length > 0 ? (
              popularCourses.map((course, index) => {
                const Icon = courseIcons[index % courseIcons.length];

                const percentage = Math.round(
                  (course.enrollments / maxCourseEnrollments) * 100
                );

                return (
                  <div
                    key={`${course.name}-${index}`}
                    className="flex items-center gap-3"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                      <BookOpen size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {course.name}
                        </p>

                        <span className="shrink-0 text-xs font-semibold text-slate-500">
                          {course.enrollments}
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${courseColors[index % courseColors.length]}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                No courses available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* RECENT ENROLLMENTS + UPCOMING DEMOS + CAMPAIGN */}

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">

        {/* Recent Enrollments */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <SectionHeading
            icon={Users}
            title="Recent Enrollments"
            action="View All"
            onClick={() => handleViewAll("Recent Enrollments")}
          />

          <div className="space-y-5">
            {recentEnrollmentRows.length > 0 ? (
              recentEnrollmentRows.map((person) => {
                const isPending = /pending|await|review/i.test(
                  person.status
                );

                return (
                  <div
                    key={person.key}
                    className="flex items-center gap-3"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white">
                      {person.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800">
                        {person.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {person.course}
                      </p>
                    </div>

                    <span
                      className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold ${isPending
                        ? "bg-orange-100 text-orange-700"
                        : "bg-emerald-100 text-emerald-700"
                        }`}
                    >
                      {person.status}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                No enrollments available.
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Demo Sessions */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <SectionHeading
            icon={CalendarDays}
            title="Upcoming Demo Sessions"
            action="View All"
            onClick={() => handleViewAll("Upcoming Demo Sessions")}
          />

          <div className="space-y-5">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <div
                  key={session.key}
                  className="flex items-center gap-3"
                >
                  <div className="grid h-12 w-12 shrink-0 place-content-center rounded-xl bg-blue-50 text-center">
                    <span className="text-lg font-extrabold leading-none text-blue-700">
                      {session.day}
                    </span>

                    <span className="mt-1 text-[10px] font-bold text-blue-500">
                      {session.month}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800">
                      {session.title}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock size={12} />
                      {session.time}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onJoinSession?.(session)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-blue-700"
                  >
                    Join
                  </button>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                No upcoming demo sessions.
              </p>
            )}
          </div>
        </div>

        {/* Campaign Promotion + Recent Activity */}

        <div className="flex flex-col gap-5 lg:col-span-2 2xl:col-span-1">

          {/* Campaign Card */}

          <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-800 via-purple-700 to-purple-500 p-5 text-white shadow-sm">
            <div className="relative z-10 max-w-[75%]">
              <h3 className="text-lg font-extrabold">
                {campaignTitle}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-purple-100">
                {campaignDescription}
              </p>

              <button
                type="button"
                onClick={() => {
                  if (campaigns.length > 0) {
                    navigate("/admin/campaigns");
                  } else {
                    onAction?.("campaign");
                  }
                }}
                className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-indigo-800 transition hover:-translate-y-0.5"
              >
                {campaigns.length > 0
                  ? "View Campaign"
                  : "Create Campaign"}

                <ArrowRight size={14} />
              </button>
            </div>

            <Megaphone
              size={75}
              className="absolute bottom-4 right-4 -rotate-12 text-white/80"
              strokeWidth={1.3}
            />
          </div>

          {/* Recent Activity */}

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <SectionHeading
              icon={Zap}
              title="Recent Activity"
              action="View All"
              onClick={() => handleViewAll("Recent Activity")}
            />

            <div className="space-y-4">
              {activityItems.length > 0 ? (
                activityItems.map((activity, index) => (
                  <div
                    key={`${activity.text}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500 ring-4 ring-blue-50" />

                    <p className="flex-1 text-xs leading-relaxed text-slate-600">
                      {activity.text}
                    </p>

                    <span className="shrink-0 text-[10px] text-slate-400">
                      {formatRelativeTime(activity.date)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-slate-400">
                  No recent activity available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
