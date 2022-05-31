const express = require('express');
const https = require('https');
const axios = require('axios').default;
const app = express();
const port = 5000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => { 
  
  getPersonNameRandom().then(function(name) {
    
    connection.query(`INSERT INTO people (name) VALUES ('${name}')`)

    connection.query(`SELECT name FROM people`, (error, results, fields) => {
   
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>
          ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
        </ul>
      `) 
    })

  }); 
})

async function getPersonNameRandom(){
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });

  const RANDOM    = Math.floor(Math.random() * 10);
  const response  = await axios.get('https://swapi.dev/api/people',{ httpsAgent: agent });
  personName      = response.data.results;
  return personName[RANDOM].name;
} 

app.listen(port, () => {
  console.log('Server is up and running '+ port)
}) 
