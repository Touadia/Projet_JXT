import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput } from './login_input';


//@ApiTags('auth') //<- I actually like that it appears in the default tag since its first and since theres only one function...
@Controller('auth')
export class AuthController {
  constructor(
      private authService: AuthService,
  ) {}

    @ApiOkResponse({
        description: 'You logged in successfully!'
    })
    @ApiUnauthorizedResponse({
        description: 'The combination user id and password was incorrect.'
    })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request : LoginInput) {  // <- the custom class for the parameter @Request() doesnt work, and if we change it to @Body() the login function doesnt work, cant figure out how to make the SwaggerUI custom class work for the @Request(), bummer...
      return this.authService.login(request);    
    }
}