import { ApiProperty, IntersectionType, OmitType, PartialType } from "@nestjs/swagger";

export class UserInput {

    @ApiProperty({
        description: 'The firtname of the user',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The password of the user',
        example: "valid_password",
        type: String,
    })
    public password: string;
}
export class ParameterId {
    
    @ApiProperty({
        description: 'The id of the user',
        example: "2",
        type: Number,
    })
    public id : number;
}