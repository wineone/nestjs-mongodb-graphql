import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';
import { AddUsersToLessons } from './add-users-lessons.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((_of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((_returns) => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLessonById(id);
  }

  @Query((_returns) => [LessonType])
  lessons(): Promise<Lesson[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation((_returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((_returns) => LessonType)
  addUsersToLesson(
    @Args('addUsersToLesson') addUserLessonsInput: AddUsersToLessons,
  ) {
    const { lessonId, usersId } = addUserLessonsInput;
    return this.lessonService.addStudentToLesson(lessonId, usersId);
  }

  @ResolveField()
  async students(@Parent() lesson: LessonType): Promise<Student[]> {
    const students = this.studentService.getAllStudentsById(lesson.students);
    return students;
  }
}
