import express from 'express';
import * as CategoryController from '../controllers/CategoryController';

//Route -> Controller -> Service -> DAO -> Model
const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/id/:categoryId', CategoryController.getCategory);
router.get('/name/:categoryName', CategoryController.getCategoryByName);
router.post('/create', CategoryController.createCategory);
router.put('/id/:categoryId', CategoryController.updateCategory);
router.delete('/id/:categoryId', CategoryController.deleteCategory);

export default router