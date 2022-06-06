import { ApiProperty } from "@nestjs/swagger";

export class LoginInput {

    @ApiProperty({
        description: 'The id of your user, or the user you wish to log in as',
        example: "0",
        type: Number,
    })
    public id: string;

    @ApiProperty({
        description: 'The password of your user, or the user you wish to log in as',
        example: "valid_password",
        type: String,
    })
    public password: string;
    
   /*
    @ApiProperty({
        description: 'The id and password of your user, or the user you wish to log in as',
        example: "username=2&password=valid_password",
        type: String,
    })
    public request: string;
*/
}