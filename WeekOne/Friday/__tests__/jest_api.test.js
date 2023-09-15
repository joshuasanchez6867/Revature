const server = require('../api_app.js');
describe("Api test suite", () => {
    let res = {}, req = {};
    

    beforeAll(() => {
        console.log("Testing Begin...");
    })

    afterAll(() => {
        console.log("Testing End...");
    })

    test('Testing Empty Get', () => {
        req.method = 'GET';
        res = server(req, res);
        expect(res.end).toBe('list: []')
    })
    test('Post test', () => {
        req.method = 'POST';
        const body = {name: 'water', price: 1, quantity: 2, purchased: false};
        req.body = JSON.stringify(body);
        res = server(req, res);
        expect(res.end).toBe(JSON.stringify({message: 'Resource Created Successfully!'}));
    })
    test('Delete Test', () => {
        req.method = 'POST';
        let body = {name: 'water', price: 1, quantity: 2, purchased: false};
        req.body = JSON.stringify(body);
        res = server(req, res);
        req.method = 'DELETE';
        body = {name: 'water'}
        req.body = JSON.stringify(body);
        res = server(req, res);
        expect(res.end).toBe(JSON.stringify({message: 'Resource Deleted Successfully!'}));
    })
    test('Purchase Test', () => {
        req.method = 'POST';
        let body = {name: 'water', price: 1, quantity: 2, purchased: false};
        req.body = JSON.stringify(body);
        res = server(req, res);
        req.method = 'PUT';
        body = {name: 'water'}
        req.body = JSON.stringify(body);
        res = server(req, res);
        expect(res.end).toBe(JSON.stringify({message: 'Resource Changed Successfully!'}));
    })
    test('404 Test', () => {
        req.method = 'UPDATE';
        res = server(req, res);
        expect(res.end).toBe(JSON.stringify({message:'Not Found'}));
        expect(res.status).toBe(404);
    })
})