import { RecoverPasswordController } from '@modules/accounts/useCases/recover-password/RecoverPasswordController';
import { ResetPasswordController } from '@modules/accounts/useCases/reset-password/ResetPasswordController';
import { Router } from 'express';

const passwordsRoutes = Router()

const recoverPasswordController = new RecoverPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordsRoutes.post('/forgot', recoverPasswordController.handle)
passwordsRoutes.post('/reset', resetPasswordController.handle)

export { passwordsRoutes }