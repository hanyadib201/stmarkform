import { Routes } from '@angular/router';
import { QuizComponent } from './component/quiz/quiz.component';
import { CreateQuestionComponent } from './component/create-question/create-question.component';
import { QuizAnswerComponent } from './component/quiz-answer/quiz-answer.component';
import { UserQuestionAnswerComponent } from './component/user-question-answer/user-question-answer.component';
import { FinishedSubmitComponent } from './component/finished-submit/finished-submit.component';

export const routes: Routes = 
[
    {path: 'quiz/:quizId/:token', component:QuizComponent},
    { path: 'create/:quizId/:token', component: CreateQuestionComponent },
    { path: 'answer/:quizId', component: QuizAnswerComponent },
    { path: 'test/:quizId', component: UserQuestionAnswerComponent },
    { path: 'finished', component: FinishedSubmitComponent }

];
