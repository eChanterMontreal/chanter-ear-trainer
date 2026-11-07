(() => {
  'use strict';

  const REFERENCE_FREQ = 480;
  const SAMPLE_RATE = 44100;
  const DURATION = 1.5;
  const LEVELS = {
    beginner: [20, 40],
    intermediate: [10, 20],
    advanced: [3, 10],
    expert: [1, 5]
  };
  const TEXT = {
    en: {
      brandEyebrow:'BAGPIPE EAR TRAINER', brandTitle:'Chanter Ear Trainer', install:'Install',
      introEyebrow:'EAR TRAINING', introTitle:'Sharp or flat?', introText:'Compare each tone with the', referenceWord:'reference.',
      trainingMode:'Training', testMode:'Test · 10 tones', referenceTone:'REFERENCE TONE', referenceDescription:'Harmonic chanter-like tone', listenReference:'Listen to reference',
      modeTraining:'TRAINING MODE', modeTest:'TEST MODE · 10 TONES', modeTestNoHints:'TEST MODE', readyTitle:'Ready to train?', testReadyTitle:'Ready for a test?', testTitle:'Test tone', preparedTitle:'Tone ready',
      difficulty:'Difficulty', beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced', expert:'Expert', newTest:'New exercise', startTest:'Start test', startAnotherTest:'Start another test', listenTone:'Listen to tone',
      promptInitial:'Press “New exercise” to begin.', promptTraining:'Listen to the tone and compare it with the reference.', promptTest:'Listen to the tone and answer.', promptAfterAnswer:'You can listen again or prepare another exercise.',
      correctFeedback:'CORRECT! Well done.', incorrectFeedback:'Not quite. Keep training.', answerLabel:'Answer', sharp:'SHARP', flat:'FLAT', higher:'Higher', lower:'Lower', cents:'cents', frequency:'Frequency',
      nextTone:'Next tone →', seeResults:'See results', testCompleted:'Test complete', resultLine:'Result: {score} out of 10 correct ({percent}%).', resultSaved:'Your answers were added to your statistics.',
      yourProgress:'YOUR PROGRESS', statistics:'Statistics', reset:'Reset', tests:'Tests', correct:'Correct', accuracy:'Accuracy', bestStreak:'Best streak', currentStreak:'Current streak: {streak} · Statistics stay on this device.',
      resetConfirm:'Reset all saved statistics?', resetFeedback:'Statistics reset.', audioNote:'Audio plays through the device speaker or connected headphones.'
    },
    fr: {
      brandEyebrow:'ENTRAÎNEMENT DE CORNEMUSE', brandTitle:'Chanter Ear Trainer', install:'Installer',
      introEyebrow:'ENTRAÎNEMENT DE L’OREILLE', introTitle:'Sharp ou flat ?', introText:'Comparez chaque son à la', referenceWord:'référence.',
      trainingMode:'Entraînement', testMode:'Test · 10 sons', referenceTone:'SON DE RÉFÉRENCE', referenceDescription:'Timbre harmonique de chanter', listenReference:'Écouter la référence',
      modeTraining:'MODE ENTRAÎNEMENT', modeTest:'MODE TEST · 10 SONS', modeTestNoHints:'MODE TEST', readyTitle:'Prêt à vous entraîner ?', testReadyTitle:'Prêt pour le test ?', testTitle:'Son du test', preparedTitle:'Son prêt',
      difficulty:'Difficulté', beginner:'Débutant', intermediate:'Intermédiaire', advanced:'Avancé', expert:'Expert', newTest:'Nouvel exercice', startTest:'Commencer le test', startAnotherTest:'Recommencer le test', listenTone:'Écouter le son',
      promptInitial:'Appuyez sur « Nouvel exercice » pour commencer.', promptTraining:'Écoutez le son et comparez-le à la référence.', promptTest:'Écoutez le son et choisissez votre réponse.', promptAfterAnswer:'Vous pouvez réécouter ou préparer un autre exercice.',
      correctFeedback:'CORRECT ! Bravo.', incorrectFeedback:'Pas tout à fait. Continuez à vous entraîner.', answerLabel:'Réponse', sharp:'SHARP', flat:'FLAT', higher:'Plus aigu', lower:'Plus grave', cents:'cents', frequency:'Fréquence',
      nextTone:'Son suivant →', seeResults:'Voir le résultat', testCompleted:'Test terminé', resultLine:'Résultat : {score} sur 10 ({percent} %).', resultSaved:'Vos réponses ont été ajoutées à vos statistiques.',
      yourProgress:'VOTRE PROGRÈS', statistics:'Statistiques', reset:'Réinitialiser', tests:'Tests', correct:'Correctes', accuracy:'Précision', bestStreak:'Meilleure série', currentStreak:'Série actuelle : {streak} · Les statistiques restent sur cet appareil.',
      resetConfirm:'Réinitialiser toutes les statistiques enregistrées ?', resetFeedback:'Statistiques réinitialisées.', audioNote:'Le son passe par le haut-parleur ou le casque connecté à l’appareil.'
    },
    es: {
      brandEyebrow:'ENTRENADOR DE GAITA', brandTitle:'Chanter Ear Trainer', install:'Instalar',
      introEyebrow:'ENTRENAMIENTO AUDITIVO', introTitle:'¿Sharp o flat?', introText:'Compara cada tono con la', referenceWord:'referencia.',
      trainingMode:'Entrenamiento', testMode:'Prueba · 10 tonos', referenceTone:'TONO DE REFERENCIA', referenceDescription:'Timbre armónico tipo chanter', listenReference:'Escuchar referencia',
      modeTraining:'MODO ENTRENAMIENTO', modeTest:'MODO PRUEBA · 10 TONOS', modeTestNoHints:'MODO PRUEBA', readyTitle:'Prepara tu oído', testReadyTitle:'¿Listo para la prueba?', testTitle:'Tono de prueba', preparedTitle:'Tono preparado',
      difficulty:'Dificultad', beginner:'Principiante', intermediate:'Intermedio', advanced:'Avanzado', expert:'Experto', newTest:'Nueva prueba', startTest:'Empezar prueba', startAnotherTest:'Empezar otra prueba', listenTone:'Escuchar tono',
      promptInitial:'Pulsa «Nueva prueba» para comenzar.', promptTraining:'Escucha el tono y compáralo con la referencia.', promptTest:'Escucha el tono y responde.', promptAfterAnswer:'Puedes escuchar de nuevo o preparar otra prueba.',
      correctFeedback:'¡CORRECTO! Muy bien.', incorrectFeedback:'Incorrecto. Sigue entrenando.', answerLabel:'Respuesta', sharp:'SHARP', flat:'FLAT', higher:'Más agudo', lower:'Más grave', cents:'cents', frequency:'Frecuencia',
      nextTone:'Siguiente tono →', seeResults:'Ver resultado', testCompleted:'Prueba completada', resultLine:'Resultado: {score} de 10 correctas ({percent}%).', resultSaved:'Las respuestas se añadieron a tus estadísticas.',
      yourProgress:'TU PROGRESO', statistics:'Estadísticas', reset:'Reiniciar', tests:'Pruebas', correct:'Correctas', accuracy:'Precisión', bestStreak:'Mejor racha', currentStreak:'Racha actual: {streak} · Las estadísticas quedan en este dispositivo.',
      resetConfirm:'¿Reiniciar todas las estadísticas guardadas?', resetFeedback:'Estadísticas reiniciadas.', audioNote:'El audio sale por el altavoz o los auriculares conectados al dispositivo.'
    }
  };

  const $ = id => document.getElementById(id);
  let audioCtx = null;
  let current = null;
  let answered = false;
  let mode = 'training';
  let screen = 'idle';
  let testRound = 0;
  let testCorrect = 0;
  let lastWasCorrect = false;
  let deferredInstall = null;
  let lang = localStorage.getItem('chanterLanguage') || 'en';
  let stats = loadStats();

  function t(key) { return TEXT[lang][key] || TEXT.en[key] || key; }
  function loadStats() {
    try { return JSON.parse(localStorage.getItem('chanterStats')) || { total:0, correct:0, streak:0, bestStreak:0, sessions:0 }; }
    catch { return { total:0, correct:0, streak:0, bestStreak:0, sessions:0 }; }
  }
  function saveStats() {
    try { localStorage.setItem('chanterStats', JSON.stringify(stats)); } catch {}
    renderStats();
  }
  function renderStats() {
    const percent = stats.total ? stats.correct / stats.total * 100 : 0;
    const locale = lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US';
    $('totalStat').textContent = stats.total;
    $('correctStat').textContent = stats.correct;
    $('accuracyStat').textContent = new Intl.NumberFormat(locale, { minimumFractionDigits:1, maximumFractionDigits:1 }).format(percent) + '%';
    $('streakStat').textContent = stats.bestStreak;
    $('sessionStat').textContent = t('currentStreak').replace('{streak}', stats.streak);
  }
  function applyLanguage(nextLang) {
    lang = TEXT[nextLang] ? nextLang : 'en';
    localStorage.setItem('chanterLanguage', lang);
    document.documentElement.lang = lang;
    $('languageSelect').value = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('.mode-tab').forEach(el => el.setAttribute('aria-selected', String(el.dataset.mode === mode)));
    renderExercise();
    renderStats();
  }
  function audio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate:SAMPLE_RATE });
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  function playTone(freq) {
    try {
      const ctx = audio();
      const length = Math.floor(SAMPLE_RATE * DURATION);
      const buffer = ctx.createBuffer(1, length, SAMPLE_RATE);
      const data = buffer.getChannelData(0);
      let peak = 0;
      const fade = Math.floor(.04 * SAMPLE_RATE);
      for (let i=0; i<length; i++) {
        const time = i / SAMPLE_RATE;
        const value = Math.sin(2*Math.PI*freq*time) + .55*Math.sin(2*Math.PI*freq*2*time) + .35*Math.sin(2*Math.PI*freq*3*time) + .22*Math.sin(2*Math.PI*freq*4*time) + .12*Math.sin(2*Math.PI*freq*5*time) + .07*Math.sin(2*Math.PI*freq*6*time);
        const envelope = Math.max(0, Math.min(1, i/fade, (length-1-i)/fade));
        data[i] = value * envelope;
        peak = Math.max(peak, Math.abs(data[i]));
      }
      for (let i=0; i<length; i++) data[i] = data[i] / peak * .65;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (error) {
      $('prompt').textContent = `Audio error: ${error.message}`;
    }
  }
  function setAnswers(enabled) { document.querySelectorAll('.answer').forEach(button => { button.disabled = !enabled; }); }
  function renderExercise() {
    $('roundEyebrow').textContent = mode === 'training' ? t('modeTraining') : (screen === 'ready' ? t('modeTest') : t('modeTestNoHints'));
    $('newBtn').querySelector('[data-i18n]').textContent = mode === 'training' ? t('newTest') : (screen === 'finished' ? t('startAnotherTest') : t('startTest'));
    $('nextBtn').textContent = mode === 'test' && testRound >= 10 ? t('seeResults') : t('nextTone');
    if (screen === 'idle') {
      $('exerciseTitle').textContent = mode === 'training' ? t('readyTitle') : t('testReadyTitle');
      $('prompt').textContent = mode === 'training' ? t('promptInitial') : t('testReadyTitle');
      $('roundBadge').textContent = '—';
      $('feedback').textContent = '';
      $('feedback').className = 'feedback';
      $('playBtn').disabled = true;
      $('nextBtn').hidden = true;
      setAnswers(false);
      return;
    }
    if (screen === 'ready') {
      $('exerciseTitle').textContent = mode === 'training' ? t('preparedTitle') : t('testTitle');
      $('prompt').textContent = mode === 'training' ? t('promptTraining') : t('promptTest');
      $('roundBadge').textContent = mode === 'test' ? `${testRound+1} / 10` : '♪';
      $('playBtn').disabled = mode === 'test';
      $('nextBtn').hidden = true;
      setAnswers(true);
      return;
    }
    if (screen === 'answered') {
      $('exerciseTitle').textContent = mode === 'test' ? t('testTitle') : t('preparedTitle');
      $('prompt').textContent = mode === 'training' ? t('promptAfterAnswer') : t('promptTest');
      $('roundBadge').textContent = mode === 'test' ? `${testRound} / 10` : '♪';
      $('playBtn').disabled = true;
      $('nextBtn').hidden = mode !== 'test';
      $('nextBtn').textContent = mode === 'test' && testRound >= 10 ? t('seeResults') : t('nextTone');
      setAnswers(false);
      renderFeedback();
      return;
    }
    if (screen === 'finished') {
      $('exerciseTitle').textContent = t('testCompleted');
      $('prompt').textContent = t('resultLine').replace('{score}', testCorrect).replace('{percent}', testCorrect * 10);
      $('roundBadge').textContent = '✓';
      $('feedback').textContent = t('resultSaved');
      $('feedback').className = 'feedback';
      $('playBtn').disabled = true;
      $('nextBtn').hidden = true;
      setAnswers(false);
    }
  }
  function prepare() {
    if (mode === 'test' && testRound >= 10) { finishTest(); return; }
    answered = false;
    const [minimum, maximum] = LEVELS[$('levelSelect').value];
    const direction = Math.random() < .5 ? -1 : 1;
    const cents = minimum + Math.random() * (maximum - minimum);
    current = { freq:REFERENCE_FREQ * 2 ** (direction * cents / 1200), offset:direction * cents, answer:direction > 0 ? 'SHARP' : 'FLAT' };
    screen = 'ready';
    $('feedback').textContent = '';
    $('feedback').className = 'feedback';
    renderExercise();
    playTone(current.freq);
  }
  function startTest() {
    testRound = 0;
    testCorrect = 0;
    stats.sessions++;
    saveStats();
    prepare();
  }
  function renderFeedback() {
    if (!current) return;
    const direction = current.offset > 0 ? t('sharp') : t('flat');
    const message = lastWasCorrect ? t('correctFeedback') : t('incorrectFeedback');
    $('feedback').className = 'feedback ' + (lastWasCorrect ? 'good' : 'bad');
    $('feedback').textContent = `${message}\n${t('answerLabel')}: ${direction} · ${t('cents')}: ${Math.abs(current.offset).toFixed(2)} · ${t('frequency')}: ${current.freq.toFixed(2)} Hz`;
  }
  function answer(choice) {
    if (answered || !current) return;
    answered = true;
    screen = 'answered';
    stats.total++;
    lastWasCorrect = choice === current.answer;
    if (lastWasCorrect) {
      stats.correct++;
      stats.streak++;
      stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
      if (mode === 'test') testCorrect++;
    } else stats.streak = 0;
    if (mode === 'test') testRound++;
    saveStats();
    renderExercise();
  }
  function finishTest() {
    current = null;
    screen = 'finished';
    renderExercise();
  }

  document.querySelectorAll('.mode-tab').forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.mode;
    current = null;
    answered = false;
    screen = 'idle';
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab === button);
      tab.setAttribute('aria-selected', String(tab === button));
    });
    renderExercise();
  }));
  $('languageSelect').addEventListener('change', event => applyLanguage(event.target.value));
  $('referenceBtn').addEventListener('click', () => playTone(REFERENCE_FREQ));
  $('newBtn').addEventListener('click', () => mode === 'test' ? startTest() : prepare());
  $('playBtn').addEventListener('click', () => { if (current) playTone(current.freq); });
  document.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => answer(button.dataset.answer)));
  $('nextBtn').addEventListener('click', prepare);
  $('resetBtn').addEventListener('click', () => {
    if (!confirm(t('resetConfirm'))) return;
    stats = { total:0, correct:0, streak:0, bestStreak:0, sessions:0 };
    saveStats();
    $('feedback').textContent = t('resetFeedback');
  });
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstall = event;
    $('installBtn').hidden = false;
  });
  $('installBtn').addEventListener('click', async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    $('installBtn').hidden = true;
  });
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(error => console.error('Service worker registration failed', error)));
  applyLanguage(lang);
})();
