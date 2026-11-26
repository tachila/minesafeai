import React, { useMemo, useState } from "react";

const lessonQuestions = {
  "lesson-1": [
    {
      question: "What is the main purpose of mine safety procedures?",
      options: [
        "To increase production at all costs",
        "To identify hazards and reduce the risk of harm",
        "To remove the need for supervision",
        "To avoid reporting incidents"
      ],
      correctIndex: 1,
      explanation:
        "Mine safety procedures help identify hazards, establish controls and protect people working in mining environments."
    },
    {
      question: "Who has a responsibility to follow mine safety procedures?",
      options: [
        "Only the safety department",
        "Only supervisors",
        "Everyone working at the mine",
        "Only new employees"
      ],
      correctIndex: 2,
      explanation:
        "Safety is a shared responsibility. Everyone must follow applicable site procedures and report unsafe conditions."
    }
  ],

  "lesson-2": [
    {
      question: "Which of these can be a mining workplace hazard?",
      options: [
        "Moving machinery",
        "Unstable ground",
        "Poor ventilation",
        "All of the above"
      ],
      correctIndex: 3,
      explanation:
        "Mining environments can contain physical, environmental and equipment-related hazards. Workers need to recognise and report them."
    },
    {
      question: "What should you do when you identify a hazard?",
      options: [
        "Ignore it if nobody is injured",
        "Report it through the site's safety procedure",
        "Wait for another worker to notice it",
        "Attempt to repair it even without training"
      ],
      correctIndex: 1,
      explanation:
        "Follow the site's hazard-reporting procedure. Do not attempt work or repairs beyond your training and authorisation."
    }
  ],

  "lesson-3": [
    {
      question: "What is an important safety responsibility for a mineworker?",
      options: [
        "Following workplace safety procedures",
        "Ignoring instructions when work is busy",
        "Using equipment without checking it",
        "Failing to report hazards"
      ],
      correctIndex: 0,
      explanation:
        "Workers should follow site procedures, use required protective equipment and report hazards or incidents."
    }
  ],

  "lesson-4": [
    {
      question: "You notice an unsafe condition in your work area. What is the best response?",
      options: [
        "Continue working as normal",
        "Ignore it unless an accident happens",
        "Keep clear, warn others if safe and report it",
        "Ask an untrained colleague to fix it"
      ],
      correctIndex: 2,
      explanation:
        "Avoid exposing yourself or others to danger. Follow the site's reporting and response procedure."
    }
  ]
};

const NOTE_ICONS = ["🧭", "⛏️", "🦺", "🔎", "📋", "🛡️"];

function formatNote(paragraph) {
  const callout = paragraph.match(/^(important|warning|remember|safety note)\s*:\s*(.*)$/i);
  if (callout) {
    return {
      kind: "callout",
      label: callout[1].replace(/\b\w/g, (letter) => letter.toUpperCase()),
      text: callout[2] || paragraph,
    };
  }

  const heading = paragraph.match(/^(.{3,80}):$/);
  if (heading) return { kind: "heading", label: heading[1] };
  return { kind: "note", text: paragraph };
}

