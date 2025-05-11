import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../Services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-answer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './quiz-answer.component.html',
  styleUrl: './quiz-answer.component.css'
})
export class QuizAnswerComponent implements OnInit {
  questions: any[] = [];
  quizId = 1; // يمكنك تغيير هذا حسب احتياجاتك

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = +params['quizId']; // or ['quizId'] if you changed the route
     
      if (isNaN(this.quizId) ) {
        console.log(this.quizId);

        console.error('Invalid parameters');
        return;
      }
      this.loadQuestions();
    });
  }

  

  loadQuestions(): void {
    this.quizService.getQuestionsWithAnswers(this.quizId).subscribe({
      next: (data: any) => {
        console.log(data);

        this.questions = data.data || data; // حسب هيكل الاستجابة من API
        console.log(this.questions);
      },
      error: (err) => {
        console.error('حدث خطأ أثناء جلب البيانات:', err);
      },
    });
  }
}

