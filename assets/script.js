var asBtn = document.querySelector(".asBtn");
var navButton = document.querySelector(".navButton");
var dailySurvey = document.querySelector(".dailySurvey");
var sectionBlock = document.querySelector(".sectionBlock");
var quoteDay = document.querySelector(".quote-day");
var tipDay = document.querySelector(".health-tip");
const apiKey = "431/rZ1NcazKVlEfxzCcFA==CPMgiJ8hSmqD6dDe"
const url = "https://api.api-ninjas.com/v1/quotes?category=inspirational"
var dayDisplayEl = $('#day-display');
var btnMood = document.querySelector('#btnMood');
var btnHealth = document.querySelector('#btnHealth');
var btnPain = document.querySelector("#btnPain");
var btnSleep = document.querySelector("#btnSleep");
var moodSurveyBtn = document.querySelector(".moodSBtn");
var ohSurveyBtn = document.querySelector(".ohButton");
var painSurveyBtn = document.querySelector(".painButton");
var sleepSurveyBtn = document.querySelector(".sleepButton");
var warningModal = document.querySelector("#warning-modal");
var modalCloseBtn = document.querySelector(".close");
var surveyChart = document.querySelector("#surveyChart");
var chartBtnMood = document.querySelector("#chartBtnMood");
var chartBtnHealth = document.querySelector("#chartBtnHealth");
var chartBtnPain = document.querySelector("#chartBtnPain");
var chartBtnSleep = document.querySelector("#chartBtnSleep");
var surveyChartJSObj = null;

var moodArray = JSON.parse(localStorage.getItem("moodSurvey")) || [];
var healthArray = JSON.parse(localStorage.getItem("healthSurvey")) || [];
var painArray = JSON.parse(localStorage.getItem("painSurvey")) || [];;
var sleepArray = JSON.parse(localStorage.getItem("sleepSurvey")) || [];

// handle displaying the time
function displayDay() {
    var currentDay = dayjs().format('MMM DD, YYYY');
    dayDisplayEl.text(currentDay);
}

displayDay();

function displaySurveyChart(chartLabel, surveyData) {
    if (surveyChartJSObj) {
        surveyChartJSObj.destroy();
        surveyChartJSObj = null;
    }
    var labels = []

    for (var i = 0; i < surveyData.length; i++) {
        labels.push(i + 1)
    }
    console.log(`labels ${labels} values ${surveyData}`)
    var surveyDataToChart = {
        labels: labels,
        datasets: [{
            label: chartLabel,
            data: surveyData,
            fill: false,
            borderColor: '#548464',
            tension: 0.1
        }]
    };


    surveyChartJSObj = new Chart(surveyChart, {
        type: 'line',
        data: surveyDataToChart,

    });
}
chartBtnMood.addEventListener('click', function () {
    displaySurveyChart("Mood History", moodArray)

});

chartBtnHealth.addEventListener('click', function () {
    displaySurveyChart("Overall Health History", healthArray)

});

chartBtnPain.addEventListener('click', function () {
    displaySurveyChart("Pain History", painArray)

});

chartBtnSleep.addEventListener('click', function () {
    displaySurveyChart("Sleep History", sleepArray)

});


//function that checks input type radio for user input and saves to local storage

function getSelectedRadioMood() {

    console.log("hello")
    var selectedMood = document.querySelector(
        'input[name="mood"]:checked');

    console.log(selectedMood)
    if (selectedMood) {
        selectedMood.checked = false;
        var selectedRating = moodArray.push(parseInt(selectedMood.value)); // parseInt converts the value to an integer
        checkSelectedRating(selectedRating);
    }
}


function checkSelectedRating(value) {
    if (value <= 4) {
        warningModal.style.display = "block";

        modalCloseBtn.onclick = function () {
            warningModal.style.display = "none";
        }
    };

    //populateStorage(); still working on it
}

moodSurveyBtn.addEventListener('click', function () {
    getSelectedRadioMood()
    populateStorage()

})

function getSelectedRadioHealth() {

    var selectedHealth = document.querySelector(
        'input[name="oh"]:checked');

    console.log(selectedHealth)
    if (selectedHealth) {
        selectedHealth.checked = false;
        var selectedRating = healthArray.push(parseInt(selectedHealth.value));
        checkSelectedRating(selectedRating);
    }
}

ohSurveyBtn.addEventListener('click', function () {
    getSelectedRadioHealth()
    populateStorage()
})

function getSelectedRadioPain() {

    var selectedPain = document.querySelector(
        'input[name="pain"]:checked');

    console.log(selectedPain)
    if (selectedPain) {
        selectedPain.checked = false;
        var selectedRating = painArray.push(parseInt(selectedPain.value));
        checkSelectedRating(selectedRating);
    }
}
painSurveyBtn.addEventListener('click', function () {
    getSelectedRadioPain()
    populateStorage()
})

function getSelectedRadioSleep() {


    var selectedSleep = document.querySelector(
        'input[name="sleep"]:checked');

    console.log(`selectedSleep:${selectedSleep}`)
    if (selectedSleep) {
        selectedSleep.checked = false;
        var selectedRating = sleepArray.push(parseInt(selectedSleep.value));
        checkSelectedRating(selectedRating);
        console.log(`newArray: ${sleepArray}`)
    }
}

sleepSurveyBtn.addEventListener('click', function () {
    getSelectedRadioSleep()
    populateStorage()

})

function populateStorage() {
    localStorage.setItem("moodSurvey", JSON.stringify(moodArray));
    localStorage.setItem("healthSurvey", JSON.stringify(healthArray));
    localStorage.setItem("painSurvey", JSON.stringify(painArray));
    localStorage.setItem("sleepSurvey", JSON.stringify(sleepArray));
}


//function to recognize what number is checked in each of the categories

//function that takes the data and place it in a cumulative array for that category
//and stores the array in local storage


// function that retreives the quote of the day from quote API and places it in the appropriate "card" (this function should include the building of the card from bootstrapand appending elements)

function displayQuoteOfTheDay() {
    quoteDay.innerHTML = ""



    async function getapi(urlParam) {
        const response = await fetch(urlParam,
            { headers: { 'X-Api-Key': apiKey } });
        var data = await response.json();


        const card = document.createElement("div")
        card.setAttribute("class", "card quoteOfDay")
        const cardHeader = document.createElement("div")
        cardHeader.setAttribute("class", "card-header")
        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        const span = document.createElement("span")
        const h3 = document.createElement("h3")
        h3.textContent = "Quote of the Day"
        console.log("I got to here!")
        h3.append(span)
        cardHeader.append(h3)
        cardBody.append(data[0].quote)
        card.append(cardHeader, cardBody)
        quoteDay.append(card)

    }

    var quoteObject = getapi(url);

}

displayQuoteOfTheDay()

/*function that retreives the health tip of the day from google API and places it in the appropriate "card"*/

function displayTipOfTheDay() {
    tipDay.innerHTML = ""

    function getRandomItem(healthTips) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * healthTips.length);

        // get random item
        const item = healthTips[randomIndex];

        return item;
    }

    const result = getRandomItem(healthTips);
    console.log(result);

    const card = document.createElement("div")
    card.setAttribute("class", "card tipOfDay")
    const cardHeader = document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    const cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    const span = document.createElement("span")
    const h3 = document.createElement("h3")
    h3.textContent = "Tip of the Day"
    console.log("I got to here!")
    h3.append(span)
    cardHeader.append(h3)
    cardBody.append(result)
    card.append(cardHeader, cardBody)
    quoteDay.append(card)
    console.log("and here!")
}

displayTipOfTheDay();

