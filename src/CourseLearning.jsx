import React, { useEffect, useState } from "react";

import courses from "./courses.js";
import CourseCatalogue from "./CourseCatalogue.jsx";
import CourseDetails from "./CourseDetails.jsx";
import LessonViewer from "./LessonViewer.jsx";
import ScenarioPlayer from "./ScenarioPlayer.jsx";
import CourseAssessment from "./CourseAssessment.jsx";

import "./course.css";

const PROGRESS_STORAGE_KEY = "minesafe_course_progress_v1";

function loadSavedProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function CourseLearning({
  role = "applicant",
  onBack,
  initialCourseId = null,
  onProgressChange,
}) {
  const normalizedRole = String(role || "applicant").trim().toLowerCase();
  const isApplicant = normalizedRole === "applicant";

  // Applicants receive foundational lessons and assessments only.
  // Scenario-based video lessons are reserved for the miner/manager stage.
  const getLessonsForRole = (course) => {
    const courseLessons = Array.isArray(course?.lessons) ? course.lessons : [];
    return isApplicant
      ? courseLessons.filter(
          (lesson) => String(lesson.type || "").toLowerCase() !== "scenario"
        )
      : courseLessons;
  };

  const [progress, setProgress] = useState(loadSavedProgress);

  const startingCourse = initialCourseId
    ? courses.find((course) => course.id === initialCourseId) || null
    : null;

  const [selectedCourse, setSelectedCourse] = useState(startingCourse);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeView, setActiveView] = useState(
    startingCourse ? "details" : "catalogue"
  );

  // Sync if parent dashboard changes initialCourseId dynamically.
  useEffect(() => {
    if (initialCourseId) {
      const match = courses.find((course) => course.id === initialCourseId);
      if (match) {
        setSelectedCourse(match);
        setSelectedLesson(null);
        setActiveView("details");
      }
    }
  }, [initialCourseId]);

  // Persist progress locally and notify parent dashboard/Firebase hooks.
  const updateCourseProgress = (courseId, updater) => {
    setProgress((prev) => {
      const currentCourseProgress = prev[courseId] || {
        completedLessons: [],
        assessment: null,
      };
      const updated = {
        ...prev,
        [courseId]: updater(currentCourseProgress),
      };

      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors.
      }

      onProgressChange?.(updated);
      return updated;
    });
  };

  const markLessonCompleted = (courseId, lessonId) => {
    if (!courseId || !lessonId) return;
    updateCourseProgress(courseId, (current) => ({
      ...current,
      completedLessons: current.completedLessons.includes(lessonId)
        ? current.completedLessons
        : [...current.completedLessons, lessonId],
    }));
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
    setActiveView("details");
  };

  const handleStartLesson = (lesson) => {
    // Defensive role check: an applicant cannot open a scenario even if a
    // scenario lesson is passed to this handler from another component.
    if (isApplicant && String(lesson?.type || "").toLowerCase() === "scenario") {
      setSelectedLesson(null);
      setActiveView("details");
      return;
    }

    setSelectedLesson(lesson);

    if (lesson.type === "scenario") {
      setActiveView("scenario");
    } else if (lesson.type === "assessment") {
      setActiveView("assessment");
    } else {
      setActiveView("lesson");
    }
  };

  const goToNextOrDetails = (completedLesson, autoAdvance = false) => {
    if (autoAdvance && selectedCourse && completedLesson) {
      const availableLessons = getLessonsForRole(selectedCourse);
      const idx = availableLessons.findIndex(
        (lesson) => lesson.id === completedLesson.id
      );
      const nextLesson = availableLessons[idx + 1];

      if (nextLesson) {
        handleStartLesson(nextLesson);
        return;
      }
    }

    setSelectedLesson(null);
    setActiveView("details");
  };

  const handleCompleteLesson = (lesson, { advance = false } = {}) => {
    const targetLesson = lesson || selectedLesson;
    markLessonCompleted(selectedCourse?.id, targetLesson?.id);
    goToNextOrDetails(targetLesson, advance);
  };

  const handleScenarioComplete = (scenarioResult) => {
    // Scenario completion is available only in the miner/manager learning flow.
    if (isApplicant) return;

    markLessonCompleted(selectedCourse?.id, selectedLesson?.id);
    if (scenarioResult && selectedCourse?.id) {
      updateCourseProgress(selectedCourse.id, (current) => ({
        ...current,
        lastScenarioResult: scenarioResult,
      }));
    }
    goToNextOrDetails(selectedLesson, false);
  };

  const handleAssessmentComplete = (result) => {
    if (selectedCourse?.id) {
      updateCourseProgress(selectedCourse.id, (current) => {
        const completedLessons =
          result?.passed &&
          selectedLesson?.id &&
          !current.completedLessons.includes(selectedLesson.id)
            ? [...current.completedLessons, selectedLesson.id]
            : current.completedLessons;

        return {
          ...current,
          completedLessons,
          assessment: {
            ...result,
            completedAt: new Date().toISOString(),
          },
        };
      });
    }

    setSelectedLesson(null);
    setActiveView("details");
  };

  const currentCourseProgress = selectedCourse
    ? progress[selectedCourse.id] || { completedLessons: [], assessment: null }
    : { completedLessons: [], assessment: null };

  const availableLessons = selectedCourse
    ? getLessonsForRole(selectedCourse)
    : [];

  const currentLessonIndex =
    selectedCourse && selectedLesson
      ? availableLessons.findIndex((lesson) => lesson.id === selectedLesson.id)
      : -1;

  const hasNextLesson =
    currentLessonIndex !== -1 && currentLessonIndex < availableLessons.length - 1;

  return (
    <div className="course-learning-container">
      {activeView === "catalogue" && (
        <>
          <button
            type="button"
            className="lesson-back-button"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <CourseCatalogue
            role={normalizedRole}
            progress={progress}
            onSelectCourse={handleSelectCourse}
          />
        </>
      )}

      {activeView === "details" && selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          role={normalizedRole}
          courseProgress={currentCourseProgress}
          onStartLesson={handleStartLesson}
          onBack={() => setActiveView("catalogue")}
          onBackToDashboard={onBack}
        />
      )}

      {activeView === "lesson" && selectedLesson && (
        <LessonViewer
          key={selectedLesson.id}
          course={selectedCourse}
          lesson={selectedLesson}
          hasNextLesson={hasNextLesson}
          role={normalizedRole}
          onComplete={(lesson, opts) => handleCompleteLesson(lesson, opts)}
          onBack={() => setActiveView("details")}
        />
      )}

      {!isApplicant && activeView === "scenario" && selectedLesson && (
        <ScenarioPlayer
          key={selectedLesson.id}
          course={selectedCourse}
          lesson={selectedLesson}
          onComplete={handleScenarioComplete}
          onBack={() => setActiveView("details")}
        />
      )}

      {activeView === "assessment" && selectedLesson && (
        <CourseAssessment
          key={selectedLesson.id}
          course={selectedCourse}
          lesson={selectedLesson}
          onComplete={handleAssessmentComplete}
          onBack={() => setActiveView("details")}
        />
      )}
    </div>
  );
}

export default CourseLearning;
