const express = require('express') ; 
const BodyParser = require('body-parser') ; 
const sequelize = require('./model/product');
const routes = require('./routes/booking') ; 
const bodyParser = require('body-parser');

const app = express() ; 

app.use(bodyParser.json());
app.use(express.static('main')) ; 
 
app.use('/product', routes);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log(`SERVER RUNNING ON PORT 3000`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });