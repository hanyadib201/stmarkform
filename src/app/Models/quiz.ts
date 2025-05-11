import { Question } from "./question";

export interface Quiz { id: number;
    title: string;
    description: string;
    from: string;
    to: string;
    userId: string;
    imagePath: string;
    questions: Question[];
}
