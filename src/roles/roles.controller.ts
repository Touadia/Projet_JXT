import { Controller, Get, Body, Post, Param, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.services';
import { ParameterId, RoleInput } from './role.input';
import { Role } from './roles.entity';


@ApiTags('roles')
@Controller('roles')
export class RolesController {    
    constructor(
        private service: RolesService
    ) {}

    @ApiOkResponse({
        description: 'The role has been successfully pulled.'
    })
    @ApiNotFoundResponse({
        description: 'The user or association with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The user or association does not exist.'
    })
    @Get(':id1/:id2')
    public async getbyIds(@Param() parameter: ParameterId): Promise<Role> {
        var role: Role = await this.service.read(parameter.id1, parameter.id2); //service
        if (role === null) throw new HttpException(`Could not find a user or association with the ids ${parameter.id1} ${parameter.id2}`, HttpStatus.NOT_FOUND)
        return role;
    }

    @ApiOkResponse({
        description: 'The role has been successfully created.'
    })
    @ApiNotFoundResponse({
        description: 'The user or association with the requested id was not found.'
    })
    @ApiInternalServerErrorResponse({
        description: 'The user or association does not exist.'
    })
    @Post()
    public async createnewRole(@Body() parameter: RoleInput): Promise<Role> {
        var role: Role = await this.service.create(parameter.name, parameter.idUser, parameter.idAssociation); //service
        if (role === undefined) throw new HttpException(`Could not find a user or association with the ids ${parameter.idUser} ${parameter.idAssociation}`, HttpStatus.NOT_FOUND)
        return role;
    }

}
