import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-student-to-lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ) { }

    async getLesson(id: string): Promise<Lesson> {
        const options: FindOneOptions<Lesson> = { where: { id } }; // Use FindOneOptions
        return this.lessonRepository.findOne(options);
    }

    async getAllLesson(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {

        const {name, startDate, endDate, students} = createLessonInput
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });

        return this.lessonRepository.save(lesson);
    }

    async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<Lesson> {
        const {lessonId, studentIds} = assignStudentsToLessonInput
        const lesson = await this.getLesson(lessonId)
        lesson.students = [...lesson.students, ...studentIds]
        return this.lessonRepository.save(lesson);
    }
} 
