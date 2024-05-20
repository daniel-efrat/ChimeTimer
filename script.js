document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown")
  const startButton = document.getElementById("startButton")
  const pingSound = document.getElementById("pingSound")
  const volumeSlider = document.getElementById("volumeSlider")
  const intervalInput = document.getElementById("intervalInput")

  let countdownInterval
  let timeLeft

  startButton.addEventListener("click", () => {
    timeLeft = parseInt(intervalInput.value) * 60
    startButton.disabled = true
    startCountdown()
    pingSound.play()
  })

  volumeSlider.addEventListener("input", () => {
    pingSound.volume = volumeSlider.value
  })

  function startCountdown() {
    countdownInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdownInterval)
        pingSound.play()
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
})
