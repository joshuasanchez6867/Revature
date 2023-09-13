const greeting = "hello";

function makeGroceryItem(name, quantity, price, boughtBool){
    return { name: `${name}`,
                quantity: `${quantity}`,
                price: `${price}`,
                boughtBool: `${boughtBool}`};
}
function execute(exce, grocerylist, line){
    switch (exce) {
        case "a":
           return addtoList(grocerylist, line);
        case "b":
            return markAsRead(arr, line);
        case "d":
            return deleteFromList(arr, line);
        default:
            console.log("invalid exec");
            break;
    }
   return grocerylist;
}
function addtoList(arr, line){
    let words = line.split(' ');
    arr.push(makeGroceryItem(words[0],words[1],words[2],words[3]));
    return arr
}

function markAsRead(arr, line){
    let words = line.split(' ');
    for(let groc of arr){
        if(groc.name === words[0]){
            groc.boughtBool = true;
        }
    }
    return arr
}

function deleteFromList(arr, line){
    let words = line.split(' ');
    for(let x in arr){
        if(arr[x].name === words[0]){
            delete arr[x] 
        }
    }
    return arr
}

// we export them out using module.exports
// this is an object that contains the things that we want to export
module.exports = {
    execute
}