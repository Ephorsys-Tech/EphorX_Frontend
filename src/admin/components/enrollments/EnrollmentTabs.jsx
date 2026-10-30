const EnrollmentTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "webinar", label: "Webinar Enrollments" },
    { id: "course", label: "Course Enrollments" },
  ];

  return (
    <div className="flex gap-3 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`border-b-2 px-5 py-3 text-sm font-semibold transition ${
            activeTab === tab.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-blue-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default EnrollmentTabs;