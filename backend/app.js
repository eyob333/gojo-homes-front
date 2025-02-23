import fs from 'node:fs/promises'
import bodyParser from 'body-parser';
import express from 'express';



const app = express()

app.use(express.static('images'))
app.use(bodyParser.json())
app.use( (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/bestOffers',  async(req, res) => {
    const fileContent = await fs.readFile( './data/data.json')
    const data = JSON.parse(fileContent)
    res.status(200).json({data: data})
})


app.post('/bestOffers', async (req, res) => {
  const data = req.body.data;
  await fs.writeFile('./data/data.json', JSON.stringify(data));
  res.status(200).json({ message: 'User data updated!' });
});

app.listen(8080, () => {
    console.log('running on port 8080')
})