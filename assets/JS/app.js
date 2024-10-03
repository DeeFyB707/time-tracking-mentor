document.addEventListener("DOMContentLoaded", function () {
  let insideMain = document.getElementById('insideRow');
  let daily = document.getElementById('daily');
  let weekly = document.getElementById('weekly');
  let monthly = document.getElementById('monthly');

  // Default time frame is weekly
  let currentFrame = 'weekly';
  let timeData;

  // Fetch the JSON data
  fetch('data.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log("Data fetched successfully: ", data);
          timeData = data;  
          displayCards(data, currentFrame);  
          setActiveButton(weekly); // Set the Weekly button as active on load
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });

  // Event listeners for the buttons
  daily.addEventListener('click', () => {
      setActiveButton(daily);
      displayCards(timeData, 'daily');
  });

  weekly.addEventListener('click', () => {
      setActiveButton(weekly);
      displayCards(timeData, 'weekly');
  });

  monthly.addEventListener('click', () => {
      setActiveButton(monthly);
      displayCards(timeData, 'monthly');
  });

  // Function to set active button
  function setActiveButton(activeButton) {
      let buttons = document.querySelectorAll('.switchBtns');
      buttons.forEach(button => {
          button.classList.remove('active');
      });
      activeButton.classList.add('active');
  }

  // Function to display cards based on the time frame
  function displayCards(data, timeframe) {
      insideMain.innerHTML = ''; // Clear existing cards
      data.forEach(function (item) {
          let col3 = document.createElement('div');
          col3.classList.add('col-lg-4', 'col-md-6', 'col-12');

          let cardBody = document.createElement('div');
          cardBody.classList.add('w-100', 'rightCardsBody', 'pt-5');

          switch (item.title) {
              case "Work":
                  cardBody.classList.add('bg-work');
                  break;
              case "Play":
                  cardBody.classList.add('bg-play');
                  break;
              case "Study":
                  cardBody.classList.add('bg-study');
                  break;
              case "Exercise":
                  cardBody.classList.add('bg-exercise');
                  break;
              case "Social":
                  cardBody.classList.add('bg-social');
                  break;
              case "Self Care":
                  cardBody.classList.add('bg-selfcare');
                  break;
          }

          let insideCardsBody = document.createElement('div');
          insideCardsBody.classList.add('w-100', 'insideCards', 'p-4');

          let title = document.createElement('h6');
          title.innerText = item.title;
          title.classList.add('timeHead');

          let contextMenuBtn = document.createElement('button');
          contextMenuBtn.classList.add('contextMenu');
          contextMenuBtn.setAttribute('type', 'button');

          let flexDiv = document.createElement('div');
          flexDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'w-100');

          let currentTime = document.createElement('p');
          currentTime.innerHTML = `${item.timeframes[timeframe].current}hrs`;
          currentTime.classList.add('times');

          let previousTime = document.createElement('p');
          previousTime.innerHTML = `Last Week: ${item.timeframes[timeframe].previous}hrs`;
          previousTime.classList.add('last');

          flexDiv.appendChild(title);
          flexDiv.appendChild(contextMenuBtn);
          insideCardsBody.appendChild(flexDiv);
          insideCardsBody.appendChild(currentTime);
          insideCardsBody.appendChild(previousTime);
          cardBody.appendChild(insideCardsBody);
          col3.appendChild(cardBody);
          insideMain.appendChild(col3);
      });
  }
});
