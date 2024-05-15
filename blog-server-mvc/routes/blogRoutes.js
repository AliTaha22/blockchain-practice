import express from "express"
import blogController  from './../controllers/blogController.js'


const router = express.Router();

router.post('/submit-form', blogController.blog_create_post)
router.get('/', blogController.blog_index)
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)


export { router }