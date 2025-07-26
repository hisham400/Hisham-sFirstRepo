document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('predictionForm');
  const result = document.getElementById('result');
  const successMessage = document.getElementById('successMessage');
  const clearButton = document.getElementById('clearPrediction');

  // Load saved prediction
  const saved = localStorage.getItem('eplPrediction');
  if (saved) {
    const prediction = JSON.parse(saved);
    showPrediction(prediction);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const winner = document.getElementById('winner').value.trim();
    const top4 = document.getElementById('top4').value.trim();
    const relegated = document.getElementById('relegated').value.trim();
    const topScorer = document.getElementById('topScorer').value.trim();

    const top4Teams = top4.split(',').map(team => team.trim()).filter(Boolean);
    const relegatedTeams = relegated.split(',').map(team => team.trim()).filter(Boolean);

    // Validation
    if (top4Teams.length !== 4) {
      alert("Please enter exactly 4 teams in the Top 4.");
      return;
    }
    if (relegatedTeams.length !== 3) {
      alert("Please enter exactly 3 teams in the Relegation list.");
      return;
    }

    const prediction = { winner, top4, relegated, topScorer };

    // Save
    localStorage.setItem('eplPrediction', JSON.stringify(prediction));

    // Feedback
    successMessage.style.display = 'block';
    setTimeout(() => successMessage.style.display = 'none', 3000);

    showPrediction(prediction);
  });

  clearButton.addEventListener('click', () => {
    localStorage.removeItem('eplPrediction');
    result.style.display = 'none';
    form.reset();
    successMessage.textContent = '🗑️ Prediction Cleared';
    successMessage.style.display = 'block';
    setTimeout(() => successMessage.style.display = 'none', 2000);
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
