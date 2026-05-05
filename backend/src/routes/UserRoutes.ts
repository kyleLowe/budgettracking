import express from 'express';
import * as UserController from '../controllers/UserController';

//Route -> Controller -> Service -> DAO -> Model
const router = express.Router();

router.get('/', UserController.getAuthenticatedUser);

export default router