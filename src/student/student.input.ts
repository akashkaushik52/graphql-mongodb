import { Field, InputType } from "@nestjs/graphql";
import {MinLength, IsOptional} from "class-validator"

@InputType()
export class CreateStudentInput {

    @MinLength(1)
    @Field()
    firstName: string;

    @IsOptional()
    @Field()
    lastName: string;

}