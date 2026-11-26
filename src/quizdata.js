import warning from './assets/warning.jpeg'; // Make sure these match your exact file names
import hardhat from './assets/hardhat.jpeg';
import inspectionchecklist from './assets/inspectionchecklist.jpeg';

export const baselineQuestions = [
  {
    id: 1,
    question: "What does this symbol indicate?",
    image: warning, // Add the image here
    options: [
      "Prohibitory action (Do not do this)",
      "Mandatory action (You must wear this)",
      "General Warning (Caution, hazard ahead)",
      "Safe Condition (Emergency exit)"
    ],
    correctAnswer: 2 
  },
  {
    id: 2,
    question: "What does this symbol mean?",
    image: hardhat, // Add the image here
    options: [
      "Hard hats are required in this area",
      "Hard hats are prohibited",
      "Hard hats are for sale",
      "Hard hats are dangerous"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "Before operating a surface haul truck, what must be completed?",
    image: inspectionchecklist, // Add the image here
    options: [
      "A pre-start inspection checklist",
      "An oil change",
      "A call to the HR department",
      "A full engine rebuild"
    ],
    correctAnswer: 0
  }
];