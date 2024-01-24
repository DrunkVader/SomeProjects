// Drumkit class definition
class Drumkit {
  constructor() {
    // Initialize properties with DOM elements
    this.pads = document.querySelectorAll(".pad");
    this.playBton = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat.acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  // Toggle the 'active' class for a pad
  activePad() {
    this.classList.toggle("active");
  }

  // Play sounds based on the active bars in the sequencer
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);

    // Loop over active bars
    activeBars.forEach((bar) => {
      // Animate the bar
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      // Check if pads are active and play the corresponding sound
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }

  // Start/stop the sequencer based on the BPM
  start() {
    const interval = (60 / this.bpm) * 1000;

    // Check if it's already playing
    if (this.isPlaying) {
      // Stop the sequencer
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      // Start the sequencer
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  // Update play button text and style based on playing state
  updateBtn() {
    if (!this.isPlaying) {
      this.playBton.innerText = "Stop";
      this.playBton.classList.add("active");
    } else {
      this.playBton.innerText = "Play";
      this.playBton.classList.remove("active");
    }
  }

  // Change the source of the selected sound based on user input
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  // Mute/unmute a specific track based on user input
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");

    // Adjust volume based on mute state
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  // Update tempo text based on the slider input
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    tempoText.innerText = e.target.value;
  }

  // Update tempo and restart the sequencer
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;

    // Restart the sequencer if it was playing
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

// Create an instance of the Drumkit class
const drumKit = new Drumkit();

// Event Listeners for the Drumkit instance
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBton.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
