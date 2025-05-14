import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserQuestionAnswerManualVM } from '../../Models/question-manual-vm';
import { UserQuestionAnswerService } from '../../Services/user-question-answer.service';
import { ActivatedRoute } from '@angular/router';

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
  quizId: number = 0;

  constructor(private userAnswerService: UserQuestionAnswerService , private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = +params['quizId']; 
      console.log(this.quizId);

      if (isNaN(this.quizId)) {
        console.log(this.quizId);

        console.error('Invalid parameters');
        return;
      }
    });
    const questionId = 0;
    //const userId = 'c6f5a169-8b2b-46c4-a104-2df865d92b0f';
    const userId: string | undefined = undefined; // أو قيمة أخرى مثل null
    const questionType = '';

    this.userAnswerService
      .getUserQuestionAnswers(this.quizId, questionId, userId, questionType)
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
  submitDegrees(){

  let hasError = false;

  for (const user of this.data.users) {
    for (const question of user.questions) {
      if (question.submittedDegree != null && question.submittedDegree >= 0) {
        const payload = {
          userId: user.id,
          quizId: this.quizId,
          questionId: question.questionId,
          degree: question.submittedDegree
        };

        this.userAnswerService.postUserAnswerByAdmin(payload).subscribe({
          next: (res) => {
            alert(`✅ Submitted for user ${user.userName}, question "${question.title}"`);
          },
          error: (err) => {
            console.error(`❌ Failed to submit for user ${user.userName}, question "${question.title}"`, err);
            hasError = true;
          }
        });
      }
    }
  }

  this.message = hasError ? 'حدثت بعض الأخطاء أثناء الإرسال' : 'تم إرسال الدرجات بنجاح';
}
}