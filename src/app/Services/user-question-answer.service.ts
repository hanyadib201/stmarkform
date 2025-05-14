import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserQuestionAnswerManualVM } from '../Models/question-manual-vm';

@Injectable({
  providedIn: 'root',
})
export class UserQuestionAnswerService {
  private apiUrl = 'https://localhost:44355/api/UserQuestionAnswerManual';

  constructor(private http: HttpClient) {}

  getUserQuestionAnswers(
    quizId: number,
    questionId: number,
    userId?: string,
    questionType?: string
  ): Observable<UserQuestionAnswerManualVM> {
    const headers = new HttpHeaders({
      //QuizId: quizId.toString(),
      QuestionId: questionId.toString(),
      ...(userId ? { UserId: userId } : {}),
      ...(questionType ? { QuestionType: questionType } : {}),
    });

    return this.http.get<UserQuestionAnswerManualVM>(`https://localhost:44355/api/UserQuestionAnswerManual?QuizId=${quizId}`, { headers });
  }

  // Add this to user-question-answer.service.ts
postUserAnswerByAdmin(data: {
  userId: string;
  quizId: number;
  questionId: number;
  degree: number;
}): Observable<any> {
  return this.http.post(`${this.apiUrl}`, data);
}

}
