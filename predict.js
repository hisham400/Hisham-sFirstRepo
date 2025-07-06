const form = document.getElementById('predictionForm');
const result = document.getElementById('result');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const winner = document.getElementById('winner').value;
  const top4 = document.getElementById('top4').value;
  const relegated = document.getElementById('relegated').value;
  const topScorer = document.getElementById('topScorer').value;

  result.innerHTML = `
    <h3>Your Predictions:</h3>
    <p><strong>League Winner:</strong> ${winner}</p>
    <p><strong>Top 4:</strong> ${top4}</p>
    <p><strong>Relegated Teams:</strong> ${relegated}</p>
    <p><strong>Top Scorer:</strong> ${topScorer}</p>
  `;
  result.style.display = 'block';
});
