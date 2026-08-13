// ======================================================
// どこかわクイズ ～Aha!Experience～
// app.js
// ======================================================


// ======================================================
// 基本設定
// ======================================================

const OBSERVE_TIME = 8000;
const CHANGE_TIME = 12000;
const ANSWER_TIME = 20000;

const CORRECT_DISPLAY_TIME = 1500;
const WRONG_DISPLAY_TIME = 700;

const INITIAL_LIVES = 3;


// ======================================================
// DOM
// ======================================================

const titleScreen =
  document.getElementById("titleScreen");

const historyScreen =
  document.getElementById("historyScreen");

const gameScreen =
  document.getElementById("gameScreen");

const gameOverScreen =
  document.getElementById("gameOverScreen");


const soundButton =
  document.getElementById("soundButton");

const gameStartButton =
  document.getElementById("gameStartButton");

const historyButton =
  document.getElementById("historyButton");

const historyBackButton =
  document.getElementById("historyBackButton");

const gameOverBackButton =
  document.getElementById("gameOverBackButton");


const questionNumber =
  document.getElementById("questionNumber");

const lifeDisplay =
  document.getElementById("lifeDisplay");

const guideMessage =
  document.getElementById("guideMessage");

const imageStage =
  document.getElementById("imageStage");

const imageCover =
  document.getElementById("imageCover");

const baseImage =
  document.getElementById("baseImage");

const changeImage =
  document.getElementById("changeImage");

const answerMarkerLayer =
  document.getElementById("answerMarkerLayer");


const progressArea =
  document.getElementById("progressArea");

const progressBar =
  document.getElementById("progressBar");


const resultMessage =
  document.getElementById("resultMessage");

const questionStartButton =
  document.getElementById("questionStartButton");


const historyBest =
  document.getElementById("historyBest");

const historyPlays =
  document.getElementById("historyPlays");


const gameOverTitle =
  document.getElementById("gameOverTitle");

const currentScoreResult =
  document.getElementById("currentScoreResult");

const bestScoreResult =
  document.getElementById("bestScoreResult");


// ======================================================
// 音
// ======================================================

const sounds = {
  start:
    document.getElementById("startSound"),

  correct:
    document.getElementById("correctSound"),

  wrong:
    document.getElementById("wrongSound"),

  gameover:
    document.getElementById("gameOverSound")
};


// ======================================================
// ゲーム状態
// ======================================================

let gameState = "title";

let lives = INITIAL_LIVES;

let score = 0;

let questionCount = 0;


// 現在の問題
let currentQuestion = null;
let currentVariant = null;


// 1周分の問題順
let questionQueue = [];


// 各問題で使用済みの変化パターン
const usedVariants = {};


// タイマー
let stateTimeout = null;

let answerAnimationFrame = null;

let answerStartTime = 0;


// 不正解演出中
let wrongLocked = false;


// 音設定
let soundEnabled =
  localStorage.getItem(
    "dokokawaSound"
  ) !== "off";


// ======================================================
// 初期化
// ======================================================

initialize();


function initialize() {

  updateSoundButton();

  updateHistoryDisplay();

  showScreen("title");

}


// ======================================================
// 画面遷移
// ======================================================

function showScreen(name) {

  [
    titleScreen,
    historyScreen,
    gameScreen,
    gameOverScreen
  ].forEach(screen => {

    screen.classList.remove("active");

  });


  if (name === "title") {

    titleScreen.classList.add("active");

  }


  if (name === "history") {

    historyScreen.classList.add("active");

  }


  if (name === "game") {

    gameScreen.classList.add("active");

  }


  if (name === "gameover") {

    gameOverScreen.classList.add("active");

  }

}


// ======================================================
// タイトル
// ======================================================

gameStartButton.addEventListener(
  "click",
  startNewGame
);


historyButton.addEventListener(
  "click",
  () => {

    updateHistoryDisplay();

    gameState = "history";

    showScreen("history");

  }
);


historyBackButton.addEventListener(
  "click",
  returnToTitle
);


gameOverBackButton.addEventListener(
  "click",
  returnToTitle
);


function returnToTitle() {

  stopAllTimers();

  gameState = "title";

  showScreen("title");

}


// ======================================================
// ゲーム開始
// ======================================================

