import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../Models/quiz';
import { UserAnswer } from '../Models/user-answer';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

   //private apiUrl = 'https://localhost:44355/api/Quizzes/QuizId';
  private apiUrl = 'https://hanyadib606.bsite.net/api/Quizzes/QuizId';

  constructor(private http: HttpClient) { }
  getQuiz(quizId: number, token: string): Observable<any> {
    // Use the apiUrl you already defined
    const url = new URL(this.apiUrl);
    url.searchParams.append('Id', quizId.toString());
    url.searchParams.append('token', encodeURIComponent(token));
    
    console.log('Final API URL:', url.toString()); // Debugging
    
    return this.http.get<{ data: Quiz }>(url.toString());
  }

  submitUserAnswers(data: UserAnswer) {
    return this.http.post('https://hanyadib606.bsite.net/api/UserAnswers', data);
    //return this.http.post('https://localhost:44355/api/UserAnswers', data);
  }
  getQuestionsWithAnswers(quizId: number) {
    return this.http.get(`https://hanyadib606.bsite.net/api/UserAnswers?QuizId=${quizId}`);
  }
}
