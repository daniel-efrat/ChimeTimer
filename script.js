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
  const hiddenButton = document.getElementById("hiddenButton")
  const video = document.getElementById("vid")

  // Define default sound name and file
  let currentSoundName = ""
  let currentSoundFile = "sounds/chimes.mp3"

  let countdownInterval
  let timeLeft
  let interactionInterval

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
    startSimulatingUserInteraction()
  })

  stopButton.addEventListener("click", () => {
    clearInterval(countdownInterval)
    clearInterval(interactionInterval)
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

  function startSimulatingUserInteraction() {
    console.log("Starting simulation of user interaction.")
    interactionInterval = setInterval(() => {
      simulateClick(hiddenButton)
      console.log("Simulated user interaction.")
    }, 30000) // Simulate interaction every 30 seconds
  }

  function simulateClick(element) {
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    element.dispatchEvent(event)
  }

  hiddenButton.addEventListener("click", () => {
    console.log("Hidden button clicked")
  })

  updateSelectButtons()
  updateToggleButton() // Initial call to set the button text
})
