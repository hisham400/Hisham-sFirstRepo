document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('predictionForm');
    const result = document.getElementById('result');
  
    // Load saved prediction if exists
    const saved = localStorage.getItem('eplPrediction');
    if (saved) {
      const prediction = JSON.parse(saved);
      showPrediction(prediction);
    }
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const prediction = {
        winner: document.getElementById('winner').value,
        top4: document.getElementById('top4').value,
        relegated: document.getElementById('relegated').value,
        topScorer: document.getElementById('topScorer').value
      };
  
      // Save to localStorage
      localStorage.setItem('eplPrediction', JSON.stringify(prediction));
  
      // Show result
      showPrediction(prediction);
    });
  
    function showPrediction(data) {
      result.innerHTML = `
        <h3>Your Predictions:</h3>
        <p><strong>League Winner:</strong> ${data.winner}</p>
        <p><strong>Top 4:</strong> ${data.top4}</p>
        <p><strong>Relegated Teams:</strong> ${data.relegated}</p>
        <p><strong>Top Scorer:</strong> ${data.topScorer}</p>
      `;
      result.style.display = 'block';
    }
  });
  