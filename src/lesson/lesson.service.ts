import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessonById(id: string): Promise<Lesson> {
    const found = this.lessonRepository.findOne({ id });
    return found;
  }

  async getAllLessons(): Promise<Lesson[]> {
    const found: Lesson[] = await this.lessonRepository.find();
    return found;
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    await this.lessonRepository.save(lesson);

    return lesson;
  }

  async addStudentToLesson(
    lessonId: string,
    studentsId: string[],
  ): Promise<Lesson> {
    const found: Lesson = await this.lessonRepository.findOne({ id: lessonId });

    if (!found) {
      throw new NotFoundException('task not found');
    }

    found.students = [...found.students, ...studentsId];

    await this.lessonRepository.save([found]);

    return found;
  }
}
