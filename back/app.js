import { createServer } from 'node:http';
import { readUsers } from './api/usersApi.js';

createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    let url;
    if (req.url) {
        url = new URL(req.url, `http://${req.headers.host}`);
    } else {
        console.log("req.url is undefined");
        res.statusCode = 400; // Bad Request
        res.end(JSON.stringify({ error: 'URL is undefined' }));
        return;
    }

    const method = req.method;
    let response = {};

    switch (url.pathname) {
        case '/':
            console.log("home");
            response = { message: "Home" };
            break;
        case '/users':
           if (method === 'GET') {
                console.log("Users");
                response = await readUsers();
            }
            break;
        case '/projects':
            console.log("Projets");
            response = { message: "Projects" };
            break;
        default:
            res.statusCode = 404;
            response = { error: 'Not Found' };
    }

    res.end(JSON.stringify(response));
}).listen(3002, () => {
    console.log("Server is running on port 3002");
});
