export interface QuestionManualVM {
  title: string;
  degree: number | null;
  answer: string;
  questionId:number ;
  submittedDegree?: number; // لدرجة يقوم المستخدم بإدخالها
}

export interface UserVM {
  id: string;
  userName: string;
  questions: QuestionManualVM[];
}

export interface UserQuestionAnswerManualVM {
  quizName: string;
  users: UserVM[];
}
