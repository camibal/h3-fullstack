import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';

const router = Router();

// Get all cities
router.get('/', UserController.getAll);

// Get one city
// router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);

// Create a new city
router.post('/', [checkJwt], UserController.new);

// Edit uscityer
// router.put('/:id', [checkJwt, checkRole(['admin'])], UserController.edit);

// Delete
// router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.delete);

export default router;
