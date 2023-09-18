const { createLogger, transports, format} = require('winston');
function parseBoolean(str) {
  return /^true$/i.test(str);
}
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
            price: parseFloat(`${price}`),
            quantity: parseInt(`${quantity}`),
            purchased: parseBoolean(`${purchased}`)};}

const server = ((req, res) => {
    // GET
    if (req.method === 'GET'){//view grocery list
        data = [];
        grocery_list.forEach((item, index) => { data.push({
            idx: index + 1,
            name: `${item.name}`,
            price: `${item.price}`,
            quantity: `${item.quantity}`,
            purchased: `${item.purchased}`})
        })
        logger.info('Return all items for GET request}');
        res.end = 'list: '+ `${JSON.stringify(data)}`;
        return res;
    //POST
    }
    else if(req.method === 'POST')
    {//add to grocery list
        const data = JSON.parse(req.body);
        grocery_list.push(makeItem(data.name, data.price, data.quantity, data.purchased));
        logger.info(`Item: "${data.name}" added with POST request`);
        res.end = JSON.stringify({message: 'Resource Created Successfully!'});
        return res;
    }
    else if(req.method === "PUT")
    {//edit item
       
        const data = JSON.parse(req.body);
        grocery_list.forEach(item => {
            if(item.name === data.name){
                item.purchased = true;
            }
        })
        logger.info(`Item: "${data.name}" purchased with PUT request`);
        res.end = JSON.stringify({message: 'Resource Changed Successfully!'});
        return res;
    }
    else if(req.method === "DELETE")
    {//delete item from grocery list

        const data = JSON.parse(req.body);
        grocery_list.forEach((item,index) => {
            if(item.name === data.name){
                delete grocery_list[index];
            }
        })
        logger.info(`Item: "${data.name}" deleted with DELETE request`);
        res.end = JSON.stringify({message: 'Resource Deleted Successfully!'});
        return res;
    }
    else
    {
        logger.error("Bad request");
        res.status = 404;
        res.end = JSON.stringify({message:'Not Found'});
        return res;
    }
})

module.exports = server;