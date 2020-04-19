window.addEventListener('load', () => {
  const synth = window.speechSynthesis;
  document.getElementById('speak').addEventListener('click', () => {
    const voices = window.speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(document.getElementById('WritingPad').value);
    utterance.voice = voices[1];
    synth.speak(utterance);
    setTimeout(function() {
      speechSynthesis.pause();
      speechSynthesis.resume();
    }, 10000);
    synth.addEventListener('pending', () =>{

    });
    refreshAudio();
  },
  );
  /**
 */
  function refreshAudio() {
    // fix for chrome who automaticly pause utterance after 15 seconds
    setTimeout(() => {
      console.log('run again');
      speechSynthesis.pause();
      speechSynthesis.resume();
      refreshAudio();
    }, 10000);
  }
  document.getElementById('pause').addEventListener('click', () => {
    if (synth.paused) {
      synth.resume();
      return;
    }
    synth.pause();
  });
  document.getElementById('stop').addEventListener('click', () => {
    synth.cancel();
  });
});
