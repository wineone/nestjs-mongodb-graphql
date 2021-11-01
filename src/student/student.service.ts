import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRespository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRespository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    await this.studentRespository.save([student]);

    return student;
  }

  async getStudents(): Promise<Student[]> {
    const found: Student[] = await this.studentRespository.find();
    return found;
  }

  async getStudentById(id: string): Promise<Student> {
    const found = await this.studentRespository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`user with id ${id} not found.`);
    }

    return found;
  }

  async getAllStudentsById(studentsIds: string[]): Promise<Student[]> {
    const founds: Student[] = await this.studentRespository.find({
      where: {
        id: {
          $in: studentsIds,
        },
      },
    });
    return founds;
  }
}
