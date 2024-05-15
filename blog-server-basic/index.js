import express from "express"
import cors from "cors"
import ethers from "ethers"

const app = express()
const port = 3000


//middlewares app.use
app.use(cors())
app.use(express.json()); //this is used to parse the request body i.e. it makes "req.body" functionable.

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next(); // Call the next middleware function in the pipeline
};

app.use(loggerMiddleware);

//route handlers (get,post,put,patch,delete)
app.get('/userId/:user/password/:pass', (req, res) => {
    return res.send(req.params)
})

app.get("/get-salt", (req, res) => {
    let randomSalt = `0x${Buffer.from(
        ethers.utils.concat([
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes("opensea.io")).slice(0, 10),
            Uint8Array.from(Array(20).fill(0)),
            ethers.utils.randomBytes(8),
        ])
    ).toString("hex")}`;
    randomSalt = ethers.utils.formatUnits(randomSalt, 0);

    return res.send({salt: randomSalt});
    // return res.json(randomSalt);
})

//-------------------------------------------------------------------
// GET request
app.get('/users', (req, res) => {
    res.send('GET request to the users resource');
  });
  
  // POST request
  app.post('/users', (req, res) => {
    const { username, email } = req.body;
    res.json({ message: `POST request to create user with username ${username} and email ${email}` });
  });
  
  // PUT request
  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    res.json({ message: `PUT request to update user with ID ${id}. New username: ${username}, New email: ${email}` });
  });
  
  // DELETE request
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `DELETE request to delete user with ID ${id}` });
  });
  
  // PATCH request
  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    res.json({ message: `PATCH request to partially update user with ID ${id}. New username: ${username}, New email: ${email}` });
  });
  
  // OPTIONS request
  app.options('/users', (req, res) => {
    res.send('OPTIONS request to the users resource');
  });
  
  // HEAD request
  app.head('/users2', (req, res) => {
    // Simulate fetching user data (not actually fetching, just an example)
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Alice Johnson' }
    ];
  
    // Set headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
  
    // Send only headers without body
    res.status(200).end();
  });




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})