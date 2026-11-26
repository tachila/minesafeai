import React from "react";
import courses from "./courses.js";
import "./course.css";

function CourseCatalogue({ role = "applicant", onSelectCourse, progress }) {
  const normalizedRole = String(role || "applicant").trim().toLowerCase();
  const isApplicant = normalizedRole === "applicant";

  // Only show courses assigned to the current account type.
  const availableCourses = courses.filter(
    (course) =>
      Array.isArray(course.audience) &&
      course.audience.includes(normalizedRole)
  );

  return (
    <section className="course-catalogue">
      <div className="catalogue-heading">
        <div className="catalogue-heading-copy">
          <span className="catalogue-eyebrow">
            MINESAFE AI LEARNING CENTRE
          </span>

          <h2>Explore Training Courses</h2>

          <p>
            {isApplicant
              ? "Build your mining safety knowledge through structured lessons and knowledge assessments."
              : "Develop your mining safety knowledge through structured lessons, videos and interactive safety scenarios."}
          </p>
        </div>

        <div
          className="catalogue-count"
          aria-label={`${availableCourses.length} available courses`}
        >
          <strong>{availableCourses.length}</strong>
          <span>Available Courses</span>
        </div>
      </div>

      {availableCourses.length === 0 ? (
        <div className="catalogue-empty">
        
          <h3>No courses available yet</h3>
          <p>There are currently no courses assigned to this account type.</p>
        </div>
      ) : (
        <div className="catalogue-grid">
          {availableCourses.map((course) => {
            // Match the applicant's lesson count to the lessons they can access.
            const allLessons = Array.isArray(course.lessons)
              ? course.lessons
              : [];
            const visibleLessons = isApplicant
              ? allLessons.filter(
                  (lesson) =>
                    String(lesson.type || "").toLowerCase() !== "scenario"
                )
              : allLessons;

            return (
              <article className="catalogue-card" key={course.id}>
                <div className="catalogue-card-top">
                
                  <span className="catalogue-level">
                    {course.level || "General"}
                  </span>
                </div>

                <span className="catalogue-category">
                  {course.category || "Mine Safety"}
                </span>

                <h3>{course.title}</h3>

                <p className="catalogue-description">{course.description}</p>

                <div className="catalogue-card-info">
                  <span>◷ {course.duration || "Flexible duration"}</span>
                  <span>
                    {visibleLessons.length}{" "}
                    {visibleLessons.length === 1 ? "lesson" : "lessons"}
                  </span>
                </div>

                <button
                  type="button"
                  className="catalogue-button"
                  onClick={() => onSelectCourse?.(course)}
                >
                  View Course <span aria-hidden="true">→</span>
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CourseCatalogue;
