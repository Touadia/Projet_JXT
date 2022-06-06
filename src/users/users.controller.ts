import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from './users.entity';
import {UsersService} from './users.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserInput, ParameterId } from './user_input';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('users')
@Controller('users')
export class UsersController {    
    constructor(
        private service: UsersService
    ) {}

    @ApiOkResponse({
        description: 'The user has been successfully created.'
    })
    @ApiSecurity('basic')
    @Post()
    public async createNewUser(@Body() input : UserInput): Promise<User> {
        return this.service.create(input.lastname, input.firstname, input.age, input.password);
    }
    
    @ApiOkResponse({
        description: 'The users have been successfully pulled.'
    })
    @Get()
    public async getAll(): Promise<User[]> {
        return await this.service.getAll(); //service
    }
    
    @ApiOkResponse({
        description: 'The user has been successfully pulled.'
    })
    @ApiNotFoundResponse({
        description: 'The user with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The user with the requested id was not found.'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    public async getById(@Param() parameter: ParameterId): Promise<User> {
        var user: User = await this.service.getById(parameter.id); //service
        if (user === null) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        return user;
    }

    @ApiOkResponse({
        description: 'The user has been successfully modified.'
    })
    @ApiNotFoundResponse({
        description: 'The user with the requested id was not found.'
    })
    @ApiBadRequestResponse({
        description: 'No modification acutally made.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The user with the requested id was not found.'
    })
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    public async modifById(@Param() parameter: ParameterId, @Body() input : UserInput): Promise<User> {
        if (input.firstname === undefined && input.lastname === undefined && input.age === undefined){
            throw new HttpException(`Undefined parameters`, HttpStatus.NOT_ACCEPTABLE)
        }
        var user: User = await this.service.update(parameter.id, input.lastname, input.firstname, input.age, input.password); //service
        if (user === null) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        return user;
    }

    @ApiOkResponse({
        description: 'The user has been successfully deleted.'
    })
    @ApiNotFoundResponse({
        description: 'The user with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The user with the requested id was not found.'
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    public async deleteById(@Param() parameter: ParameterId): Promise<Boolean> {   //even when you splice the users off an array you still get returned an array:  [...]
        if(await this.service.delete(parameter.id)){
            return true;
        }
        throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
    }
}
