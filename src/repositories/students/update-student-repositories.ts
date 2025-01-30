export abstract class updateStudentRepositories { 
    abstract update(id: string, class_id: string, student_id: string): Promise<any>;
}