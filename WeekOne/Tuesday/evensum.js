
function evenSum(arr){
    let sum = 0;

    for(let x of arr){
        if(x % 2 == 0){
            sum += x;
        }
    }
    return sum;
}
let arr = [ 12, 11, 13, 5, 6, 7 ]; 
console.log(evenSum(arr));