import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { router } from './routes/blogRoutes.js'


const app = express();

//db connection
const myDB = 'mongodb+srv://alitaha3080:cWk4Gen66jyrxYw6@nodetuts.swcojpd.mongodb.net/nodetuts?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(myDB)
    .then((result) => {
        console.log('connected')
        app.listen(3000)
    }
    ).catch((err) => console.log(err))

//registering view engine
app.set('view engine', 'ejs')//uses a template engine, i.e. renders JS into meaningful html

//middlewares & static files
app.use(express.static('public'))   //serves static file to the front-end i.e. explicit access of files to client
app.use(morgan('tiny'))             // logs user request ----- 3rd party middleware
app.use(express.urlencoded({ extended: true }))       //provides access to req.body

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

