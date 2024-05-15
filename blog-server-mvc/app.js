import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { router } from './routes/blogRoutes.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'


// Load environment variables from .env file
dotenv.config();

const app = express();


//db connection
mongoose.connect(process.env.DB_URL)
    .then((result) => {
        console.log('connected')
        app.listen(3000)
    }
    ).catch((err) => console.log(err))


//middleware to authenticate user thru API_KEY
const authenticateUser = (req, res, next) => {

    const apiKey = req.headers['x-api-key'];
    console.log(apiKey)
    
    if(apiKey === process.env.VITE_NODE_API_KEY)
    {
        next();
    } else{
        res.status(401).json({error: "Invalid API KEY"})
    }
}


//registering view engine
app.set('view engine', 'ejs')//uses a template engine, i.e. renders JS into meaningful html

//middlewares & static files
app.use(express.static('public'))   //serves static file to the front-end i.e. explicit access of files to client
app.use(morgan('tiny'))             // logs user request ----- 3rd party middleware
app.use(express.urlencoded({ extended: true }))       //provides access to req.body
app.use(cors())                     //allowing other apps to send requests
app.use(bodyParser.urlencoded({ extended: false }));    //also provides access to req.body
app.use(bodyParser.json());
// app.use(authenticateUser);

//routes
app.use('/blogs', router)

app.get('/', (req, res) => {

    res.redirect('/blogs')
})

app.get('/about', (req, res) => {

    res.render('about', { title: 'About' });
})

//404 error page
app.use((req, res) => {

    res.status(404).render('404', { title: '404' });

})

