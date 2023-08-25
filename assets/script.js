var asBtn = document.querySelector(".asBtn");
var navButton = document.querySelector(".navButton");
var dailySurvey = document.querySelector(".dailySurvey");
var sectionBlock = document.querySelector(".sectionBlock");
var quoteDay = document.querySelector(".quote-day");
console.log(quoteDay)
const apiKey = "431/rZ1NcazKVlEfxzCcFA==CPMgiJ8hSmqD6dDe"
const url = "https://api.api-ninjas.com/v1/quotes?category=inspirational"
var dayDisplayEl = $('#day-display');

// handle displaying the time
function displayDay() {
  var currentDay = dayjs().format('MMM DD, YYYY');
  dayDisplayEl.text(currentDay);
}

displayDay();

//add the rest of the const or var that need to be done once JD has finished with entering all of the checkboxes

//add current date to the top of the header using dayjs

//TODO: prefix on checkboxes because they need to be unique
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
        console.log("hello JD");
        console.log(data);
        // return data;


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
        console.log(data)
        cardBody.append(data[0].quote)
        card.append(cardHeader, cardBody)
        quoteDay.append(card)
        console.log("and here!")
    }

    var quoteObject = getapi(url);

}
displayQuoteOfTheDay()

//function that retreives the health tip of the day from google API and places it in the appropriate "card" (this function should include the building of the card from bootstrap and appending elements)

//function that retreives the cumulative array produced earlier and uses it to create a chart - use the API we discussed in the planning session for this -place chart in a card that is created through bootstrap and appending elements

//function that checks for last date of checkbox entries and gives warning if it was not "yesterday" - then allows user to fill in yesterday and todays numbers

//function that takes the average of the last 7 days and uses it for any day that is not filled in further back then yesterday so that there are numbers for the graph - displays warning that this is what is happening and reminds user to come every calendar day to fill out the chart for best results

//add function to check if in the last 5 days there is any category that is less than 4 for 4 consecutive days if so then prompt user to click resources below and seek help if necessary

//add listener event for mood at top (triggers chart to be updated with new info for mood )
//add listener event for mood on sidebar (triggers the function that grabs and stores the data for mood)
//add listener event for overall health at top (triggers chart to be updated with new info for overall health)
//add listener event for overall health on sidebar(triggers the function that grabs and stores the data for overall health)
//add listener event for pain at top (triggers chart to be updated with new info for pain)
//add listener event for pain on sidebar(triggers the function that grabs and stores the data for pain)
//add listener event for sleep at top (triggers chart to be updated with new info for sleep)
//add listener event for sleep on sidebar(triggers the function that grabs and stores the data for sleep)
