import React, { useMemo, useState, useEffect } from "react";
import "./course.css";

const makeQuestion = (question, options, correctIndex, explanation) => ({
  question,
  options,
  correctIndex,
  explanation,
});

const CORE_QUESTIONS = [
  makeQuestion(
    "What is the main purpose of mine safety?",
    [
      "To increase working hours",
      "To protect workers and prevent accidents",
      "To reduce the number of supervisors",
      "To increase production only",
    ],
    1,
    "Mine safety protects workers and other people, prevents harm, and helps control risks associated with mining activities."
  ),
  makeQuestion(
    "What should you do when you identify a hazard in your work area?",
    [
      "Ignore it if nobody has been injured",
      "Wait until the end of the shift",
      "Make the area safe if possible and report it through the site procedure",
      "Ask an untrained colleague to fix it",
    ],
    2,
    "Hazards should be reported promptly. Only take corrective action when it is safe and you are authorised and competent to do so."
  ),
  makeQuestion(
    "Why should near-misses be reported?",
    [
      "They are only recorded for paperwork",
      "They help identify risks before someone is injured",
      "They prove that work is being done quickly",
      "They do not need to be reported",
    ],
    1,
    "A near-miss can reveal a weakness in a control or procedure. Reporting it helps prevent a more serious incident."
  ),
  makeQuestion(
    "What is the safest response when a task appears unsafe?",
    [
      "Continue carefully and hope nothing happens",
      "Stop or do not start the task, move to a safe position, and raise the concern",
      "Ask another worker to take the risk",
      "Remove warning signs to make the area easier to access",
    ],
    1,
    "Do not continue with work you believe is unsafe. Follow the site's stop-work and reporting arrangements."
  ),
  makeQuestion(
    "When an emergency alarm sounds, what should you do?",
    [
      "Finish the task before responding",
      "Follow the site emergency procedure and use the designated route or assembly point",
      "Go and investigate the emergency yourself",
      "Leave by any route, even if it is marked unsafe",
    ],
    1,
    "Follow the mine's emergency instructions, use designated safe routes, and report to the assigned assembly point when instructed."
  ),
];

