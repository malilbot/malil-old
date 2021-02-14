
import * as http from 'http'
import express from 'express';
import * as path from 'path'
import bodyParser from 'body-parser';
import * as util from "util"
import { Command } from 'discord-akairo';
export const server = async function (client) {
    const app = express();
    app.use(express.json());
    app.use(express.static("express"));
    const jsonParser = bodyParser.json();
    // default URL for website


    app.post('/api', jsonParser, async function (req, res) {
        console.log(req.body)
        const toeval = req.body.eval
        try{ 
            const evaled = await eval(toeval);
            const output = util.inspect(evaled, { depth: 3 });
            console.log(output)
            res.send(output)
        } catch(e) {
            console.log(e)
            res.send(e.stack)
        }
    })

    /*
    app.use('/', function (req, res) {
        const ip = req.headers['x-forwarded-for']



        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // set response content
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();


    });
    */
    const server = http.createServer(app);
    const port = 3000;
    server.listen(port);
    console.debug('Server listening on port ' + port);
}
