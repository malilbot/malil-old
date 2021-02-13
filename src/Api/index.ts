import express from 'express';
import bodyParser from 'body-parser';
import util from 'util';



async function api(client) {
  const app: express.Application = express();
  const PORT = 3000;

  const jsonParser = bodyParser.json()



  app.post('/api', jsonParser, async function (req, res) {
    console.log(req.body)
    const toeval = req.body.eval

    try {
      const evaled = await eval(toeval)
      const output = util.inspect(evaled, { depth: 3 });
      console.log(output)
      res.send(output)
    } catch (e) {

      console.log(e)
      res.send(e.stack)

    }
  })


  app.listen(PORT)

}


export { api } 