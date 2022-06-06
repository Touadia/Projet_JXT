import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import {Association} from './associations.entity'
import {AssociationsService} from './associations.service';
import { User } from 'src/users/users.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AssoInput, ParameterId } from './asso_input';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(
        private service: AssociationsService
    ) {}

    @ApiOkResponse({
        description: 'The association had been successfully created.'
    })
    @Post()
    public async createNewAssociation(@Body() input : AssoInput): Promise<Association> {
        return this.service.create(input.users, input.name);
    }

    @ApiOkResponse({
        description: 'The associations have been successfully pulled.'
    })
    @Get()
    public async getAll(): Promise<Association[]> {
        return this.service.get_all_associations(); //service
    }

    //@ApiTags('Get') // <- a function can be in multiple tags
    @ApiOkResponse({
        description: 'The association\'s members have been successfully pulled.'
    })
    @ApiNotFoundResponse({
        description: 'The association with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The association with the requested id was not found.'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get(':id/members')
    public async getMembers(@Param() parameter: ParameterId): Promise<User[]> {
        var users: User[] = await this.service.read_all(parameter.id); //service
        if (users === null) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        return users;
    }

    @ApiOkResponse({
        description: 'The association has been successfully pulled.'
    })
    @ApiNotFoundResponse({
        description: 'The association with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The association with the requested id was not found.'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    public async read_C(@Param() parameter: ParameterId): Promise<Association> {
        var user: Association = await this.service.read(parameter.id); //service
        if (user === null) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        return user;
    }


    @ApiOkResponse({
        description: 'The association has been successfully modified.'
    })
    @ApiNotFoundResponse({
        description: 'The association with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The association with the requested id was not found.'
    })
    @ApiBadRequestResponse({
        description: 'No modification acutally made.'
    })
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    public async update_C(@Param() parameter: ParameterId, @Body() input : AssoInput): Promise<Association> {
        if (input.users === undefined && input.name === undefined){
            throw new HttpException(`Undefined parameters`, HttpStatus.BAD_REQUEST)
        }
        var user: Association = await this.service.update(parameter.id, input.users, input.name); //service
        if (user === null) throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
        return user;
    }

    @ApiOkResponse({
        description: 'The association has been successfully deleted.'
    })
    @ApiNotFoundResponse({
        description: 'The association with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The association with the requested id was not found.'
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    public async delete_C(@Param() parameter: ParameterId): Promise<Boolean> {   //even when you splice the users off an array you still get returned an array:  [...]
        if(this.service.delete(parameter.id)){
            return true;
        }
        throw new HttpException(`Could not find an association with the id ${parameter.id}`, HttpStatus.NOT_FOUND)
    }
}
