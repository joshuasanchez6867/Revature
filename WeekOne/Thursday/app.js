const http = require("http");
const { createLogger, transports, format} = require('winston');

const PORT = 8080;
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.File({ filename: 'app.log'}), // log to a file
    ]
})
let grocery_list = [];
logger.info("New Session");

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
        logger.info('Return all items for GET request}');

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
            logger.info(`Item: "${data.name}" added with POST request`);
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
            logger.info(`Item: "${data.name}" purchased with PUT request`);
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
                logger.info(`Item: "${data.name}" deleted with DELETE request`);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Resource Deleted Successfully!'}));
            });
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        logger.error("Bad request");

        res.end('Not Found');
    }

})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})

//{"name": "water", "price": 1, "quantity": 2, "purchased": false }