const COURSE_QUESTIONS = {
  "introduction-to-mine-safety": [
    makeQuestion("Why are toolbox talks held before certain tasks?", ["To replace all formal training", "To discuss task hazards, controls and responsibilities", "To record production targets only", "To avoid reading safe work procedures"], 1, "A toolbox talk gives the team a chance to understand the job, its hazards and the controls before work begins."),
    makeQuestion("What is the purpose of a safe work procedure?", ["To provide an agreed safe method for doing a task", "To remove the need for supervision", "To allow workers to skip training", "To guarantee that no hazard exists"], 0, "Safe work procedures describe the approved steps and precautions for carrying out work."),
    makeQuestion("What should a worker do if they do not understand a safety instruction?", ["Guess what it means", "Copy another worker without asking", "Ask the supervisor or trainer to explain it before proceeding", "Ignore the instruction"], 2, "Workers should seek clarification and must understand the instruction before carrying out the task."),
    makeQuestion("What is the safest approach to a new or unfamiliar task?", ["Start immediately to save time", "Check the procedure, hazards, controls and required authorisation", "Let an untrained person demonstrate it", "Use the same method as a different task"], 1, "Unfamiliar work needs proper instruction, risk assessment and authorisation before it begins."),
    makeQuestion("Why must safety signs and barriers be respected?", ["They are only suggestions", "They identify hazards, restrictions or required precautions", "They are used only by visitors", "They can be moved whenever they are inconvenient"], 1, "Signs and barriers communicate important safety information and help keep people out of danger zones."),
  ],
  "personal-protective-equipment": [
    makeQuestion("How should the correct personal protective equipment (PPE) be selected?", ["Choose whatever is most comfortable", "Use the PPE specified by the task risk assessment and site rules", "Use the same equipment for every task", "Borrow equipment without checking its condition"], 1, "PPE must suit the hazards identified for the task and meet the site's requirements."),
    makeQuestion("What should you do before using a hard hat, harness or other protective item?", ["Inspect it for damage and confirm it is suitable", "Assume it is safe if it looks clean", "Modify it to fit more easily", "Remove its identification label"], 0, "Inspect PPE before use and follow the manufacturer's and site's inspection requirements."),
    makeQuestion("What should happen to damaged or defective PPE?", ["Keep using it until the shift ends", "Repair it with any materials available", "Remove it from use and report or replace it according to procedure", "Share it with another worker"], 2, "Defective PPE may not provide the intended protection and should not be used."),
    makeQuestion("Why is a correct fit important for respiratory protective equipment?", ["It makes the equipment look professional", "It helps the equipment provide the intended protection", "It removes the need for ventilation", "It allows the wearer to work in any atmosphere"], 1, "Respiratory protection must be suitable and correctly fitted; follow site fit-testing and use requirements."),
    makeQuestion("When should hearing protection be worn?", ["Only after hearing discomfort begins", "Whenever required by the noise assessment, signs or site rules", "Only when operating a vehicle", "Only during night shifts"], 1, "Use hearing protection where noise exposure controls and site instructions require it."),
  ],
  "hazard-identification": [
    makeQuestion("Which statement best describes a hazard?", ["An event that has already caused an injury", "A source or situation with the potential to cause harm", "A completed safety inspection", "A worker's job title"], 1, "A hazard is something with the potential to cause injury, illness, damage or other harm."),
    makeQuestion("What does risk generally consider?", ["Only how often a task is done", "The likelihood of harm and the severity of its consequences", "Only the cost of equipment", "The number of people on a shift"], 1, "Risk assessment considers how likely harm is and how serious the outcome could be."),
    makeQuestion("Which control is generally more reliable than relying only on PPE?", ["A warning reminder alone", "Eliminating the hazard where reasonably practicable", "Asking workers to be more careful", "Putting up a poster"], 1, "Eliminating a hazard removes the source of risk and is generally stronger than relying on individual behaviour or PPE."),
    makeQuestion("Why should a work area be reassessed when conditions change?", ["The original assessment automatically covers every change", "New conditions may introduce hazards or change the level of risk", "It is only needed after an injury", "It makes reporting unnecessary"], 1, "Changing weather, ground, equipment or work activities can change hazards and controls."),
    makeQuestion("What information is useful when reporting a hazard?", ["Its location, nature, possible consequences and any immediate action taken", "Rumours about who caused it", "Only the name of the nearest worker", "An estimate of lost production"], 0, "Clear factual details help the responsible person assess and control the hazard."),
  ],
  "emergency-response": [
    makeQuestion("What should an emergency report include?", ["Only the reporter's name", "The location, type of emergency and known immediate dangers", "A guess about who is responsible", "A production update"], 1, "Give clear, factual information so responders know where to go and what they may encounter."),
    makeQuestion("What should you do when evacuating?", ["Use the route specified by the emergency plan if it is safe", "Take an unapproved shortcut", "Return for personal belongings", "Separate from your group without informing anyone"], 0, "Use designated safe escape routes and follow the instructions of emergency personnel."),
    makeQuestion("Why must workers report to the designated assembly point?", ["To make the area look organised", "So personnel can be accounted for and missing people identified", "To avoid receiving further instructions", "To wait for transport home"], 1, "A headcount helps emergency coordinators identify who is safe and who may need assistance."),
    makeQuestion("When may a worker use a fire extinguisher?", ["Whenever a fire is visible", "Only if trained, the fire is suitable for the extinguisher, and a safe escape remains available", "Instead of raising the alarm", "When smoke blocks the exit"], 1, "Raise the alarm first. Only attempt to use an extinguisher when trained and it is safe to do so."),
    makeQuestion("What should you do after evacuating?", ["Re-enter to collect tools", "Remain at the assembly point and follow instructions", "Leave the site without checking in", "Return when the alarm becomes quiet"], 1, "Do not re-enter an affected area until authorised by the responsible emergency personnel."),
  ],
  "machinery-equipment-safety": [
    makeQuestion("What is the purpose of a pre-start inspection?", ["To identify defects before equipment is operated", "To increase engine speed", "To replace scheduled maintenance", "To avoid reporting faults"], 0, "Pre-start checks can identify defects or unsafe conditions before equipment is used."),
    makeQuestion("Why must machine guards remain in place?", ["They make machines easier to clean while running", "They help prevent contact with dangerous moving parts", "They are only required during inspections", "They reduce the need for training"], 1, "Guards are safety controls that help prevent access to moving or hazardous machine parts."),
    makeQuestion("What is the key purpose of lockout/tagout procedures?", ["To reserve a machine for one department", "To control hazardous energy and prevent unexpected start-up during work", "To show that maintenance is finished", "To speed up production"], 1, "Isolation and lockout/tagout protect workers from unexpected energisation or release of stored energy."),
    makeQuestion("What should an operator do if a machine develops an unusual noise or vibration?", ["Continue until the next scheduled break", "Stop safely, isolate if required, and report the fault", "Remove the guard to inspect moving parts", "Ask a nearby worker to hold the machine"], 1, "Unusual operation may indicate a defect. Stop and report it using the site's procedure."),
    makeQuestion("Who should operate specialised mining equipment?", ["Anyone who has watched it being used", "A person who is trained, competent and authorised", "Any worker on the same shift", "A visitor accompanied by a colleague"], 1, "Only trained, competent and authorised people should operate specialised equipment."),
  ],
  "underground-open-pit-hazards": [
    makeQuestion("Why is ground-control monitoring important in underground workings and open pits?", ["It helps identify unstable ground and reduce collapse or rockfall risk", "It replaces the need for communication", "It guarantees that ground conditions never change", "It is only needed after a collapse"], 0, "Ground conditions can change. Monitoring and following ground-control instructions help manage instability."),
    makeQuestion("What should workers do if they notice fresh cracks, falling rocks or unusual ground movement?", ["Continue working if the area is quiet", "Move to a safe area and report it immediately", "Stand beneath the affected area to inspect it", "Remove supports without authorisation"], 1, "Signs of instability must be treated seriously; keep clear and report them under site procedures."),
    makeQuestion("Why is ventilation essential in underground mining?", ["It only reduces temperature", "It supplies suitable air and helps control airborne contaminants and gases", "It removes the need for gas monitoring", "It is mainly for equipment cooling"], 1, "Ventilation helps maintain a safe atmosphere by supplying air and controlling contaminants, subject to monitoring and site controls."),
    makeQuestion("What is important when working near an open-pit edge?", ["Parking as close to the edge as possible", "Following edge protection, berm, exclusion-zone and traffic rules", "Driving across marked barriers", "Relying only on visibility"], 1, "Follow the mine's edge protection and traffic-management requirements and stay within designated safe areas."),
    makeQuestion("Why must mine traffic routes and pedestrian areas be followed?", ["To keep vehicles moving at maximum speed", "To reduce the risk of vehicle-person and vehicle-vehicle collisions", "To make journeys longer", "To avoid using radios"], 1, "Traffic-management controls separate people and vehicles and reduce collision risk."),
  ],
  "first-aid-incident-reporting": [
    makeQuestion("What should be checked before approaching an injured person?", ["Whether the scene is safe for you and others", "Whether a camera is available", "Whether the shift has ended", "Whether the injured person can stand"], 0, "Do not become another casualty. Check for hazards and follow emergency procedures before approaching."),
    makeQuestion("Who should provide first aid at a mine site?", ["Anyone who has watched a first-aid video", "A person with the appropriate training and authorisation", "Only the injured person's colleague", "The first person to arrive, regardless of training"], 1, "First aid should be provided within the responder's training and site arrangements."),
    makeQuestion("What is a suitable action for serious bleeding while waiting for trained help?", ["Ignore it until a medic arrives", "Follow first-aid training, including applying direct pressure where appropriate", "Give the person food and water", "Move the person repeatedly"], 1, "Follow your first-aid training and emergency instructions; seek urgent medical assistance."),
    makeQuestion("What should an incident report contain?", ["Factual details such as time, location, events and witnesses", "Personal opinions and blame", "Only the name of the supervisor", "Unverified rumours"], 0, "Reports should be timely, accurate and factual so the incident can be investigated properly."),
    makeQuestion("Why should an incident scene be preserved when safe and practicable?", ["To prevent people from learning what happened", "To help a proper investigation identify causes and contributing factors", "To delay emergency treatment", "To avoid completing records"], 1, "Preserving relevant evidence supports learning and investigation, provided it does not delay emergency response or create further danger."),
  ],
  "environmental-safety": [
    makeQuestion("What should you do if you discover a chemical or fuel spill?", ["Wash it into a drain", "Keep clear if unsafe, report it and follow the site's spill procedure", "Cover it with ordinary rubbish", "Wait until the end of the shift"], 1, "Spills should be reported and managed using the site's response procedure by trained and equipped personnel."),
    makeQuestion("Why should mining waste be segregated and disposed of correctly?", ["To make storage areas look full", "To reduce pollution and ensure waste is handled appropriately", "To avoid labelling containers", "To mix incompatible materials"], 1, "Correct segregation and disposal help prevent contamination and support regulatory and site requirements."),
    makeQuestion("What is a good practice when handling hazardous substances?", ["Use unlabelled containers", "Follow the safety information, labelling and approved handling procedure", "Mix products to save storage space", "Work without required protective controls"], 1, "Use the substance information and site procedures to understand hazards, controls, storage and emergency actions."),
    makeQuestion("How can dust exposure and dust release be controlled?", ["Ignore visible dust", "Use the approved dust-suppression and exposure-control measures", "Sweep dry dust into the air", "Disable extraction systems"], 1, "Use the site's engineered and administrative dust controls and report failures."),
    makeQuestion("What should be done if a control designed to protect a watercourse fails?", ["Continue the activity", "Report the failure promptly and follow environmental response instructions", "Hide the evidence", "Dilute any discharge without permission"], 1, "Prompt reporting allows the site to contain the issue and prevent further environmental harm."),
  ],
  "working-at-heights-confined-spaces": [
    makeQuestion("What should be considered before work at height begins?", ["Whether the work can be done from a safer location and what fall controls are required", "Whether the worker can finish quickly", "Whether a harness is available, without inspecting it", "Whether the area is quiet"], 0, "Plan work at height to avoid it where possible and use suitable fall-prevention or fall-protection controls."),
    makeQuestion("What should be checked before using a fall-arrest harness?", ["Only its colour", "Its condition, suitability, fit and inspection status under site procedure", "Whether it can be tied to any nearby object", "Whether another worker used it yesterday"], 1, "Harnesses and associated equipment must be suitable, inspected and used with approved anchorages and procedures."),
    makeQuestion("What is required before entering a permit-controlled confined space?", ["A colleague's verbal approval only", "The required permit, isolation, atmospheric checks and entry controls", "A torch and a mobile phone only", "A quick visual check from the entrance"], 1, "Confined-space entry requires the site's formal controls, which may include a permit, isolation and atmospheric testing."),
    makeQuestion("What is the role of a confined-space attendant?", ["To enter the space whenever a worker calls", "To remain outside, monitor the entry and follow the communication and emergency plan", "To leave once the entrant starts work", "To operate unrelated equipment"], 1, "The attendant supports safe entry by maintaining communication and following the entry and rescue arrangements."),
    makeQuestion("What should you do if a person collapses inside a confined space?", ["Enter immediately to pull them out", "Raise the alarm and activate the planned rescue response; do not enter unless trained and authorised under the rescue plan", "Wait until the shift supervisor arrives", "Switch off communication equipment"], 1, "Unplanned rescue entry can create additional casualties. Activate the site's confined-space rescue procedure."),
  ],
  "explosives-blasting-awareness": [
    makeQuestion("Who may handle or use explosives at a mine?", ["Any worker who has completed general induction", "Only appropriately trained, competent and authorised personnel", "Any worker supervised by a colleague", "Visitors accompanied by security"], 1, "Explosives work is restricted to properly qualified and authorised personnel under applicable law and site rules."),
    makeQuestion("What should workers do when a blast warning or exclusion procedure begins?", ["Enter the area to collect tools", "Clear the area and follow the designated blast-clearance instructions", "Stand behind the nearest vehicle", "Ignore the warning if the blast is delayed"], 1, "Follow the blast exclusion, warning, clearance and all-clear procedures exactly."),
    makeQuestion("What should you do if you suspect a misfire?", ["Approach and inspect the blast area", "Keep clear, prevent access and report it to the authorised blasting personnel", "Move the suspected material", "Resume work when the noise stops"], 1, "A suspected misfire is extremely hazardous. Do not approach or touch anything; follow the site's misfire procedure."),
    makeQuestion("Why must explosives be stored and transported under approved controls?", ["To make them easier to access", "To reduce the risk of unintended initiation and ensure compatibility and security", "To avoid record keeping", "To allow storage with any other materials"], 1, "Approved storage and transport controls protect people and prevent unintended initiation or unauthorised access."),
    makeQuestion("What should non-blasting workers do if they find an item they believe may be an explosive or detonator?", ["Pick it up and move it to the supervisor", "Do not touch it; keep others away and report it immediately", "Place it in a toolbox", "Take a photograph from close range"], 1, "Never handle suspected explosives. Keep clear, prevent access if safe, and notify authorised personnel."),
  ],
};

