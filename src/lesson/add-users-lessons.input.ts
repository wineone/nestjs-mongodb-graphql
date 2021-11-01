import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AddUsersToLessons {
  @Field((type) => ID)
  @IsUUID()
  lessonId: string;

  @Field((type) => [ID])
  @IsUUID('4', { each: true })
  usersId: string[];
}
