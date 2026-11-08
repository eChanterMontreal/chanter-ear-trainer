(() => {
  'use strict';

  const SAMPLE_RATE = 44100;
  const DURATION = 1.5;
  const LEVELS = { beginner:[20,40], intermediate:[10,20], advanced:[3,10], expert:[1,5] };
  // Highland harmonic/just profile, expressed as ratios of Low A.
  const SCALE = { lowG:7/8, lowA:1, B:9/8, C:5/4, D:4/3, E:3/2, F:5/3, highG:7/4, highA:2 };
  const NOTE_KEYS = { lowG:'noteLowG', lowA:'noteLowA', B:'noteB', C:'noteC', D:'noteD', E:'noteE', F:'noteF', highG:'noteHighG', highA:'noteHighA' };
  const TEXT = {
    en: {
      brandEyebrow:'BAGPIPE EAR TRAINER',brandTitle:'Chanter Ear Trainer',install:'Install',introEyebrow:'EAR TRAINING',introTitle:'Sharp or flat?',introText:'Set Low A and choose a chanter note. The scale references follow your Low A setting.',
      trainingMode:'Training',testMode:'Test · 10 tones',referenceTone:'NOTE REFERENCE',referenceDescription:'Highland harmonic scale',listenReference:'Listen to selected note',tuningSetup:'TUNING SETUP',lowAFrequency:'Low A frequency',scaleNote:'The other note references are calculated automatically from this value.',scaleListening:'SCALE LISTENING',scaleListeningDescription:'Hear all nine notes in order, 3.5 seconds each.',listenScale:'▶ Listen to full scale',stopScale:'■ Stop scale',scaleNowPlaying:'Playing {note} · {number} of 9',scaleFinished:'Scale finished.',
      exerciseNote:'Exercise note',testCoverage:'Test coverage',selectedNoteOnly:'Selected note · 10 tones',allNotesOnce:'All 9 notes · once each',
      noteLowG:'Low G',noteLowA:'Low A',noteB:'B',noteC:'C (chanter C♯)',noteD:'D',noteE:'E',noteF:'F (chanter F♯)',noteHighG:'High G',noteHighA:'High A',
      modeTraining:'TRAINING MODE',modeTest:'TEST MODE',modeTestNoHints:'TEST MODE',readyTitle:'Ready to train?',testReadyTitle:'Ready for a test?',testTitle:'Tone challenge',preparedTitle:'Tone ready',difficulty:'Difficulty',beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced',expert:'Expert',newTest:'New exercise',startTest:'Start test',startAnotherTest:'Start another test',listenTone:'Listen to tone',
      promptInitial:'Press “New exercise” to begin.',promptTestInitial:'Choose a note or test all nine notes.',promptTraining:'Listen to {note} and compare it with the reference.',promptTest:'Listen to {note} and answer.',promptAfterAnswer:'You can listen again or prepare another exercise.',correctFeedback:'CORRECT! Well done.',incorrectFeedback:'Not quite. Keep training.',answerLabel:'Answer',sharp:'SHARP',flat:'FLAT',higher:'Higher',lower:'Lower',cents:'cents',frequency:'Frequency',
      nextTone:'Next tone →',seeResults:'See results',testCompleted:'Test complete',resultLine:'Result: {score} out of {total} correct ({percent}%).',resultSaved:'Your answers were added to your statistics.',yourProgress:'YOUR PROGRESS',statistics:'Statistics',reset:'Reset',tests:'Exercises',correct:'Correct',accuracy:'Accuracy',bestStreak:'Best streak',currentStreak:'Current streak: {streak} · Statistics stay on this device.',resetConfirm:'Reset all saved statistics?',resetFeedback:'Statistics reset.',audioNote:'Audio plays through the device speaker or connected headphones.'
    },
    fr: {
      brandEyebrow:'ENTRAÎNEMENT DE CORNEMUSE',brandTitle:'Chanter Ear Trainer',install:'Installer',introEyebrow:'ENTRAÎNEMENT DE L’OREILLE',introTitle:'Sharp ou flat ?',introText:'Réglez le Low A et choisissez une note du chanter. Les références suivent ce réglage.',
      trainingMode:'Entraînement',testMode:'Test · 10 sons',referenceTone:'RÉFÉRENCE DE NOTE',referenceDescription:'Échelle Highland harmonique/juste',listenReference:'Écouter la note choisie',tuningSetup:'RÉGLAGE DE L’ACCORD',lowAFrequency:'Fréquence du Low A',scaleNote:'Les références des autres notes sont calculées automatiquement à partir de cette valeur.',scaleListening:'ÉCOUTER LA GAMME',scaleListeningDescription:'Écoutez les neuf notes dans l’ordre, 3,5 secondes chacune.',listenScale:'▶ Écouter toute la gamme',stopScale:'■ Arrêter la gamme',scaleNowPlaying:'Lecture : {note} · {number} sur 9',scaleFinished:'Gamme terminée.',
      exerciseNote:'Note à travailler',testCoverage:'Contenu du test',selectedNoteOnly:'Note choisie · 10 sons',allNotesOnce:'Les 9 notes · une fois chacune',
      noteLowG:'Low G',noteLowA:'Low A',noteB:'B',noteC:'C (C♯ du chanter)',noteD:'D',noteE:'E',noteF:'F (F♯ du chanter)',noteHighG:'High G',noteHighA:'High A',
      modeTraining:'MODE ENTRAÎNEMENT',modeTest:'MODE TEST',modeTestNoHints:'MODE TEST',readyTitle:'Prêt à vous entraîner ?',testReadyTitle:'Prêt pour le test ?',testTitle:'Défi de note',preparedTitle:'Note prête',difficulty:'Difficulté',beginner:'Débutant',intermediate:'Intermédiaire',advanced:'Avancé',expert:'Expert',newTest:'Nouvel exercice',startTest:'Commencer le test',startAnotherTest:'Recommencer le test',listenTone:'Écouter le son',
      promptInitial:'Appuyez sur « Nouvel exercice » pour commencer.',promptTestInitial:'Choisissez une note ou testez les neuf.',promptTraining:'Écoutez {note} et comparez-la à la référence.',promptTest:'Écoutez {note} et choisissez votre réponse.',promptAfterAnswer:'Vous pouvez réécouter ou préparer un autre exercice.',correctFeedback:'CORRECT ! Bravo.',incorrectFeedback:'Pas tout à fait. Continuez à vous entraîner.',answerLabel:'Réponse',sharp:'SHARP',flat:'FLAT',higher:'Plus aigu',lower:'Plus grave',cents:'cents',frequency:'Fréquence',
      nextTone:'Son suivant →',seeResults:'Voir le résultat',testCompleted:'Test terminé',resultLine:'Résultat : {score} sur {total} ({percent} %).',resultSaved:'Vos réponses ont été ajoutées à vos statistiques.',yourProgress:'VOTRE PROGRÈS',statistics:'Statistiques',reset:'Réinitialiser',tests:'Exercices',correct:'Correctes',accuracy:'Précision',bestStreak:'Meilleure série',currentStreak:'Série actuelle : {streak} · Les statistiques restent sur cet appareil.',resetConfirm:'Réinitialiser toutes les statistiques enregistrées ?',resetFeedback:'Statistiques réinitialisées.',audioNote:'Le son passe par le haut-parleur ou le casque connecté à l’appareil.'
    },
    es: {
      brandEyebrow:'ENTRENADOR DE GAITA',brandTitle:'Chanter Ear Trainer',install:'Instalar',introEyebrow:'ENTRENAMIENTO AUDITIVO',introTitle:'¿Sharp o flat?',introText:'Ajusta el Low A y elige una nota del chanter. Las referencias siguen ese ajuste.',
      trainingMode:'Entrenamiento',testMode:'Prueba · 10 tonos',referenceTone:'REFERENCIA DE NOTA',referenceDescription:'Escala Highland armónica/justa',listenReference:'Escuchar nota elegida',tuningSetup:'AJUSTE DE AFINACIÓN',lowAFrequency:'Frecuencia de Low A',scaleNote:'Las referencias de las demás notas se calculan automáticamente a partir de este valor.',scaleListening:'ESCUCHAR LA ESCALA',scaleListeningDescription:'Escucha las nueve notas en orden, 3,5 segundos cada una.',listenScale:'▶ Escuchar escala completa',stopScale:'■ Detener escala',scaleNowPlaying:'Reproduciendo {note} · {number} de 9',scaleFinished:'Escala terminada.',
      exerciseNote:'Nota del ejercicio',testCoverage:'Alcance de la prueba',selectedNoteOnly:'Nota elegida · 10 tonos',allNotesOnce:'Las 9 notas · una vez cada una',
      noteLowG:'Low G',noteLowA:'Low A',noteB:'B',noteC:'C (C♯ del chanter)',noteD:'D',noteE:'E',noteF:'F (F♯ del chanter)',noteHighG:'High G',noteHighA:'High A',
      modeTraining:'MODO ENTRENAMIENTO',modeTest:'MODO PRUEBA',modeTestNoHints:'MODO PRUEBA',readyTitle:'Prepara tu oído',testReadyTitle:'¿Listo para la prueba?',testTitle:'Reto de nota',preparedTitle:'Nota preparada',difficulty:'Dificultad',beginner:'Principiante',intermediate:'Intermedio',advanced:'Avanzado',expert:'Experto',newTest:'Nuevo ejercicio',startTest:'Empezar prueba',startAnotherTest:'Empezar otra prueba',listenTone:'Escuchar tono',
      promptInitial:'Pulsa «Nuevo ejercicio» para comenzar.',promptTestInitial:'Elige una nota o prueba las nueve.',promptTraining:'Escucha {note} y compárala con la referencia.',promptTest:'Escucha {note} y responde.',promptAfterAnswer:'Puedes escuchar de nuevo o preparar otro ejercicio.',correctFeedback:'¡CORRECTO! Muy bien.',incorrectFeedback:'Incorrecto. Sigue entrenando.',answerLabel:'Respuesta',sharp:'SHARP',flat:'FLAT',higher:'Más agudo',lower:'Más grave',cents:'cents',frequency:'Frecuencia',
      nextTone:'Siguiente tono →',seeResults:'Ver resultado',testCompleted:'Prueba completada',resultLine:'Resultado: {score} de {total} correctas ({percent}%).',resultSaved:'Las respuestas se añadieron a tus estadísticas.',yourProgress:'TU PROGRESO',statistics:'Estadísticas',reset:'Reiniciar',tests:'Ejercicios',correct:'Correctas',accuracy:'Precisión',bestStreak:'Mejor racha',currentStreak:'Racha actual: {streak} · Las estadísticas quedan en este dispositivo.',resetConfirm:'¿Reiniciar todas las estadísticas guardadas?',resetFeedback:'Estadísticas reiniciadas.',audioNote:'El audio sale por el altavoz o los auriculares conectados al dispositivo.'
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
  let testNotes = [];
  let lastWasCorrect = false;
  let deferredInstall = null;
  let scalePlaybackToken = 0;
  let activeToneSource = null;
  let lang = localStorage.getItem('chanterLanguage') || 'en';
  let lowAFrequency = Number(localStorage.getItem('chanterLowA')) || 480;
  let stats = loadStats();

  function t(key) { return TEXT[lang][key] || TEXT.en[key] || key; }
  function noteLabel(note) { return t(NOTE_KEYS[note]); }
  function noteFrequency(note) { return lowAFrequency * SCALE[note]; }
  function formatFrequency(value) {
    const locale = lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US';
    return new Intl.NumberFormat(locale, { minimumFractionDigits:1, maximumFractionDigits:1 }).format(value);
  }
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
    $('accuracyStat').textContent = formatFrequency(percent) + '%';
    $('streakStat').textContent = stats.bestStreak;
    $('sessionStat').textContent = t('currentStreak').replace('{streak}', stats.streak);
  }
  function renderReference(note = $('noteSelect').value) {
    $('referenceNote').textContent = noteLabel(note);
    $('referenceFrequency').textContent = formatFrequency(noteFrequency(note));
  }
  function applyLanguage(nextLang) {
    lang = TEXT[nextLang] ? nextLang : 'en';
    try { localStorage.setItem('chanterLanguage', lang); } catch {}
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
  function playTone(freq, duration = DURATION) {
    try {
      if (activeToneSource) { try { activeToneSource.stop(); } catch {} }
      const ctx = audio();
      const length = Math.floor(SAMPLE_RATE * duration);
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
      activeToneSource = source;
      source.onended = () => { if (activeToneSource === source) activeToneSource = null; };
      source.start();
    } catch (error) { $('prompt').textContent = `Audio error: ${error.message}`; }
  }
  const SCALE_ORDER = ['lowG','lowA','B','C','D','E','F','highG','highA'];
  function setScaleButton(playing) {
    $('scaleListenBtn').querySelector('[data-i18n]').textContent = t(playing ? 'stopScale' : 'listenScale');
    $('scaleListenBtn').setAttribute('aria-pressed', String(playing));
  }
  async function playFullScale() {
    if ($('scaleListenBtn').getAttribute('aria-pressed') === 'true') {
      scalePlaybackToken++;
      if (activeToneSource) { try { activeToneSource.stop(); } catch {} activeToneSource = null; }
      setScaleButton(false);
      $('scaleStatus').textContent = '';
      return;
    }
    const token = ++scalePlaybackToken;
    setScaleButton(true);
    const noteDuration = 3.5;
    for (let i = 0; i < SCALE_ORDER.length; i++) {
      if (token !== scalePlaybackToken) return;
      const note = SCALE_ORDER[i];
      $('scaleStatus').textContent = t('scaleNowPlaying').replace('{note}', noteLabel(note)).replace('{number}', i + 1);
      playTone(noteFrequency(note), noteDuration);
      await new Promise(resolve => setTimeout(resolve, noteDuration * 1000));
    }
    if (token === scalePlaybackToken) {
      setScaleButton(false);
      $('scaleStatus').textContent = t('scaleFinished');
    }
  }
  function setAnswers(enabled) { document.querySelectorAll('.answer').forEach(button => { button.disabled = !enabled; }); }
  function totalRounds() { return mode === 'test' && $('testScope').value === 'scale' ? 9 : 10; }
  function renderExercise() {
    const allNotes = mode === 'test' && $('testScope').value === 'scale';
    $('testScopeWrap').hidden = mode !== 'test';
    $('noteSelect').disabled = allNotes;
    $('roundEyebrow').textContent = mode === 'training' ? t('modeTraining') : (screen === 'ready' ? t('modeTest') : t('modeTestNoHints'));
    $('newBtn').querySelector('[data-i18n]').textContent = mode === 'training' ? t('newTest') : (screen === 'finished' ? t('startAnotherTest') : t('startTest'));
    $('nextBtn').textContent = mode === 'test' && testRound >= totalRounds() ? t('seeResults') : t('nextTone');
    if (screen === 'idle') {
      current = null;
      $('exerciseTitle').textContent = mode === 'training' ? t('readyTitle') : t('testReadyTitle');
      $('prompt').textContent = mode === 'training' ? t('promptInitial') : t('promptTestInitial');
      $('roundBadge').textContent = '—';
      $('feedback').textContent = '';
      $('feedback').className = 'feedback';
      $('playBtn').disabled = true;
      $('nextBtn').hidden = true;
      setAnswers(false);
      renderReference($('noteSelect').value);
      return;
    }
    if (screen === 'ready') {
      $('exerciseTitle').textContent = mode === 'training' ? t('preparedTitle') : t('testTitle');
      $('prompt').textContent = (mode === 'training' ? t('promptTraining') : t('promptTest')).replace('{note}', noteLabel(current.note));
      $('roundBadge').textContent = mode === 'test' ? `${testRound+1} / ${totalRounds()}` : '♪';
      $('playBtn').disabled = mode === 'test';
      $('nextBtn').hidden = true;
      setAnswers(true);
      renderReference(current.note);
      return;
    }
    if (screen === 'answered') {
      $('exerciseTitle').textContent = mode === 'test' ? t('testTitle') : t('preparedTitle');
      $('prompt').textContent = (mode === 'training' ? t('promptAfterAnswer') : t('promptTest')).replace('{note}', noteLabel(current.note));
      $('roundBadge').textContent = mode === 'test' ? `${testRound} / ${totalRounds()}` : '♪';
      $('playBtn').disabled = true;
      $('nextBtn').hidden = mode !== 'test';
      $('nextBtn').textContent = mode === 'test' && testRound >= totalRounds() ? t('seeResults') : t('nextTone');
      setAnswers(false);
      renderReference(current.note);
      renderFeedback();
      return;
    }
    if (screen === 'finished') {
      $('exerciseTitle').textContent = t('testCompleted');
      $('prompt').textContent = t('resultLine').replace('{score}', testCorrect).replace('{total}', totalRounds()).replace('{percent}', Math.round(testCorrect / totalRounds() * 100));
      $('roundBadge').textContent = '✓';
      $('feedback').textContent = t('resultSaved');
      $('feedback').className = 'feedback';
      $('playBtn').disabled = true;
      $('nextBtn').hidden = true;
      setAnswers(false);
      renderReference($('noteSelect').value);
    }
  }
  function prepare() {
    if (mode === 'test' && testRound >= totalRounds()) { finishTest(); return; }
    answered = false;
    const note = mode === 'test' && $('testScope').value === 'scale' ? testNotes[testRound] : $('noteSelect').value;
    const [minimum, maximum] = LEVELS[$('levelSelect').value];
    const direction = Math.random() < .5 ? -1 : 1;
    const cents = minimum + Math.random() * (maximum - minimum);
    const target = noteFrequency(note);
    current = { note, target, freq:target * 2 ** (direction * cents / 1200), offset:direction * cents, answer:direction > 0 ? 'SHARP' : 'FLAT' };
    screen = 'ready';
    $('feedback').textContent = '';
    $('feedback').className = 'feedback';
    renderExercise();
    playTone(current.freq);
  }
  function startTest() {
    testRound = 0;
    testCorrect = 0;
    testNotes = Object.keys(SCALE);
    for (let i = testNotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [testNotes[i], testNotes[j]] = [testNotes[j], testNotes[i]];
    }
    stats.sessions++;
    saveStats();
    prepare();
  }
  function renderFeedback() {
    if (!current) return;
    const direction = current.offset > 0 ? t('sharp') : t('flat');
    const message = lastWasCorrect ? t('correctFeedback') : t('incorrectFeedback');
    $('feedback').className = 'feedback ' + (lastWasCorrect ? 'good' : 'bad');
    $('feedback').textContent = `${message}\n${t('answerLabel')}: ${direction} · ${noteLabel(current.note)} · ${t('cents')}: ${Math.abs(current.offset).toFixed(2)} · ${t('frequency')}: ${current.freq.toFixed(2)} Hz`;
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
  function finishTest() { current = null; screen = 'finished'; renderExercise(); }
  function cancelCurrentExercise() { current = null; answered = false; screen = 'idle'; testRound = 0; testCorrect = 0; renderExercise(); }

  document.querySelectorAll('.mode-tab').forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.mode;
    testRound = 0;
    testCorrect = 0;
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
  $('lowAInput').value = lowAFrequency;
  function updateLowA(finalize = false) {
    const value = Number($('lowAInput').value);
    if (Number.isFinite(value) && value >= 400 && value <= 520) {
      if (value !== lowAFrequency) {
        lowAFrequency = value;
        try { localStorage.setItem('chanterLowA', String(lowAFrequency)); } catch {}
        cancelCurrentExercise();
      }
    } else if (finalize) $('lowAInput').value = lowAFrequency;
  }
  $('lowAInput').addEventListener('input', () => updateLowA());
  $('lowAInput').addEventListener('change', () => updateLowA(true));
  $('noteSelect').addEventListener('change', cancelCurrentExercise);
  $('testScope').addEventListener('change', cancelCurrentExercise);
  $('referenceBtn').addEventListener('click', () => playTone(noteFrequency(current?.note || $('noteSelect').value)));
  $('scaleListenBtn').addEventListener('click', playFullScale);
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
