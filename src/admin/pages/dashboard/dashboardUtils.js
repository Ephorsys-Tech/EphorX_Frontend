// Shared helpers used by the admin dashboard and its sections.

export const enrollmentDateFields = [
  "enrolledAt",
  "enrollmentDate",
  "dateOfEnrollment",
  "registrationDate",
  "createdAt",
  "created_at",
  "createdOn",
  "date",
];

export const demoDateFields = [
  "demoDate",
  "scheduledDate",
  "sessionDate",
  "preferredDate",
  "preferredDemoDate",
  "bookingDate",
  "startDate",
  "date",
];

export const firstValue = (object, keys) => {
  if (!object || typeof object !== "object") return null;

  for (const key of keys) {
    const value = object[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return null;
};

export const firstText = (object, keys) => {
  const value = firstValue(object, keys);

  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }

  return "";
};

// Supports arrays and common API response wrappers.
export const extractRecords = (response, preferredKeys = []) => {
  if (Array.isArray(response)) return response;
  if (!response || typeof response !== "object") return [];

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

    if (Array.isArray(value)) return value;

    if (value && typeof value === "object") {
      const nested = extractRecords(value, preferredKeys);
      if (nested.length > 0) return nested;
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

export const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const getEnrollmentDate = (record) => {
  return firstValue(record, enrollmentDateFields);
};

export const getRecordDate = (record) => {
  return firstValue(record, [
    ...enrollmentDateFields,
    ...demoDateFields,
    "scheduledAt",
    "updatedAt",
  ]);
};

export const getPersonName = (record) => {
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

  if (typeof person === "string") return person;

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

export const getCourseName = (record) => {
  const directName = firstText(record, [
    "courseName",
    "courseTitle",
    "trainingName",
    "webinarName",
    "programName",
  ]);

  if (directName) return directName;

  const course = firstValue(record, ["course", "webinar", "program"]);

  if (typeof course === "string") return course;

  if (course && typeof course === "object") {
    return (
      firstText(course, ["courseName", "courseTitle", "title", "name"]) ||
      "Course"
    );
  }

  return firstText(record, ["title"]) || "Course";
};

export const getCourseId = (record) => {
  const value = firstValue(record, ["courseId", "course_id", "course"]);

  if (value && typeof value === "object") {
    return String(firstValue(value, ["_id", "id", "courseId"]) || "");
  }

  return value ? String(value) : "";
};

export const getRecordId = (record) => {
  return firstText(record, ["_id", "id", "enrollmentId", "bookingId"]);
};

export const getStatus = (record, fallback = "Enrolled") => {
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

export const getInitials = (name) => {
  return (
    String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "ST"
  );
};

export const getNumericCount = (value) => {
  if (Array.isArray(value)) return value.length;
  if (value === null || value === undefined || value === "") return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export const formatRelativeTime = (date) => {
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

  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
  });
};
