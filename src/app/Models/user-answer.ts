export interface UserAnswer { quizId: number;
    userId: string;
    userName: string;
    answers: {
      questionId: number;
      type : string ;
      answerText?: string;        // for fill-blank, true-false
      selectedOptionId?: string;  // for multiple-choice
      matchingAnswers?: { [key: number]: string }; // for matching questions
    }[];
}
