const baseUrl = "https://deckofcardsapi.com/api/deck";
let deck_id;

function displayCardImage(card) {
    const imageContainer = document.getElementById("card-container");
    const imageElement = document.createElement("img");
    imageElement.src = card;
    imageContainer.appendChild(imageElement);
}

async function dealNewCard() {
    if (!deck_id) {
        console.log("No deck available. Create a new deck first.");
        return;
    }

    try {
        const response = await axios.get(`${baseUrl}/${deck_id}/draw/?count=1`);
        if (response.data.remaining === 0) {
            console.log("The deck is empty.");
            document.getElementById("dealButton").disabled = true;
            return;
        }

        console.log(
            `Your card is the ${response.data.cards[0].value} of ${response.data.cards[0].suit}`
        );

        let cardImage = response.data.cards[0].images.png;
        displayCardImage(cardImage);
        console.log(`Cards remaining: ${response.data.remaining}`);
    } catch (error) {
        console.error("Error while drawing a card:", error);
    }
}

async function newDeck() {
    try {
        const response = await axios.get(`${baseUrl}/new/shuffle`);
        deck_id = response.data.deck_id;
        console.log(`New deck created with deck_id: ${deck_id}`);
        document.getElementById("dealButton").disabled = false;
        await dealNewCard();
    } catch (error) {
        console.error("Error while creating a new deck:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await newDeck();
});

const dealButton = document.getElementById("dealButton");
dealButton.addEventListener("click", dealNewCard);