const GENERAL_FALLBACK_QUESTIONS = [
  ...CORE_QUESTIONS,
  makeQuestion("What is the safest way to respond to a warning sign or barrier?", ["Ignore it if the route looks clear", "Follow it and do not enter a restricted area without authorisation", "Move it out of the way", "Ask a visitor what it means"], 1, "Warning signs and barriers identify hazards and restricted areas. Follow site instructions."),
  makeQuestion("Why should safety equipment and controls be checked regularly?", ["To identify defects before protection is needed", "To make inspections take longer", "To avoid recording faults", "To remove the need for training"], 0, "Checks help confirm that equipment and protective controls remain fit for use."),
  makeQuestion("What should you do if you are fatigued and believe it may affect safe work?", ["Hide it from the supervisor", "Follow the site's fatigue-management and reporting procedure", "Operate equipment more quickly", "Skip breaks"], 1, "Fatigue can affect attention and judgement. Report concerns and follow the site's controls."),
  makeQuestion("What is the best approach to a safety instruction you do not understand?", ["Guess and proceed", "Ask an authorised person for clarification before starting", "Ignore it", "Ask someone who is not familiar with the task"], 1, "Workers should understand the instruction and task controls before beginning work."),
  makeQuestion("Why is good housekeeping important in a mine?", ["It only improves appearance", "It helps prevent slips, trips, fires and access obstructions", "It replaces machine guarding", "It removes all workplace hazards"], 1, "Good housekeeping reduces common hazards and keeps walkways and emergency access clear."),
];

