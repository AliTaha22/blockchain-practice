import express from "express"
import blogController  from './../controllers/blogController.js'


const router = express.Router();

// router.get('/add-blog', (req,res) => {

//     const blog = new Blog({


//         title: "hello again",
//         snippet: "this is the snippet 2",
//         body: "This is the body Again"
//     });

//     blog.save()
//     .then((result) =>{
//         res.send(result);
//     }).catch((err)=> console.log(err));

// })
router.get('/', blogController.blog_index)
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)
router.post('/', blogController.blog_create_post)
router.delete('/:id', blogController.blog_delete)


export { router }