const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')

const members = require('./models/Members')
const logger = require('./middleware/Logger')


const app = express();

const PORT = process.env.PORT || 5000;
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public', 'index.html'))
// })

//handlebars middleware

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
    //set static folder

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Members App',
        members
    })
})
app.use(express.static(path.join(__dirname, '/public')))





//Member Api Routes
app.use('/api/members', require('./routes/api/members'))
    //User Api Routes
app.use('/api/users', require('./routes/api/users'))
    //custom middleware
    //custom middleware
    //app.use(logger)




//listen on port
app.listen(PORT, () => console.log(`server started on port :${PORT}`));