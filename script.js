const questions = [
  { text: "PRÓBY DEFINIOWANIA SZTUKI", answer: "XVII wiek" },
  { text: "ŚREDNIOWIECZE - PODZIAŁ SZTUKI NA MECHANICZNĄ I WYZWOLONĄ", answer: "Średniowiecze" },
  { text: "MALARSTWO, RZEŹBA, ARCHITEKTURA JAKO SZTUKI MECHANICZNE", answer: "XVI wiek" },
  { text: "VASARI - SCALANIE POJĘCIOWE SZTUKI", answer: "XVI wiek" },
  { text: "POWRÓT MIMESIS", answer: "XVI wiek" },
  { text: "ACCADEMIA DELLE ARTI DEL DISEGNO - FLORENCJA", answer: "1563" },
  { text: "ACCADEMIA DI SAN LUCA - RZYM", answer: "1577" },
  { text: "ACADEMIE ROYALE DE PEINTURE ET DE SCULPTURE - PARYŻ", answer: "1648" },
  { text: "WSZYSTKIE SZTUKI ZJEDNOCZONE", answer: "XVII wiek" },
  { text: "CHARLES BATTEUX - SZTUKI PIĘKNE", answer: "1747" },
  { text: "WYNALAZEK FOTOGRAFII", answer: "1839" },
  { text: "WYNALAZEK TALBOTYPII", answer: "1835" },
  { text: "KSIĄŻKI KSYLOGRAFICZNE", answer: "1475" },
  { text: "KOLOROWY DRZEWORYT", answer: "XVI wiek" },
  { text: "DRZEWORYT SZTORCOWY", answer: "XVIII wiek" },
  { text: "ROZPOWSZECHNIENIE PAPIERU", answer: "XV wiek" },
  { text: "DRZEWORYT SZTORCOWY - TOMAS BEWICK", answer: "1771" },
  { text: "MIEDZIORYT", answer: "XV wiek" },
  { text: "LE BOIS PROTAT - NAJSTARSZY DRZEWORYT WE FRANCJI", answer: "1370" },
  { text: "ŚW KRZYSZTOF - NAJSTARSZY DRZEWORYT", answer: "1423" },
  { text: "WYNALEZIENIE CZCIONKI - GUTENBERG", answer: "1455" },
  { text: "KRONIKA ŚWIATA - SCHEDL", answer: "1493" },
  { text: "EN CAMAEU", answer: "1510" },
  { text: "PIERWSZY DRZEWORYT ŚWIATŁOCIENIOWY", answer: "1510" }
];

function isYear(value) {
  return /^\d{3,4}$/.test(value);
}


const answersPool = [
  "Średniowiecze", "XIV wiek", "XV wiek", "XVI wiek", "XVII wiek", "XVIII wiek", "XIX wiek",
  "1370", "1423", "1455", "1475", "1493", "1510", "1563", "1577", "1648", "1747", "1771", "1835", "1839"
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let shuffledQuestions = [];

function startQuiz() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.innerText = "Następne";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.text;

  const correctAnswer = currentQuestion.answer;
  const options = shuffleArray([
    correctAnswer,
    ...getRandomAnswers(correctAnswer)
  ]);

  options.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, correctAnswer));
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(button, correctAnswer) {
  const selectedAnswer = button.innerText;
  const buttons = answerButtonsElement.children;

  for (let btn of buttons) {
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  }

  if (selectedAnswer === correctAnswer) {
    console.log("Poprawna odpowiedź");
  }

  nextButton.style.display = "block";
}

function getRandomAnswers(correctAnswer) {
  const isCorrectYear = isYear(correctAnswer);
  const filteredPool = answersPool.filter(a => isYear(a) === isCorrectYear && a !== correctAnswer);
  const shuffled = filteredPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}



function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    questionElement.innerText = "Koniec quizu! Odśwież stronę, aby zagrać ponownie.";
    nextButton.style.display = "none";
    resetState();
  }
});

startQuiz();
