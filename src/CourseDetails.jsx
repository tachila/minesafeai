import React from "react";
import "./course.css";

function CourseDetails({
  course,
  role = "applicant",
  courseProgress = { completedLessons: [], assessment: null },
  onStartLesson,
  onBack,
  onBackToDashboard,
}) {
  if (!course) {
    return <p>No course selected.</p>;
  }

  const normalizedRole = String(role || "applicant").trim().toLowerCase();
  const allLessons = Array.isArray(course.lessons) ? course.lessons : [];

  // Keep video scenario lessons out of the applicant learning stage.
  const visibleLessons =
    normalizedRole === "applicant"
      ? allLessons.filter(
          (lesson) => String(lesson.type || "").toLowerCase() !== "scenario"
        )
      : allLessons;

  const completedIds = Array.isArray(courseProgress.completedLessons)
    ? courseProgress.completedLessons
    : [];

  const totalLessons = visibleLessons.length;
  const completedCount = visibleLessons.filter((lesson) =>
    completedIds.includes(lesson.id)
  ).length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <section className="course-details-page">
      <div style={{ display: "flex", gap: "12px", marginBottom: "25px", flexWrap: "wrap" }}>
        <button
          type="button"
          className="catalogue-button"
          style={{ maxWidth: "170px" }}
          onClick={onBack}
        >
          ← All Courses
        </button>

        {onBackToDashboard && (
          <button
            type="button"
            className="lesson-back-button"
            onClick={onBackToDashboard}
          >
            Dashboard
          </button>
        )}
      </div>

      <div className="course-details-header">
        <div className="catalogue-icon">{course.icon}</div>

        <span className="catalogue-category">{course.category}</span>

        <h2>{course.title}</h2>

        <p>{course.description}</p>

        <div className="course-details-meta">
          <span>◷ {course.duration}</span>
          <span>{course.level}</span>
          <span>
            {completedCount}/{totalLessons} Lessons Completed ({progressPercent}%)
          </span>
          {courseProgress.assessment && (
            <span>
              Last Assessment: {courseProgress.assessment.percentage}%{" "}
              {courseProgress.assessment.passed ? "(Passed)" : "(Retry)"}
            </span>
          )}
        </div>
      </div>

      <div className="course-lessons-section">
        <h3>Course Lessons</h3>

        <p>
          Complete the lessons in order to build your understanding of mine
          safety.
        </p>

        {totalLessons === 0 ? (
          <div className="course-empty-lessons">
            <h4>Lessons coming soon</h4>
            <p>
              Learning materials for this course are currently being prepared.
            </p>
          </div>
        ) : (
          <div className="course-lesson-list">
            {visibleLessons.map((lesson, index) => {
              const isCompleted = completedIds.includes(lesson.id);

              return (
                <div
                  className={`course-lesson-item ${
                    isCompleted ? "completed" : ""
                  }`}
                  key={lesson.id}
                >
                  <div className="course-lesson-number">
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  <div className="course-lesson-info">
                    <h4>{lesson.title}</h4>
                    <span>
                      {lesson.type} · {lesson.duration || "Self-paced"}
                      {isCompleted ? " · Completed" : ""}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="catalogue-button course-lesson-button"
                    onClick={() => onStartLesson?.(lesson)}
                  >
                    {isCompleted ? "Review →" : "Start Lesson →"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseDetails;
