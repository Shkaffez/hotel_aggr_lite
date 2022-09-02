import { Controller } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) { }



}
