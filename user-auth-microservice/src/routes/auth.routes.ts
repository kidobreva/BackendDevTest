import { Router } from 'express';
import controller from '../controllers/auth.controller';
import extractJWT from '../middleware/checkUserJWT';
import registerSchema from '../middleware/validation/register-shema';
import { validateRequestSchema } from '../middleware/validation/validate-request-shema';
import loginShema from '../middleware/validation/login-shema';

const router = Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post(
  '/register',
  registerSchema,
  validateRequestSchema,
  controller.register
);
router.post('/login', loginShema, validateRequestSchema, controller.login);
router.post('/logout', extractJWT, controller.logout);
router.get('/user', extractJWT, controller.getUser);

export default router;
