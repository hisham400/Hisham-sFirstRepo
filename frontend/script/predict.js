document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("predictionForm");
  const result = document.getElementById("result");
  const communityStats = document.getElementById("communityStats");
  const successMessage = document.getElementById("successMessage");
  const clearButton = document.getElementById("clearPrediction");

  const saved = localStorage.getItem("eplPrediction");
  if (saved) {
    showPrediction(JSON.parse(saved));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const winner = document.getElementById("winner").value;
    const top4 = document.getElementById("top4").value.trim();
    const relegated = document.getElementById("relegated").value.trim();
    const topScorer = document.getElementById("topScorer").value.trim();

    const top4Teams = top4.split(",").map(t => t.trim()).filter(Boolean);
    const relegatedTeams = relegated.split(",").map(t => t.trim()).filter(Boolean);

    if (top4Teams.length !== 4) {
      alert("Please enter exactly 4 teams for the Top 4.");
      return;
    }

    if (relegatedTeams.length !== 3) {
      alert("Please enter exactly 3 relegated teams.");
      return;
    }

    const prediction = { winner, top4, relegated, topScorer };
    localStorage.setItem("eplPrediction", JSON.stringify(prediction));

    successMessage.textContent = "🎉 Prediction Saved!";
    successMessage.style.display = "block";
    setTimeout(() => successMessage.style.display = "none", 2500);

    showPrediction(prediction);
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem("eplPrediction");
    form.reset();
    result.style.display = "none";
    communityStats.style.display = "none";

    successMessage.textContent = "🗑️ Prediction Cleared";
    successMessage.style.display = "block";
    setTimeout(() => successMessage.style.display = "none", 2000);
  });

  function randomPercentage(min = 12, max = 20) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function showPrediction(data) {
    result.innerHTML = `
      <h3>Your Prediction</h3>
      <p><strong>Winner:</strong> ${data.winner}</p>
      <p><strong>Top 4:</strong> ${data.top4}</p>
      <p><strong>Relegated:</strong> ${data.relegated}</p>
      <p><strong>Top Scorer:</strong> ${data.topScorer}</p>
    `;
    result.style.display = "block";

    showCommunityStats(data.winner, data.topScorer);
  }

  function showCommunityStats(winner, scorer) {
    const winnerPercent = randomPercentage();
    const scorerPercent = randomPercentage();

    communityStats.innerHTML = `
      <h3>📊 Community Predictions</h3>
      <p><strong>${winner}</strong> chosen by <strong>${winnerPercent}%</strong> of users</p>
      <p><strong>${scorer}</strong> backed by <strong>${scorerPercent}%</strong> for Golden Boot</p>
      <p style="font-size:0.9rem;color:#555;">
        Percentages are simulated using community benchmarks
      </p>
    `;
    communityStats.style.display = "block";
  }
});
