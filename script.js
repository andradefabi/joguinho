const quizData = [
  {
      question: "Qual é o nome dos mascotes das olimpíadas de 2004?",
      a: "Dionísio e Àrtemis",
      b: "Hermes e Hera",
      c: "Phevos e Athena",
      d: "Ares e Poseidon",
      correct: "c",
  },
  {
      question: "Onde fica localizada a base espacial do Brasil?",
      a: "João Pessoa",
      b: "Alcântara",
      c: "Blumenau",
      d: "Aparecida de Goiania",
      correct: "b",
  },
  {
      question: "Qual o nome científico do piolho?",
      a: "siphonaptera",
      b: "phthiraptera",
      c: "anoplura",
      d: "ixodida",
      correct: "b",
  },
  {
      question: "Quantos Países tem no continente Africano?",
      a: "48",
      b: "54",
      c: "65",
      d: "39",
      correct: "b",
  },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

// Carrega a pergunta atual
function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];

  // Animação de fade quando a pergunta muda
  questionEl.classList.add('fade');
  setTimeout(() => {
      questionEl.textContent = currentQuizData.question;
      a_text.textContent = currentQuizData.a;
      b_text.textContent = currentQuizData.b;
      c_text.textContent = currentQuizData.c;
      d_text.textContent = currentQuizData.d;
      questionEl.classList.remove('fade');
  }, 300); // Tempo para a transição
}

// Desmarca todas as respostas
function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

// Obtém a resposta selecionada
function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
      if(answerEl.checked) {
          answer = answerEl.id;
      }
  });
  return answer;
}

// Animação ao submeter resposta
function answerFeedback(isCorrect) {
  const optionsContainer = document.querySelector('.options-container');
  if (isCorrect) {
      optionsContainer.classList.add('correct');
  } else {
      optionsContainer.classList.add('wrong');
  }

  // Remove a classe após um tempo para permitir nova animação
  setTimeout(() => {
      optionsContainer.classList.remove('correct', 'wrong');
  }, 500);
}

// Ao clicar no botão de submit
submitBtn.addEventListener('click', () => {
  const answer = getSelected();
  if(answer) {
      const isCorrect = answer === quizData[currentQuiz].correct;
      answerFeedback(isCorrect);

      if(isCorrect) {
          score++;
      }

      // Passa para a próxima pergunta ou mostra o resultado final
      setTimeout(() => {
          currentQuiz++;
          if(currentQuiz < quizData.length) {
              loadQuiz();
          } else {
              quiz.innerHTML = `
                  <h2 class="result-text">Você respondeu ${score}/${quizData.length} perguntas corretamente.</h2>
                  <button class="btn" onclick="location.reload()">Tentar Novamente</button>
              `;
          }
      }, 600); // Pequeno delay para permitir ver o feedback visual
  }
});

// Carrega a primeira pergunta
loadQuiz();
