import { useState } from 'react';
import { baselineQuestions } from './quizData.js';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase.js';

export default function Quiz({ onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error

  const saveResult = async (finalScore) => {
    const user = auth.currentUser;
    if (!user) {
      setSaveStatus('error');
      return;
    }

    setSaveStatus('saving');
    try {
      await addDoc(collection(db, 'quizResults'), {
        uid: user.uid,
        email: user.email,
        score: finalScore,
        total: baselineQuestions.length,
        passed: finalScore >= 2,
        createdAt: serverTimestamp(),
      });
      setSaveStatus('saved');
    } catch (err) {
      console.error('Error saving quiz result:', err);
      setSaveStatus('error');
    }
  };

  const handleAnswerClick = (selectedIndex) => {
    const isCorrect =
      selectedIndex === baselineQuestions[currentQuestionIndex].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < baselineQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
      saveResult(newScore);
    }
  };

  if (showResult) {
    const passed = score >= 2;
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Assessment Complete!</h2>
        <h3>
          Your Score: {score} / {baselineQuestions.length}
        </h3>

        {passed ? (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            PASSED! Your profile has been flagged for HR review.
          </p>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            FAILED. You need to score at least 2/3 to pass.
          </p>
        )}

        {saveStatus === 'error' && (
          <p style={{ color: 'orange' }}>
            (Note: your result could not be saved.)
          </p>
        )}

        <button
          onClick={onFinish}
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            cursor: 'pointer',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = baselineQuestions[currentQuestionIndex];

  return (
    <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
      <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        Question {currentQuestionIndex + 1} of {baselineQuestions.length}
      </h3>

      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {currentQuestion.question}
      </p>

      {currentQuestion.image && (
        <img
          src={currentQuestion.image}
          alt="Safety symbol"
          style={{ display: 'block', maxWidth: '200px', margin: '15px auto' }}
        />
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            style={{
              padding: '15px',
              textAlign: 'left',
              backgroundColor: '#f3f4f6',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: '0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}