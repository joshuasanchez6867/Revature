const addContainer = document.querySelector("#addItem");
const nameContainer = document.querySelector("#itemNameBox");
const priceContainer = document.querySelector("#priceBox");
const quantityContainer = document.querySelector("#quantity");
const submitButton = document.querySelector("#submitButton");

async function getItems(){
    let url = '/groceryAPI/viewGroceries';
    try{
        let response = await fetch(url, {
            method: "GET"
        });
        let data = await response.json();
        console.log(data);
    }catch(err){
        console.error(err);
    }
}
submitButton.addEventListener("click", getItems);

