const http = require("http");
const url = require('node:url');
const PORT = 8080;

let grocery_list = [];

function makeItem(name, price, quantity, purchased){
    return {name: `${name}`,
            price: `${price}`,
            quantity: `${quantity}`,
            purchased: `${purchased}`};}
const server = http.createServer((req, res) => {

    // GET
    if (req.method === 'GET'){//view grocery list
        res.writeHead(200, { 'Content-Type': 'application/json'});
        data = [];
        grocery_list.forEach((item, index) => {
            data.push({idx: index + 1,
            name: `${item.name}`,
            price: `${item.price}`,
            quantity: `${item.quantity}`,
            purchased: `${item.purchased}`})
        })
        res.end(`list: ${JSON.stringify(data)}`);
    //POST
    }else if(req.method === 'POST'){//add to grocery list
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            // you are meant to store this data somewhere
            // maybe a database??
            grocery_list.push(makeItem(data.name, data.price, data.quantity, data.purchased));
            console.log(`name is ${data.name}`);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Resource Created Successfully!'}));
        });

    }else if(req.method === "PUT"){//edit item
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            grocery_list.forEach(item => {
                if(item.name === data.name){
                    item.purchased = true;
                }
            })
            console.log(grocery_list);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Resource Changed Successfully!'}));
        });
    }else if(req.method === "DELETE"){//delete item from grocery list
        
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                grocery_list.forEach((item,index) => {
                    if(item.name === data.name){
                        delete grocery_list[index];
                    }
                })
                console.log(grocery_list);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Resource Changed Successfully!'}));
            });
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }

})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})

//{"name": "water", "price": 1, "quantity": 2, "purchased": false }