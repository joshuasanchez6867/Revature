const addContainer = document.querySelector("#addItem");
const nameContainer = document.querySelector("#itemNameBox");
const priceContainer = document.querySelector("#priceBox");
const quantityContainer = document.querySelector("#quantity");
const submitButton = document.querySelector("#submitButton");

async function getItems() {
    let url = 'http://localhost:3000/viewGroceries';
    try {
        let response = await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            },
            method: "GET"
        });
        let data = await response.json();
        console.log(data);
    } catch(err) {
        console.error(err);
    }
}
submitButton.addEventListener("click", getItems);