function LessonViewer({ course, lesson, onComplete, onBack, role = "applicant" }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const normalizedRole = String(role || "applicant").trim().toLowerCase();
  const isApplicant = normalizedRole === "applicant";

  const noteBlocks = useMemo(
    () => String(lesson?.content || "")
      .split(/\r?\n+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map(formatNote),
    [lesson?.content]
  );

  const questions = Array.isArray(lesson?.questions) && lesson.questions.length > 0
    ? lesson.questions
    : lessonQuestions[lesson?.id] || [];
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const readingCount = noteBlocks.filter((block) => block.kind !== "heading").length;
  const progressPercent = questions.length
    ? Math.round((checkedCount / questions.length) * 100)
    : 100;

  const handleAnswer = (questionIndex, optionIndex) => {
    if (checked[questionIndex]) return;
    setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }));
  };

  const checkAnswer = (questionIndex) => {
    setChecked((previous) => ({ ...previous, [questionIndex]: true }));
  };

  const allQuestionsChecked = questions.every((_, index) => checked[index]);

  return (
    <div className="lesson-viewer lesson-magazine">
      <div className="lesson-viewer-topbar">
        <button type="button" className="lesson-back-button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to course
        </button>
        <span className="lesson-breadcrumb">{course?.title || "MineSafe AI Learning"}</span>
      </div>

      <section className="lesson-hero-card lesson-magazine-hero">
        <div className="lesson-hero-content">
          <span className="lesson-eyebrow">MINESAFE AI · LEARNING MODULE</span>
          <h1>{lesson?.title || "Learning lesson"}</h1>
          <p>
            Build your understanding one topic at a time. Explore the learning
            cards, take note of the safety reminders and complete the knowledge check.
          </p>
          <div className="lesson-meta-row">
            <span>📖 Reading material</span>
            <span>✦ Visual learning cards</span>
            <span>✓ Self-paced</span>
          </div>
        </div>
        <div className="lesson-hero-icon" aria-hidden="true">📚</div>
        <div className="lesson-hero-decoration" aria-hidden="true">SAFETY FIRST</div>
      </section>

      <div className="lesson-content-layout lesson-magazine-layout">
        <main className="lesson-main-column">
          <section className="lesson-notes-section lesson-reading-section">
            <div className="lesson-section-heading">
              <div className="lesson-section-number">01</div>
              <div>
                <span>LEARN THE TOPIC</span>
                <h2>Explore the lesson</h2>
                <p>Each card introduces an important point. Read through them before attempting the knowledge check.</p>
              </div>
            </div>

            {noteBlocks.length > 0 ? (
              <div className="lesson-visual-grid">
                {noteBlocks.map((block, index) => {
                  if (block.kind === "heading") {
                    return (
                      <div className="lesson-topic-divider" key={`topic-${index}`}>
                        <span className="lesson-topic-divider-line" />
                        <h3>{block.label}</h3>
                        <span className="lesson-topic-divider-line" />
                      </div>
                    );
                  }

                  if (block.kind === "callout") {
                    return (
                      <article className="lesson-visual-callout" key={`note-${index}`}>
                        <div className="lesson-visual-callout-icon" aria-hidden="true">⚠️</div>
                        <div>
                          <span className="lesson-visual-kicker">{block.label}</span>
                          <p>{block.text}</p>
                        </div>
                      </article>
                    );
                  }

                  return (
                    <article className="lesson-visual-card" key={`note-${index}`}>
                      <div className="lesson-visual-card-top">
                        <span className="lesson-visual-icon" aria-hidden="true">
                          {NOTE_ICONS[index % NOTE_ICONS.length]}
                        </span>
                        <span className="lesson-visual-index">TOPIC {String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <p>{block.text}</p>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="lesson-empty-content">Lesson notes for this topic are being prepared.</div>
            )}
          </section>

          {!isApplicant && lesson?.videoUrl && (
            <section className="lesson-video-section lesson-miner-video">
              <div className="lesson-section-heading">
                <div className="lesson-section-number">02</div>
                <div>
                  <span>WATCH AND UNDERSTAND</span>
                  <h2>Lesson video</h2>
                  <p>Watch this supporting demonstration before continuing.</p>
                </div>
              </div>
              <div className="lesson-video-card">
                <video controls className="lesson-video" src={lesson.videoUrl}>
                  Your browser does not support video playback.
                </video>
              </div>
            </section>
          )}

          {questions.length > 0 && (
            <section className="lesson-questions-section">
              <div className="lesson-section-heading">
                <div className="lesson-section-number">02</div>
                <div>
                  <span>TEST YOUR UNDERSTANDING</span>
                  <h2>Knowledge check</h2>
                  <p>Select an answer for each question, then check your response.</p>
                </div>
              </div>

              <div className="lesson-question-list">
                {questions.map((question, questionIndex) => {
                  const selectedAnswer = answers[questionIndex];
                  const correctIndex = Number.isInteger(question.correctIndex)
                    ? question.correctIndex
                    : Number(question.answerIndex ?? 0);
                  const isCorrect = selectedAnswer === correctIndex;

                  return (
                    <article className="lesson-question-card" key={questionIndex}>
                      <div className="lesson-question-top">
                        <span>QUESTION {String(questionIndex + 1).padStart(2, "0")}</span>
                        <span>{checked[questionIndex] ? "Answer checked" : "Choose one answer"}</span>
                      </div>
                      <h3>{question.question || question.prompt}</h3>
                      <div className="lesson-answer-list">
                        {(question.options || []).map((option, optionIndex) => (
                          <button
                            type="button"
                            key={optionIndex}
                            disabled={checked[questionIndex]}
                            className={`lesson-answer-option ${selectedAnswer === optionIndex ? "selected" : ""} ${checked[questionIndex] && optionIndex === correctIndex ? "correct" : ""}`}
                            onClick={() => handleAnswer(questionIndex, optionIndex)}
                          >
                            <span className="lesson-answer-letter">{String.fromCharCode(65 + optionIndex)}</span>
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>

                      {!checked[questionIndex] ? (
                        <button
                          type="button"
                          className="lesson-check-button"
                          disabled={selectedAnswer === undefined}
                          onClick={() => checkAnswer(questionIndex)}
                        >
                          Check answer <span aria-hidden="true">→</span>
                        </button>
                      ) : (
                        <div className={`lesson-answer-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                          <strong>{isCorrect ? "Correct answer!" : "Not quite. Review the correct answer."}</strong>
                          <p>{question.explanation || "Review the lesson notes to reinforce your understanding."}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <div className="lesson-completion-panel">
            <div>
              <strong>Finished studying this lesson?</strong>
              <p>
                {questions.length > 0
                  ? `Check all ${questions.length} question(s) to complete this lesson.`
                  : "Complete the lesson and return to your course modules."}
              </p>
            </div>
            <button
              type="button"
              className="lesson-complete-button"
              disabled={!allQuestionsChecked}
              onClick={() => onComplete?.(lesson)}
            >
              Complete lesson <span aria-hidden="true">✓</span>
            </button>
          </div>
        </main>

        <aside className="lesson-side-column lesson-magazine-sidebar">
          <div className="lesson-side-card lesson-progress-card">
            <span className="lesson-side-icon" aria-hidden="true">📘</span>
            <h3>Your learning progress</h3>
            <p>Work through the reading cards and knowledge check at your own pace.</p>
            <div className="lesson-progress-track">
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="lesson-progress-caption">
              <strong>{progressPercent}%</strong>
              <span>{questions.length ? `${checkedCount} of ${questions.length} questions checked` : `${readingCount} learning points`}</span>
            </div>
          </div>

          <div className="lesson-side-card lesson-safety-reminder">
            <span className="lesson-side-icon" aria-hidden="true">⚠️</span>
            <h3>Safety reminder</h3>
            <p>This learning material supports safety awareness. Always follow your mine's approved procedures and instructions from qualified supervisors.</p>
          </div>

          <div className="lesson-side-card lesson-tip-card">
            <span className="lesson-side-icon" aria-hidden="true">💡</span>
            <h3>Study tip</h3>
            <p>Pause after each card and think about how the information applies to a real mining workplace.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default LessonViewer;