function getCorrectIndex(item) {
  if (Number.isInteger(item?.correctIndex)) return item.correctIndex;
  if (Number.isInteger(item?.correctAnswer)) return item.correctAnswer;
  if (Number.isInteger(item?.answerIndex)) return item.answerIndex;
  return 0;
}

function isUsableQuestion(item) {
  return Boolean(
    item &&
      typeof item.question === "string" &&
      item.question.trim() &&
      Array.isArray(item.options) &&
      item.options.length >= 2
  );
}

function buildQuestionSet(course, lesson) {
  const lessonQuestions =
    Array.isArray(lesson?.quiz) && lesson.quiz.length
      ? lesson.quiz
      : Array.isArray(lesson?.questions) && lesson.questions.length
        ? lesson.questions
        : [];

  const assessmentLesson = course?.lessons?.find(
    (item) =>
      item.type === "assessment" &&
      (Array.isArray(item.quiz) || Array.isArray(item.questions))
  );

  const courseQuestions =
    assessmentLesson?.quiz?.length
      ? assessmentLesson.quiz
      : assessmentLesson?.questions?.length
        ? assessmentLesson.questions
        : [];

  const suppliedQuestions = lessonQuestions.length
    ? lessonQuestions
    : courseQuestions;

  const courseKey = String(course?.id || "")
    .trim()
    .toLowerCase();
  const courseBank = COURSE_QUESTIONS[courseKey] || GENERAL_FALLBACK_QUESTIONS;

  const seen = new Set();
  const combined = [...suppliedQuestions, ...courseBank, ...GENERAL_FALLBACK_QUESTIONS]
    .filter(isUsableQuestion)
    .filter((item) => {
      const key = item.question.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  // Every course assessment contains 10 questions. Existing course questions
  // are retained first, then relevant course questions fill any remaining slots.
  return combined.slice(0, 10);
}

function CourseAssessment({ course, lesson, onComplete, onBack }) {
  const questions = useMemo(
    () => buildQuestionSet(course, lesson),
    [course, lesson]
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setFinished(false);
  }, [course?.id, lesson?.id]);

  const question = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length
    ? (answeredCount / questions.length) * 100
    : 0;

  const handleAnswer = (index) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: index,
    }));
  };

  const calculateScore = () =>
    questions.reduce(
      (total, item, index) =>
        total + (answers[index] === getCorrectIndex(item) ? 1 : 0),
      0
    );

  const goToNextQuestion = () => {
    if (answers[currentQuestion] === undefined) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      setFinished(true);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setFinished(false);
  };

  if (!question) {
    return (
      <section className="course-assessment assessment-shell">
        <div className="assessment-empty-state">
          <span className="assessment-empty-icon">!</span>
          <h2>Assessment unavailable</h2>
          <p>There are no valid questions available for this assessment.</p>
          <button type="button" className="assessment-secondary-button" onClick={onBack}>
            Back to course
          </button>
        </div>
      </section>
    );
  }

  if (finished) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <section className="course-assessment assessment-shell">
        <div className="assessment-result-page">
          <div className="assessment-result-heading">
            <span className="assessment-eyebrow">MINESAFE AI · COURSE ASSESSMENT</span>
            <h1>Assessment completed</h1>
            <p>
              You have finished the knowledge check for{" "}
              <strong>{course?.title || lesson?.title || "this course"}</strong>.
            </p>
          </div>

          <div className="assessment-result-card">
            <div
              className={`assessment-score-ring ${passed ? "is-pass" : "is-retry"}`}
              style={{ "--score-angle": `${percentage * 3.6}deg` }}
              role="img"
              aria-label={`Your score is ${percentage} percent`}
            >
              <div className="assessment-score-inner">
                <strong>{percentage}%</strong>
                <span>YOUR SCORE</span>
              </div>
            </div>

            <div className="assessment-result-copy">
              <span className={`assessment-status ${passed ? "pass" : "retry"}`}>
                {passed ? "PASS MARK ACHIEVED" : "MORE PRACTICE NEEDED"}
              </span>
              <h2>{passed ? "Well done!" : "Keep building your knowledge."}</h2>
              <p>
                You answered <strong>{score} out of {questions.length}</strong>{" "}
                questions correctly. The pass mark is 70%.
              </p>
              <div className="assessment-result-stats">
                <div>
                  <strong>{score}</strong>
                  <span>Correct</span>
                </div>
                <div>
                  <strong>{questions.length - score}</strong>
                  <span>Incorrect</span>
                </div>
                <div>
                  <strong>{questions.length}</strong>
                  <span>Total</span>
                </div>
              </div>
            </div>
          </div>

          <div className="assessment-review-panel">
            <div className="assessment-review-heading">
              <div>
                <span className="assessment-eyebrow">LEARNING SUMMARY</span>
                <h2>Review your answers</h2>
                <p>Use the explanations to reinforce the key safety points.</p>
              </div>
              <span className="assessment-review-count">{questions.length} QUESTIONS</span>
            </div>

            <div className="assessment-review-list">
              {questions.map((item, index) => {
                const correctIndex = getCorrectIndex(item);
                const isCorrect = answers[index] === correctIndex;

                return (
                  <article
                    className={`assessment-review-item ${isCorrect ? "review-correct" : "review-incorrect"}`}
                    key={`${index}-${item.question}`}
                  >
                    <div className="assessment-review-item-top">
                      <span>QUESTION {String(index + 1).padStart(2, "0")}</span>
                      <strong>{isCorrect ? "✓ Correct" : "✕ Review this answer"}</strong>
                    </div>
                    <h3>{item.question}</h3>
                    <p className="assessment-review-answer">
                      <span>Your answer</span>
                      {item.options[answers[index]] ?? "No answer selected"}
                    </p>
                    {!isCorrect && (
                      <p className="assessment-review-answer correct-answer">
                        <span>Correct answer</span>
                        {item.options[correctIndex]}
                      </p>
                    )}
                    {item.explanation && (
                      <p className="assessment-review-explanation">{item.explanation}</p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          <div className="assessment-result-actions">
            {!passed && (
              <button
                type="button"
                className="assessment-secondary-button"
                onClick={restartAssessment}
              >
                Retake assessment
              </button>
            )}
            <button
              type="button"
              className="assessment-primary-button"
              onClick={() =>
                onComplete?.({
                  courseId: course?.id,
                  lessonId: lesson?.id,
                  score,
                  total: questions.length,
                  percentage,
                  passed,
                })
              }
            >
              Finish assessment <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="course-assessment assessment-shell">
      <div className="assessment-topbar">
        <button
          type="button"
          className="assessment-back-button"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span> Back to course
        </button>
        <span className="assessment-topbar-label">MINESAFE AI LEARNING CENTRE</span>
      </div>

      <header className="assessment-page-header">
        <div>
          <span className="assessment-eyebrow">KNOWLEDGE CHECK</span>
          <h1>{lesson?.title || course?.title || "Course Assessment"}</h1>
          <p>
            Test your understanding of the key safety principles covered in this course.
            Choose the best answer for each question.
          </p>
        </div>
        <div className="assessment-header-badge">
          <span aria-hidden="true">✦</span>
          <strong>{questions.length}</strong>
          <small>Questions</small>
        </div>
      </header>

      <div className="assessment-progress-card">
        <div className="assessment-progress-top">
          <div>
            <span className="assessment-progress-caption">YOUR PROGRESS</span>
            <strong>{answeredCount} of {questions.length} answered</strong>
          </div>
          <span className="assessment-progress-percent">{Math.round(progress)}%</span>
        </div>
        <div className="assessment-progress-track" aria-label={`${Math.round(progress)} percent answered`}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="assessment-workspace">
        <main className="assessment-question-panel">
          <div className="assessment-question-meta">
            <span>QUESTION {String(currentQuestion + 1).padStart(2, "0")}</span>
            <span>{questions.length} TOTAL</span>
          </div>

          <div className="assessment-question-countline">
            <span className="assessment-question-number">
              {String(currentQuestion + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="assessment-question-kicker">SELECT ONE ANSWER</span>
              <h2>{question.question}</h2>
            </div>
          </div>

          <div className="assessment-options-list">
            {question.options.map((option, index) => {
              const selected = answers[currentQuestion] === index;

              return (
                <button
                  type="button"
                  key={`${currentQuestion}-${index}`}
                  className={`assessment-option ${selected ? "is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => handleAnswer(index)}
                >
                  <span className="assessment-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="assessment-option-text">{option}</span>
                  <span className="assessment-option-indicator" aria-hidden="true">
                    {selected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="assessment-question-footer">
            <button
              type="button"
              className="assessment-secondary-button"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((previous) => Math.max(0, previous - 1))}
            >
              ← Previous
            </button>
            <button
              type="button"
              className="assessment-primary-button"
              disabled={answers[currentQuestion] === undefined}
              onClick={goToNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Submit assessment"
                : "Next question"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </main>

        <aside className="assessment-side-panel">
          <div className="assessment-side-card assessment-question-map">
            <div className="assessment-side-heading">
              <div>
                <span className="assessment-eyebrow">ASSESSMENT</span>
                <h3>Question map</h3>
              </div>
              <span className="assessment-map-count">{answeredCount}/{questions.length}</span>
            </div>
            <div className="assessment-question-dots">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isCurrent = currentQuestion === index;

                return (
                  <button
                    type="button"
                    key={index}
                    className={[
                      "assessment-question-dot",
                      isAnswered ? "is-answered" : "",
                      isCurrent ? "is-current" : "",
                    ].filter(Boolean).join(" ")}
                    aria-label={`Go to question ${index + 1}${isAnswered ? ", answered" : ""}`}
                    aria-current={isCurrent ? "step" : undefined}
                    disabled={index > currentQuestion && !isAnswered}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="assessment-map-legend">
              <span><i className="answered-key" /> Answered</span>
              <span><i className="current-key" /> Current</span>
              <span><i className="unanswered-key" /> Remaining</span>
            </div>
          </div>

          <div className="assessment-side-card assessment-guidance-card">
            <span className="assessment-guidance-icon" aria-hidden="true">◎</span>
            <h3>Before you submit</h3>
            <p>
              Read each question carefully. You can revisit previous questions and
              change your answer before submitting.
            </p>
          </div>

          <div className="assessment-side-note">
            <span aria-hidden="true">✦</span>
            <p>Safety knowledge helps you make safer decisions on site. Take your time.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CourseAssessment;
