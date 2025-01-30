export abstract class createStudentRepositories {
    abstract create(student_id: string, class_id: string): Promise<any>;
}   