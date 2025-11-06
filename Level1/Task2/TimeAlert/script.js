document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('greetBtn');
  const alertEl = document.getElementById('alert');
  const alertMsg = document.getElementById('alertMsg');
  const dismiss = document.getElementById('dismiss');

  function getGreeting(hour) {
    if (hour >= 5 && hour < 12) return 'Good morning!';
    if (hour >= 12 && hour < 17) return 'Good afternoon!';
    if (hour >= 17 && hour < 21) return 'Good evening!';
    return 'Good night!';
  }

  function openAlert(text) {
    alertMsg.textContent = text;
    alertEl.hidden = false;
  }
  function closeAlert() { alertEl.hidden = true; }

  btn.addEventListener('click', () => {
    const hour = new Date().getHours();
    openAlert(getGreeting(hour));
  });
  dismiss.addEventListener('click', closeAlert);
  alertEl.addEventListener('click', (e) => { if (e.target === alertEl) closeAlert(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAlert(); });
});
/*
          "Your afternoon success depends on the sophistication of your approach and the clarity of your vision.",
          "Midday mastery requires the precision of luxury and the focus of intentional effort.",
          "Continue with the elegance of refined purpose and the strength of deliberate action."
        ]
      },
      evening: {
        luxury: [
          "Evening reflection invites the appreciation of a day crafted with intention and executed with grace.",
          "As twilight approaches, let your accomplishments reflect the sophistication of your journey.",
          "Nightly contemplation calls for the recognition of efforts executed with luxury and precision."
        ],
        minimal: [
          "Evening closure. Day complete. Purpose fulfilled.",
          "Night transition. Day accomplished. Mind at ease.",
          "Evening rest. Day concluded. Energy renewed."
        ],
        elegant: [
          "May your evening carry the satisfaction of work completed with dignity and executed with grace.",
          "As day concludes, let your achievements reflect the refinement of your professional standards.",
          "Evening elegance begins with the appreciation of efforts executed with purpose and precision."
        ],
        sophisticated: [
          "Your evening satisfaction depends on the recognition of accomplishments achieved with sophistication.",
          "Nightly reflection requires the balance of ambition fulfilled and grace maintained.",
          "Conclude with the dignity of luxury and the satisfaction of purposeful execution."
        ]
      },
      night: {
        luxury: [
          "Nighttime contemplation invites the luxury of reflection and the grace of intentional rest.",
          "As darkness falls, let your mind find the sophistication of peaceful resolution.",
          "Late evening calls for the refinement of rest and the strength of tomorrow's intentions."
        ],
        minimal: [
          "Night stillness. Mind quiet. Energy restored.",
          "Late hours. Simple rest. Renewed focus.",
          "Night peace. Day ended. Mind calm."
        ],
        elegant: [
          "May your night carry the grace of restful resolution and the strength of tomorrow's potential.",
          "As hours wind down, let your rest be as refined as your day's accomplishments.",
          "Nightly elegance requires the balance of rest and the anticipation of future success."
        ],
        sophisticated: [
          "Your night's rest depends on the sophistication of peaceful resolution and the clarity of tomorrow's vision.",
          "Late evening mastery requires the precision of luxury and the focus of intentional preparation.",
          "Rest with the dignity of luxury and the anticipation of purposeful renewal."
        ]
      }
    };

    const messageArray = messages[timeOfDay][style];
    return messageArray[Math.floor(Math.random() * messageArray.length)];
  }

  function addToHistory(title, message, time) {
    // Add to beginning of array
    greetingHistoryArray.unshift({
      title: title,
      message: message,
      time: time
    });

    // Limit array size
    if (greetingHistoryArray.length > maxHistoryItems) {
      greetingHistoryArray = greetingHistoryArray.slice(0, maxHistoryItems);
    }

    // Update history display
    updateHistoryDisplay();
  }

  function updateHistoryDisplay() {
    // Clear current history
    greetingHistory.innerHTML = '';

    // Add items to history
    greetingHistoryArray.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      const timeString = item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      historyItem.innerHTML = `
                <div class="history-time">${timeString}</div>
                <div class="history-message">${item.message}</div>
            `;

      greetingHistory.appendChild(historyItem);
    });
  }

  function toggleAutoGreet() {
    // Clear existing interval
    if (autoGreetInterval) {
      clearInterval(autoGreetInterval);
    }

    // Set up new interval if enabled
    if (autoGreet.checked) {
      autoGreetInterval = setInterval(() => {
        showGreeting();
      }, 60000); // Every minute
    }
  }

  // Add some advanced effects
  greetButton.addEventListener('mousedown', function () {
    this.style.transform = 'translateY(1px) scale(0.98)';
  });

  greetButton.addEventListener('mouseup', function () {
    this.style.transform = '';
  });

  greetButton.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });

  // Add 3D effect on mouse move
  greetButton.addEventListener('mousemove', (e) => {
    const rect = greetButton.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleY = (x - centerX) / 25;
    const angleX = (centerY - y) / 25;

    greetButton.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });

  greetButton.addEventListener('mouseleave', function () {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});
*/