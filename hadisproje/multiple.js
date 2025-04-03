const allQuestions = {
    easy: [
      {
        question: "Bir hadisteki rivayet zincirine ne ad verilir?",
        options: ["İsnad", "Metn", "Sahih", "Daif"],
        correctAnswer: "İsnad",
        explanation: "İsnad, bir hadisin aktarıldığı râviler zincirini ifade eder."
      },
      {
        question: "Hadislerin metin veya içerik kısmına ne ad verilir?",
        options: ["İsnad", "Metn", "Ravi", "Sened"],
        correctAnswer: "Metn",
        explanation: "Metin, Hz. Muhammed'e (s.a.v.) atfedilen söz, davranış veya onayları içeren hadisin gerçek metni veya içeriğidir."
      },
      {
        question: "Hadis alanında geniş çapta tanınan kaç büyük koleksiyoncu var?",
        options: ["Altı", "Dört", "Dokuz", "Beş"],
        correctAnswer: "Altı",
        explanation: "The six major collectors of Hadith are Bukhari, Muslim, Abu Dawood, Tirmidhi, An-Nasa'i, and Ibn Majah."
      }
    ],
    medium: [
      {
        question: "Hangi Hadis koleksiyonu en sahih olarak kabul edilir?",
        options: ["Sahih Buhari", "Sünen Ebu Davud", "Muvatta Malik", "Müsned Ahmed"],
        correctAnswer: "Sahih Buhari",
        explanation: "Sahih Buhari, Sünni Müslümanların çoğunluğu tarafından en sahih Hadis koleksiyonu olarak kabul edilir."
      },
      {
        question: "Doğrudan Allah'a atfedilen bir hadise ne denir?",
        options: ["Hadis Kudsi", "Hadis Sahih", "Hadis Mürsel", "Hadis Mütevatir"],
        correctAnswer: "Hadis Kudsi",
        explanation: "Hadis Kudsi, Hz. Muhammed'in (S.A.V.) Allah'ın sözlerini aktardığı sözleridir."
        },
        {
        question: "Çok sayıda anlatıcı tarafından rivayet edilen bir hadisi tanımlayan terim hangisidir?",
        options: ["Mütevatir", "Ehad", "Mevdu", "Garib"],
        correctAnswer: "Mütevatir",
        explanation: "Mütevatir, çok sayıda anlatıcı tarafından rivayet edilen ve makul bir şekilde yanlış veya uydurma olamayacak bir hadisi ifade eder."
        }
    ],
    hard: [
      {
        question: "Sahabe seviyesinde zinciri kopmuş bir hadis için terim nedir?",
        options: ["Mürsel", "Munkati", "Mu'allak", "Mudallas"],
        correctAnswer: "Mürsel",
        explanation: "Mürsel, bir Tabiî'nin (Tabi'î) Sahabe'den bahsetmeden doğrudan Hz. Peygamber'den (S.A.V.) alıntı yaptığı bir hadisi ifade eder."
        },
        {
        question: "Sadece sahih hadislere adanmış bir kitap derleyen ilk kişi kimdir?",
        options: ["İmam Buhari", "İmam Malik", "İmam Müslim", "İmam Şafii"],
        correctAnswer: "İmam Buhari",
        explanation: "İmam Muhammed el-Buhari, Sahih Buhari olarak bilinen, sadece sahih hadislere adanmış bir kitap derleyen ilk kişidir."
        
        },
        {
        question: "Hadis tahkiki çalışmasına ne ad verilir?",
        options: ["İlm al-Cerh ve't-Ta'dil", "İlm al-Hadis", "İlm al-Rijal", "İlm al-Mustalah"],
        correctAnswer: "İlm al-Cerh ve't-Ta'dil",
        explanation: "İlm al-Cerh ve't-Ta'dil, hadis ravilerinin güvenilirliğini inceleyen bilimdir."
        }
    ]
  };
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 30;
  let quizStarted = false;
  let selectedAnswer = null;
  let timerInterval = null;
  
  const quizContainer = document.getElementById('quiz-container');
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultsScreen = document.getElementById('results-screen');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const timerElement = document.getElementById('timer');
  const answerFeedback = document.getElementById('answer-feedback');
  const explanationText = document.getElementById('explanation-text');
  const submitAnswerButton = document.getElementById('submit-answer');
  const nextQuestionButton = document.getElementById('next-question');
  const seeResultsButton = document.getElementById('see-results');
  const retryButton = document.getElementById('retry-button');
  const difficultyButtons = document.querySelectorAll('.difficulty-button');
  const startQuizButton = document.getElementById('start-quiz-button');
  
  let currentQuestions = allQuestions.medium;  // Default difficulty is medium
  
  function startQuiz() {
    quizStarted = true;
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    loadQuestion();
    startTimer();
  }
  
  function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => handleOptionClick(option));
      optionsContainer.appendChild(optionElement);
    });
  }
  
  function handleOptionClick(option) {
    selectedAnswer = option;
    const options = document.querySelectorAll('.option');
    options.forEach(optionElement => {
      optionElement.style.backgroundColor = optionElement.textContent === option ? '#bbdefb' : '#e3f2fd';
    });
  }
  
  function submitAnswer() {
    const correctAnswer = currentQuestions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      score++;
    }
  
    answerFeedback.style.display = 'block';
    explanationText.textContent = currentQuestions[currentQuestionIndex].explanation;
  
    submitAnswerButton.style.display = 'none';
    nextQuestionButton.style.display = 'inline-block';
    if (currentQuestionIndex === currentQuestions.length - 1) {
      nextQuestionButton.textContent = 'See Results';
    }
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      loadQuestion();
      answerFeedback.style.display = 'none';
      submitAnswerButton.style.display = 'inline-block';
      nextQuestionButton.style.display = 'none';
      selectedAnswer = null;
    } else {
      showResults();
    }
  }
  
  function showResults() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    const percentage = (score / currentQuestions.length) * 100;
    let resultText = '';
    if (percentage >= 80) {
      resultText = `Mükemmel! Hadis ilminde çok güçlü bir anlayışınız var.`;
    } else if (percentage >= 60) {
      resultText = `Güzel iş! Hadis ilminde sağlam bir temeliniz var.`;
    } else {
      resultText = `Öğrenmeye devam edin! Hadis hakkında keşfedilecek daha çok şey var.`;
    }
  
    document.getElementById('results-text').textContent = `You scored ${score} out of ${currentQuestions.length}. ${resultText}`;
  }
  
  function retryQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 30;
    resultsScreen.style.display = 'none';
    startScreen.style.display = 'block';
  }
  
  difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
      difficultyButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentQuestions = allQuestions[button.getAttribute('data-difficulty')];
    });
  });
  
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
      } else {
        clearInterval(timerInterval);
        submitAnswer();
      }
    }, 1000);
  }
  
  startQuizButton.addEventListener('click', startQuiz);
  submitAnswerButton.addEventListener('click', submitAnswer);
  nextQuestionButton.addEventListener('click', nextQuestion);
  retryButton.addEventListener('click', retryQuiz);