import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserQuestionAnswerManualVM } from '../../Models/question-manual-vm';
import { UserQuestionAnswerService } from '../../Services/user-question-answer.service';

@Component({
  selector: 'app-user-question-answer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-question-answer.component.html',
  styleUrl: './user-question-answer.component.css'
})
export class UserQuestionAnswerComponent implements OnInit {
  data!: UserQuestionAnswerManualVM;
  message = '';

  constructor(private userAnswerService: UserQuestionAnswerService) {}

  ngOnInit(): void {
    const quizId = 230;         // ← قيم حقيقية أو من Route أو form
    const questionId = 0;
    const userId = 'c6f5a169-8b2b-46c4-a104-2df865d92b0f';
    const questionType = '';

    this.userAnswerService
      .getUserQuestionAnswers(quizId, questionId, userId, questionType)
      .subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (err) => {
          console.error(err);
          this.message = 'فشل في تحميل البيانات';
        },
      });
  }
}