function startNewGame() {

  stopAllTimers();


  lives =
    INITIAL_LIVES;

  score =
    0;

  questionCount =
    0;


  questionQueue =
    [];


  Object.keys(
    usedVariants
  ).forEach(key => {

    delete usedVariants[key];

  });


  incrementPlayCount();


  showScreen("game");


  prepareNextQuestion();

}


// ======================================================
// 次の問題
// ======================================================

function prepareNextQuestion() {

  stopAllTimers();


  wrongLocked =
    false;


  answerMarkerLayer.innerHTML =
    "";


  resultMessage.textContent =
    "";

  resultMessage.className =
    "result-message";


  changeImage.style.transition =
    "none";

  changeImage.style.opacity =
    "0";


  progressArea.classList.add(
    "hidden"
  );


  progressBar.style.transition =
    "none";

  progressBar.style.transform =
    "scaleX(1)";


  questionStartButton.classList.remove(
    "hidden"
  );


  imageCover.classList.remove(
    "hidden"
  );


  currentQuestion =
    getNextQuestion();


  currentVariant =
    getNextVariant(
      currentQuestion
    );


  baseImage.src =
    currentQuestion.baseImage;

  changeImage.src =
    currentVariant.changeImage;


  questionCount++;


  questionNumber.textContent =
    `第${questionCount}問`;


  guideMessage.textContent =
    "この中のどこかが変わります";


  updateLives();


  gameState =
    "ready";

}


// ======================================================
// 問題スタート
// ======================================================

questionStartButton.addEventListener(
  "click",
  startQuestion
);


function startQuestion() {

  if (
    gameState !== "ready"
  ) {
    return;
  }


  playSound("start");


  questionStartButton.classList.add(
    "hidden"
  );


  imageCover.classList.add(
    "hidden"
  );


  guideMessage.textContent =
    "よく見て覚えてください";


  gameState =
    "observe";


  stateTimeout =
    setTimeout(
      startChanging,
      OBSERVE_TIME
    );

}


// ======================================================
// 12秒変化
// ======================================================

function startChanging() {

  if (
    gameState !== "observe"
  ) {
    return;
  }


  gameState =
    "changing";


  guideMessage.textContent =
    "どこかが変わっています";


  progressArea.classList.remove(
    "hidden"
  );


  progressBar.style.transition =
    "none";

  progressBar.style.transform =
    "scaleX(1)";


  changeImage.style.transition =
    "none";

  changeImage.style.opacity =
    "0";


  // 描画確定後にアニメーション開始
  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      changeImage.style.transition =
        `opacity ${CHANGE_TIME}ms linear`;

      changeImage.style.opacity =
        "1";


      progressBar.style.transition =
        `transform ${CHANGE_TIME}ms linear`;

      progressBar.style.transform =
        "scaleX(0)";

    });

  });


  stateTimeout =
    setTimeout(
      startAnswerPhase,
      CHANGE_TIME
    );

}


// ======================================================
// 回答フェーズ
// ======================================================

function startAnswerPhase() {

  if (
    gameState !== "changing"
  ) {
    return;
  }


  gameState =
    "answer";


  guideMessage.textContent =
    "変わったところはどこ？";


  progressBar.style.transition =
    "none";

  progressBar.style.transform =
    "scaleX(1)";


  answerStartTime =
    performance.now();


  updateAnswerTimer();

}


// ======================================================
// 20秒回答タイマー
// ======================================================

function updateAnswerTimer() {

  if (
    gameState !== "answer"
  ) {
    return;
  }


  const elapsed =
    performance.now() -
    answerStartTime;


  const remaining =
    Math.max(
      0,
      1 -
      elapsed /
      ANSWER_TIME
    );


  progressBar.style.transform =
    `scaleX(${remaining})`;


  if (
    elapsed >= ANSWER_TIME
  ) {

    handleTimeUp();

    return;

  }


  answerAnimationFrame =
    requestAnimationFrame(
      updateAnswerTimer
    );

}


// ======================================================
// 画像タップ
// ======================================================

imageStage.addEventListener(
  "pointerdown",
  handleImageTap
);


function handleImageTap(event) {

  if (
    gameState !== "answer"
  ) {
    return;
  }


  if (
    wrongLocked
  ) {
    return;
  }


  const rect =
    imageStage.getBoundingClientRect();


  const xPercent =
    (
      (
        event.clientX -
        rect.left
      )
      /
      rect.width
    )
    * 100;


  const yPercent =
    (
      (
        event.clientY -
        rect.top
      )
      /
      rect.height
    )
    * 100;


  const correct =
    currentVariant.answerAreas.some(
      area =>
        isPointInsideArea(
          xPercent,
          yPercent,
          area
        )
    );


  if (correct) {

    handleCorrect(
      xPercent,
      yPercent
    );

  }
  else {

    handleWrong(
      xPercent,
      yPercent
    );

  }

}


