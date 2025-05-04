import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './component/quiz/quiz.component';
import { CreateQuestionComponent } from './component/create-question/create-question.component';
import { QuizAnswerComponent } from './component/quiz-answer/quiz-answer.component';

const routes: Routes = [
  { path: 'quiz/:quizId/:userName', component: QuizComponent },
  { path: 'test/:quizId', component: CreateQuestionComponent },
  { path: 'testquiz/:quizId', component: QuizAnswerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
