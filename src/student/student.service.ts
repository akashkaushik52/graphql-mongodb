import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { FindOneOptions, In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { CreateStudentInput } from './student.input';


@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
    ) { }

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {

        const { firstName, lastName } = createStudentInput
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });

        return this.studentRepository.save(student);
    }

    async getAllStudent(): Promise<Student[]> {
        return this.studentRepository.find();
    }


    async getStudent(id: string): Promise<Student> {
        const options: FindOneOptions<Student> = { where: { id } }; // Use FindOneOptions
        return this.studentRepository.findOne(options);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: { $in: studentIds } as any,

            }
        });
    }
}