// ======================================================
// 正解判定
// ======================================================

function isPointInsideArea(
  x,
  y,
  area
) {

  if (
    area.type === "circle"
  ) {

    const dx =
      x - area.x;

    const dy =
      y - area.y;


    return (
      Math.sqrt(
        dx * dx +
        dy * dy
      )
      <= area.radius
    );

  }


  if (
    area.type === "rect"
  ) {

    return (
      x >= area.x &&
      x <=
        area.x +
        area.width &&
      y >= area.y &&
      y <=
        area.y +
        area.height
    );

  }


  if (
    area.type === "polygon"
  ) {

    return pointInPolygon(
      x,
      y,
      area.points
    );

  }


  return false;

}


// ======================================================
// 多角形判定
// ======================================================

function pointInPolygon(
  x,
  y,
  points
) {

  let inside =
    false;


  for (
    let i = 0,
        j =
          points.length - 1;

    i < points.length;

    j = i++
  ) {

    const xi =
      points[i][0];

    const yi =
      points[i][1];

    const xj =
      points[j][0];

    const yj =
      points[j][1];


    const intersect =
      (
        (
          yi > y
        ) !== (
          yj > y
        )
      )
      &&
      (
        x <
        (
          (
            xj - xi
          )
          *
          (
            y - yi
          )
          /
          (
            yj - yi
          )
        )
        +
        xi
      );


    if (intersect) {

      inside =
        !inside;

    }

  }


  return inside;

}


// ======================================================
// 正解
// ======================================================

function handleCorrect(
  x,
  y
) {

  gameState =
    "correct";


  stopAnswerTimer();


  score++;


  playSound("correct");


  showMarker(
    x,
    y,
    "correct"
  );


  resultMessage.textContent =
    "正解！";


  resultMessage.className =
    "result-message correct";


  guideMessage.textContent =
    "";


  stateTimeout =
    setTimeout(
      prepareNextQuestion,
      CORRECT_DISPLAY_TIME
    );

}


// ======================================================
// 不正解
// ======================================================

function handleWrong(
  x,
  y
) {

  wrongLocked =
    true;


  lives--;


  playSound("wrong");


  showMarker(
    x,
    y,
    "wrong"
  );


  resultMessage.textContent =
    "ハズレ！";


  resultMessage.className =
    "result-message wrong";


  updateLives();


  if (
    lives <= 0
  ) {

    stateTimeout =
      setTimeout(
        () =>
          endGame(
            "GAME OVER"
          ),
        WRONG_DISPLAY_TIME
      );

    return;

  }


  stateTimeout =
    setTimeout(
      () => {

        clearWrongMarkers();


        resultMessage.textContent =
          "";

        resultMessage.className =
          "result-message";


        wrongLocked =
          false;

      },
      WRONG_DISPLAY_TIME
    );

}


// ======================================================
// マーカー表示
// ======================================================

function showMarker(
  x,
  y,
  type
) {

  const marker =
    document.createElement(
      "div"
    );


  marker.classList.add(
    "tap-marker"
  );


  marker.style.left =
    `${x}%`;

  marker.style.top =
    `${y}%`;


  if (
    type === "correct"
  ) {

    marker.classList.add(
      "correct-marker"
    );

  }
  else {

    marker.classList.add(
      "wrong-marker"
    );

  }


  answerMarkerLayer.appendChild(
    marker
  );

}


function clearWrongMarkers() {

  answerMarkerLayer
    .querySelectorAll(
      ".wrong-marker"
    )
    .forEach(
      element =>
        element.remove()
    );

}


// ======================================================
// TIME UP
// ======================================================

function handleTimeUp() {

  if (
    gameState !== "answer"
  ) {
    return;
  }


  stopAnswerTimer();


  resultMessage.textContent =
    "TIME UP";


  resultMessage.className =
    "result-message wrong";


  endGame(
    "TIME UP"
  );

}


// ======================================================
// GAME OVER
// ======================================================

