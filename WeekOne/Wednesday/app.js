// Import the readline module for handling user input in the console
const readline = require('readline');
const groceryAPI = require('./grocery.js');
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});
grocerylist = [];
state = 'n', exce = 'a';
console.log("Add to list (a), Delete from list (d), or mark item as bought(b)");

rl.on('line', (line) => {

    if(state == 'n'){
      state = line[0];
      exce = line[0];
    }
    else if(state === 'a'){
      console.log("Enter item: name, quanity, price, bought(bool(true/false))");
      state = 'r';
    }
    else if(state=== 'd'){
      console.log("Enter the name of the item you want deleted"); 
      state = 'r';
    }
    else if(state === 'b'){
      console.log("Enter the name of the item you want marked as bought"); 
      state = 'r';
    }
    else if(state === 'r'){
      grocerylist = groceryAPI.execute(exce, grocerylist, line);
      console.log(grocerylist)
      state = 'n';
      console.log("Add to list (a), Delete from list (d), or mark item as bought(b)");
    }
    else{
      console.log('Invalid Input');
      state = 'n'
    }
});

rl.once('close', () => {//once its all done
   console.log('End of Session');
 });
