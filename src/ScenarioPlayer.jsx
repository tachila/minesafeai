import React, { useMemo, useRef, useState } from "react";
import videoScenarios from "./data/scenarios.js";
//import "./course.css";
import "./components/ScenarioVideoTraining.css";

function ScenarioPlayer({
  course,
  lesson,
  scenarioData,
  onComplete,
  onBack,
  onOpenCourse,
}) {
  const videoRef = useRef(null);

  const activeScenario = useMemo(() => {
    if (scenarioData) return scenarioData;

    if (course?.id) {
      const matched = videoScenarios.find(
        (scenario) => scenario.courseId === course.id
      );

      if (matched) return matched;
    }

    return {
      id: lesson?.id || "general-scenario",
      title: lesson?.title || "Interactive Safety Scenario",
      description:
        lesson?.content ||
        "Review the workplace situation and choose the safest action.",
      videoUrl: lesson?.videoUrl || "",
      steps: videoScenarios[0]?.steps || [],
      
    };
  }, [course, lesson, scenarioData]);

  const steps = activeScenario.steps || [];
  const timedStepIndices = steps
  .map((step, index) => ({ step, index }))
  .filter(({ step }) => Number.isFinite(step.triggerAt))
  .map(({ index }) => index);

const questionCount = activeScenario.timedVideoQuestions
  ? timedStepIndices.length
  : steps.length;

  const hasTimedQuestions =
    Boolean(activeScenario.timedVideoQuestions) &&
    Boolean(activeScenario.videoUrl) &&
    steps.some((step) => Number.isFinite(step.triggerAt));

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [safeCount, setSafeCount] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [finished, setFinished] = useState(false);
   const [videoProgress, setVideoProgress] = useState(0);
  const [status, setStatus] = useState(
    hasTimedQuestions ? "intro" : "question"
  );
  const [videoError, setVideoError] = useState(false);

  const currentStep = steps[stepIndex];
 

 const percentage =
  questionCount > 0
    ? Math.round((safeCount / questionCount) * 100)
    : 100;

  const startVideo = async () => {
    setStatus("watching");

    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch {
        setStatus("intro");
      }
    }
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
  setVideoProgress((video.currentTime / video.duration) * 100);
}

   

   const nextQuestionIndex = timedStepIndices.find(
  (index) => !updatedCompleted.includes(index)
);

    if (nextQuestionIndex !== -1) {
      video.pause();
      setStepIndex(nextQuestionIndex);
      setSelectedOption(null);
      setShowFeedback(false);
      setStatus("question");
    }
  };

  const handleSubmitChoice = () => {
    if (selectedOption === null || !currentStep) return;

    const chosenOption = currentStep.options[selectedOption];

    if (chosenOption.safe) {
      setSafeCount((previous) => previous + 1);
    }

    setShowFeedback(true);
    setStatus("feedback");
  };

  const handleContinue = async () => {
    const updatedCompleted = [...completedSteps, stepIndex];
    setCompletedSteps(updatedCompleted);

    if (hasTimedQuestions) {
      const nextQuestionIndex = steps.findIndex(
        (step, index) =>
          Number.isFinite(step.triggerAt) &&
          !updatedCompleted.includes(index)
      );

      setSelectedOption(null);
      setShowFeedback(false);

      if (nextQuestionIndex !== -1) {
        setStepIndex(nextQuestionIndex);
      }

      setStatus("watching");

      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch {
          setStatus("watching");
        }
      }

      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((previous) => previous + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setStatus("question");
    } else {
      setFinished(true);
      setStatus("finished");
    }
  };

  const handleVideoEnded = () => {
    if (!hasTimedQuestions) return;

   const allQuestionsCompleted = timedStepIndices.every(
  (index) => completedSteps.includes(index)
);

    if (allQuestionsCompleted) {
      setFinished(true);
      setStatus("finished");
      return;
    }

   const nextQuestionIndex = timedStepIndices.find(
  (index) => !completedSteps.includes(index)
);

    if (nextQuestionIndex !== -1) {
      setStepIndex(nextQuestionIndex);
      setSelectedOption(null);
      setShowFeedback(false);
      setStatus("question");
    }
  };

  const handleFinish = () => {
    onComplete?.({
      scenarioId: activeScenario.id,
      score: safeCount,
      total: steps.length,
      percentage,
    });
  };

  const handleRestart = () => {
    setStepIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setSafeCount(0);
    setCompletedSteps([]);
    setFinished(false);
    setVideoError(false);

    if (hasTimedQuestions) {
      setStatus("intro");

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    } else {
      setStatus("question");
    }
  };

  /*const videoProgress =
    videoRef.current && videoRef.current.duration
      ? (videoRef.current.currentTime / videoRef.current.duration) * 100
      : 0;*/

  if (finished) {
    return (
      <section className="scenario-simulator scenario-results">
        <div className="scenario-results-card">
          <div className="scenario-results-icon">✓</div>

          <span className="scenario-eyebrow">
            MINESAFE AI · TRAINING RESULTS
          </span>

          <h1>Scenario Completed</h1>

          <p>{activeScenario.title}</p>

          <div className="scenario-final-score">
            {percentage}%
          </div>

          <h3>
            {safeCount} out of {steps.length} safe decisions
          </h3>

          <p className="scenario-result-message">
            {percentage >= 70
              ? "Great judgement! You demonstrated good safety decision-making."
              : "Review the safety feedback and practise this scenario again."}
          </p>

          <div className="scenario-results-actions">
            <button
              type="button"
              className="scenario-watch-button"
              onClick={handleFinish}
            >
              Save Completion ✓
            </button>

            <button
              type="button"
              className="scenario-secondary-button"
              onClick={handleRestart}
            >
              Try Again
            </button>

            <button
              type="button"
              className="scenario-secondary-button"
              onClick={onBack}
            >
              Back to Scenarios
            </button>

            {onOpenCourse && activeScenario.courseId && (
              <button
                type="button"
                className="scenario-secondary-button"
                onClick={() => onOpenCourse(activeScenario.courseId)}
              >
                Open Related Course
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="scenario-simulator">
      <header className="scenario-simulator-header">
        <div className="scenario-simulator-brand">
          <div className="scenario-brand-mark">MS</div>

          <div>
            <strong>MineSafe <span>AI</span></strong>
            <small>INTERACTIVE TRAINING SIMULATOR</small>
          </div>
        </div>

        <div className="scenario-simulator-header-right">
          <span className="scenario-live-indicator">
            <i /> TRAINING SESSION
          </span>

          <button
            type="button"
            className="scenario-exit-button"
            onClick={onBack}
          >
            ✕ Exit
          </button>
        </div>
      </header>

      <div className="scenario-simulator-title">
        <div>
          <span className="scenario-eyebrow">
            {activeScenario.category || "SAFETY SIMULATION"}
          </span>
          <h1>{activeScenario.title}</h1>
          <p>{activeScenario.description}</p>
        </div>

        <div className="scenario-decision-counter">
          <strong>{completedSteps.length}/{steps.length}</strong>
          <span>Decisions completed</span>
        </div>
      </div>

      <div className="scenario-split-layout">
        <div className="scenario-video-column">
          <div className="scenario-video-heading">
            <span><i /> SIMULATION VIDEO</span>
            <span>{activeScenario.duration}</span>
          </div>

          <div className="scenario-video-frame">
            {activeScenario.videoUrl && !videoError ? (
              <video
                ref={videoRef}
                className="scenario-main-video"
                src={activeScenario.videoUrl}
                controls
                playsInline
                preload="metadata"
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={handleVideoEnded}
                onError={() => setVideoError(true)}
              >
                Your browser does not support video playback.
              </video>
            ) : (
              <div className="scenario-video-unavailable">
                <span>🎬</span>
                <h3>
                  {videoError
                    ? "Video could not be loaded"
                    : "Interactive scenario"}
                </h3>
                <p>
                  {videoError
                    ? "Check the video URL and Supabase storage access."
                    : activeScenario.description}
                </p>
              </div>
            )}

            {status === "watching" && (
              <div className="scenario-video-status">
                <i /> VIDEO PLAYING
              </div>
            )}

            {status === "question" && hasTimedQuestions && (
              <div className="scenario-paused-label">
                <span>Ⅱ</span> VIDEO PAUSED · DECISION REQUIRED
              </div>
            )}
          </div>

          <div className="scenario-video-progress">
            <div style={{ width: `${videoProgress}%` }} />
          </div>

          <div className="scenario-video-caption">
            <span>Watch carefully and identify workplace hazards.</span>
            <span>
              {hasTimedQuestions ? "Interactive video" : "Decision simulation"}
            </span>
          </div>

          <div className="scenario-video-objective">
            <strong>Learning objective</strong>
            <p>
              {activeScenario.objective ||
                "Apply safe work practices and follow mine safety procedures."}
            </p>
          </div>
        </div>

        <aside className="scenario-decision-panel">
          <div className="scenario-panel-top">
            <div>
              <span className="scenario-eyebrow">MINESAFE AI</span>
              <h2>Decision Centre</h2>
            </div>

            <div className="scenario-panel-icon">✦</div>
          </div>

          <div className="scenario-panel-progress">
            <div className="scenario-panel-progress-label">
              <span>YOUR PROGRESS</span>
              <strong>{completedSteps.length} / {steps.length}</strong>
            </div>

            <div className="scenario-panel-track">
              <div
                style={{
                  width: `${
                    (completedSteps.length / Math.max(steps.length, 1)) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {status === "intro" && (
            <div className="scenario-intro-panel">
              <div className="scenario-question-number">GET READY</div>
              <h3>Before you begin</h3>
              <p>
                Watch the mining incident carefully. The video will pause
                automatically when a safety decision is required.
              </p>

              <div className="scenario-instruction">
                <strong>Your task</strong>
                <span>
                  Choose the safest action when each decision appears.
                </span>
              </div>

              <button
                type="button"
                className="scenario-watch-button"
                onClick={startVideo}
              >
                ▶ Start Simulation
              </button>
            </div>
          )}

          {status === "watching" && (
            <div className="scenario-waiting-panel">
              <div className="scenario-waiting-animation">▶</div>
              <h3>Simulation in progress</h3>
              <p>
                Watch the video carefully. MineSafe AI will pause the
                simulation when your next decision is required.
              </p>
              <div className="scenario-waiting-tag">
                WAITING FOR DECISION POINT
              </div>
            </div>
          )}

          {(status === "question" || status === "feedback") &&
            currentStep && (
              <div className="scenario-question-panel">
                <div className="scenario-question-number">
                  DECISION {stepIndex + 1} OF {steps.length}
                </div>

                <h3>{currentStep.prompt}</h3>

                <div className="scenario-options">
                  {currentStep.options.map((option, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`scenario-option ${
                        selectedOption === index ? "selected" : ""
                      } ${
                        showFeedback && option.safe ? "correct-option" : ""
                      } ${
                        showFeedback &&
                        selectedOption === index &&
                        !option.safe
                          ? "incorrect-option"
                          : ""
                      }`}
                      onClick={() => {
                        if (!showFeedback) setSelectedOption(index);
                      }}
                      disabled={showFeedback}
                    >
                      <span className="scenario-option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option.text}</span>
                      {showFeedback && option.safe && <b>✓</b>}
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div
                    className={`scenario-feedback ${
                      currentStep.options[selectedOption]?.safe
                        ? "safe"
                        : "unsafe"
                    }`}
                  >
                    <strong>
                      {currentStep.options[selectedOption]?.safe
                        ? "✓ Safe decision"
                        : "✕ Unsafe decision"}
                    </strong>

                    <p>
                      {currentStep.options[selectedOption]?.feedback}
                    </p>
                  </div>
                )}

                {!showFeedback ? (
                  <button
                    type="button"
                    className="scenario-watch-button"
                    disabled={selectedOption === null}
                    onClick={handleSubmitChoice}
                  >
                    Submit Decision →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="scenario-watch-button"
                    onClick={handleContinue}
                  >
                    {hasTimedQuestions
                      ? "Continue Video →"
                      : stepIndex === steps.length - 1
                      ? "View Results →"
                      : "Next Decision →"}
                  </button>
                )}
              </div>
            )}

          <div className="scenario-panel-footer">
            <span>✦</span>
            <p>Think safety. Make the right decision. Protect lives.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ScenarioPlayer;