function endGame(reason) {

  stopAllTimers();


  gameState =
    "gameover";


  playSound("gameover");


  const best =
    saveBestScore(
      score
    );


  if (
    reason === "TIME UP"
  ) {

    gameOverTitle.textContent =
      "TIME UP";

    gameOverTitle.classList.add(
      "time-up"
    );

  }
  else {

    gameOverTitle.textContent =
      "GAME OVER";

    gameOverTitle.classList.remove(
      "time-up"
    );

  }


  currentScoreResult.textContent =
    `${score}問`;


  bestScoreResult.textContent =
    `${best}問`;


  updateHistoryDisplay();


  showScreen(
    "gameover"
  );

}


// ======================================================
// ライフ
// ======================================================

function updateLives() {

  const full =
    "♥ ".repeat(
      lives
    );


  const empty =
    "♡ ".repeat(
      INITIAL_LIVES -
      lives
    );


  lifeDisplay.textContent =
    (
      full +
      empty
    ).trim();

}


// ======================================================
// 問題のシャッフル
// ======================================================

function getNextQuestion() {

  if (
    questionQueue.length === 0
  ) {

    questionQueue =
      shuffleArray(
        [...QUESTIONS]
      );

  }


  return questionQueue.shift();

}


// ======================================================
// 変化パターン管理
// ======================================================

function getNextVariant(
  question
) {

  if (
    !usedVariants[
      question.id
    ]
  ) {

    usedVariants[
      question.id
    ] =
      new Set();

  }


  const used =
    usedVariants[
      question.id
    ];


  let available =
    question.variants.filter(
      variant =>
        !used.has(
          variant.id
        )
    );


  // 全パターン使用済み
  if (
    available.length === 0
  ) {

    used.clear();

    available =
      [...question.variants];

  }


  const selected =
    available[
      Math.floor(
        Math.random() *
        available.length
      )
    ];


  used.add(
    selected.id
  );


  return selected;

}


// ======================================================
// シャッフル
// ======================================================

function shuffleArray(array) {

  for (
    let i =
      array.length - 1;

    i > 0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      array[i],
      array[j]
    ] =
    [
      array[j],
      array[i]
    ];

  }


  return array;

}


// ======================================================
// 履歴
// ======================================================

function getBestScore() {

  return Number(
    localStorage.getItem(
      "dokokawaBestScore"
    )
    || 0
  );

}


function saveBestScore(
  currentScore
) {

  const currentBest =
    getBestScore();


  const newBest =
    Math.max(
      currentBest,
      currentScore
    );


  localStorage.setItem(
    "dokokawaBestScore",
    String(newBest)
  );


  return newBest;

}


function incrementPlayCount() {

  const current =
    Number(
      localStorage.getItem(
        "dokokawaPlayCount"
      )
      || 0
    );


  localStorage.setItem(
    "dokokawaPlayCount",
    String(current + 1)
  );

}


function getPlayCount() {

  return Number(
    localStorage.getItem(
      "dokokawaPlayCount"
    )
    || 0
  );

}


function updateHistoryDisplay() {

  historyBest.textContent =
    `${getBestScore()}問`;


  historyPlays.textContent =
    `${getPlayCount()}回`;

}


// ======================================================
// 音ON/OFF
// ======================================================

soundButton.addEventListener(
  "click",
  () => {

    soundEnabled =
      !soundEnabled;


    localStorage.setItem(
      "dokokawaSound",
      soundEnabled
        ? "on"
        : "off"
    );


    updateSoundButton();

  }
);


function updateSoundButton() {

  soundButton.textContent =
    soundEnabled
      ? "🔊"
      : "🔇";

}


// ======================================================
// 音再生
// ======================================================

function playSound(name) {

  if (
    !soundEnabled
  ) {
    return;
  }


  const audio =
    sounds[name];


  if (!audio) {
    return;
  }


  try {

    audio.currentTime =
      0;


    audio.play().catch(
      () => {}
    );

  }
  catch {
    // 音声エラーはゲーム進行を止めない
  }

}


// ======================================================
// タイマー停止
// ======================================================

function stopAnswerTimer() {

  if (
    answerAnimationFrame
  ) {

    cancelAnimationFrame(
      answerAnimationFrame
    );


    answerAnimationFrame =
      null;

  }

}


function stopAllTimers() {

  if (
    stateTimeout
  ) {

    clearTimeout(
      stateTimeout
    );


    stateTimeout =
      null;

  }


  stopAnswerTimer();

}