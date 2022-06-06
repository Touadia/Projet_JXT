import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";

export class AssoInput {

    @ApiProperty({
        description: 'The users in this association',
        example: "{Doe, John, 23} , {Doe, Jane, 23}",
        type: String,
    })
    public users: User[];

    @ApiProperty({
        description: 'The name of the association',
        example: "Associati0n",
        type: String,
    })
    public name : string;
}


export class ParameterId { //this only works if we keep using the parameters only to get the id

    @ApiProperty({
        description: 'The id of the user',
        example: "2",
        type: Number,
    })
    public id : number;
}