import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { GetIdInput } from './get-id.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((_of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation((_returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query((_returns) => StudentType)
  student(@Args('getIdInput') getIdInput: GetIdInput): Promise<Student> {
    return this.studentService.getStudentById(getIdInput.id);
  }

  @Query((_returns) => [StudentType])
  students(): Promise<Student[]> {
    return this.studentService.getStudents();
  }
}
