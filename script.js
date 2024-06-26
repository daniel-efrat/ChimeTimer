document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown")
  const startButton = document.getElementById("startButton")
  const stopButton = document.getElementById("stopButton")
  const currentSound = document.getElementById("currentSound")
  const volumeSlider = document.getElementById("volumeSlider")
  const intervalInput = document.getElementById("intervalInput")
  const soundOptions = document.getElementById("soundOptions")
  const soundOptionsWrapper = document.getElementById("soundOptionsWrapper")
  const toggleSoundOptions = document.getElementById("toggleSoundOptions")
  const okButton = document.getElementById("okButton")
  const video = document.getElementById("vid")
  const consent = document.getElementById("consent")
  const hideButton = document.getElementById("hideButton")
  const stripe = document.querySelectorAll(".stripe")

  // Define default sound name and file
  let currentSoundName = ""
  let currentSoundFile = "sounds/chimes.mp3"

  let countdownInterval
  let timeLeft

  // Function to update the button text
  function updateToggleButton() {
    const toggleSoundOptions = document.getElementById("toggleSoundOptions")

    if (!toggleSoundOptions) {
      console.error("Element with id 'toggleSoundOptions' not found")
      return
    }

    if (typeof currentSoundName === "undefined") {
      console.error("currentSoundName is undefined")
      return
    }

    console.log("Updating toggle button text to:", currentSoundName)
    toggleSoundOptions.textContent = `${currentSoundName}`
  }

  startButton.addEventListener("click", () => {
    timeLeft = parseInt(intervalInput.value) * 60
    startButton.disabled = true
    stopButton.disabled = false
    startCountdown()
    currentSound.play()
    video.play()
    soundOptionsWrapper.style.display = "none"
    console.log(`Playing sound: ${currentSound.src}`)
  })

  stopButton.addEventListener("click", () => {
    clearInterval(countdownInterval)
    timeLeft = parseInt(intervalInput.value) * 60
    updateCountdownDisplay()
    startButton.disabled = false
    stopButton.disabled = true
    video.pause()
    video.currentTime = 0
  })

  volumeSlider.addEventListener("input", () => {
    currentSound.volume = volumeSlider.value
    console.log(`Volume set to: ${currentSound.volume}`)
  })

  toggleSoundOptions.addEventListener("click", () => {
    soundOptionsWrapper.style.display =
      soundOptionsWrapper.style.display === "none" ? "block" : "none"
    toggleSoundOptions.classList.toggle("arrow-up")
    toggleSoundOptions.classList.toggle("arrow-down")
  })

  document.querySelectorAll(".play-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const soundFile = e.target
        .closest(".sound-option")
        .getAttribute("data-value")
      currentSound.src = soundFile
      currentSound
        .play()
        .then(() => {
          console.log(`Playing sound: ${currentSound.src}`)
        })
        .catch((error) => {
          console.error(`Error playing sound: ${error}`)
        })
    })
  })

  document.querySelectorAll(".select-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const optionElement = e.target.closest(".sound-option")
      currentSoundName = optionElement.querySelector("span").textContent
      currentSoundFile = optionElement.getAttribute("data-value")
      currentSound.src = currentSoundFile
      updateToggleButton() // Update button text after selecting sound
      soundOptionsWrapper.style.display = "none"
      toggleSoundOptions.classList.remove("arrow-up")
      toggleSoundOptions.classList.add("arrow-down")
      updateSelectButtons()
      console.log(`Selected sound: ${currentSoundFile}`)
    })
  })

  function updateSelectButtons() {
    document.querySelectorAll(".select-button").forEach((button) => {
      const optionElement = button.closest(".sound-option")
      if (optionElement.getAttribute("data-value") === currentSoundFile) {
        button.disabled = true
      } else {
        button.disabled = false
      }
    })
  }

  function startCountdown() {
    countdownInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdownInterval)
        currentSound
          .play()
          .then(() => {
            console.log(`Playing sound: ${currentSound.src}`)
          })
          .catch((error) => {
            console.error(`Error playing sound: ${error}`)
          })
        timeLeft = parseInt(intervalInput.value) * 60 // reset timer
        startCountdown() // start the countdown again
      }
      updateCountdownDisplay()
      timeLeft--
    }, 1000)
  }

  function updateCountdownDisplay() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    countdownElement.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  function simulateClick(hideButton) {
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    hideButton.dispatchEvent(event)
  }

  okButton.addEventListener("click", () => {
    consent.classList.add("up")
    console.log("okay button clicked")
  })

  updateSelectButtons()
  updateToggleButton() // Initial call to set the button text
})
// Function to simulate user interaction by dispatching a click event
function simulateClick(hideButton) {
  const stripe = document.querySelectorAll(".stripe")

    const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    hideButton.dispatchEvent(event);
    console.log("clicked");
}

// Function to keep screen awake by simulating clicks on the hidden button
function keepScreenAwake() {
    const hideButton = document.getElementById('hideButton');
    if (hideButton) {
        // Simulate a click on the hidden button every 10 seconds
        setInterval(() => simulateClick(hideButton), 10000);
    }
}

// Call the function to keep the screen awake
keepScreenAwake();
