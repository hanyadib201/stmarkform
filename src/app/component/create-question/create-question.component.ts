import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css',
})
export class CreateQuestionComponent {
  questions: FormArray;
  quizId: number = 0;
  token!: string;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.questions = this.fb.array([]);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = +params['quizId']; // or ['quizId'] if you changed the route
      this.token = params['token']; // or ['quizId'] if you changed the route
      console.log(this.quizId);

      if (isNaN(this.quizId)) {
        console.log(this.quizId);

        console.error('Invalid parameters');
        return;
      }
      this.addQuestion();
    });
  }
  // ngOnInit(): void {
  //   this.addQuestion(); // Start with one question
  // }

  createQuestionForm(): FormGroup {
    return this.fb.group({
      id: [0],
      text: [''],
      type: ['multiple-choice'],
      correctTextAnswer: [''],
      url: [''],
      degree: [0], // Degree field
      options: this.fb.array([this.createOptionForm()]),
    });
  }

  createOptionForm(): FormGroup {
    return this.fb.group({
      text: [''],
      isCorrect: [false],
      matchingQuestion: [''],
    });
  }

  getOptions(index: number): FormArray {
    return this.questions.at(index).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.createOptionForm());
  }

  addQuestion(): void {
    this.questions.push(this.createQuestionForm());
  }

  onTypeChange(index: number): void {
    const questionGroup = this.questions.at(index) as FormGroup;
    const type = questionGroup.get('type')?.value;

    if (
      type === 'true-false' ||
      type === 'fill-blank' ||
      type === 'pictureSummry' ||
      type === 'pdfSummry' ||
      type === 'youtubeSummry'
    ) {
      questionGroup.setControl('options', this.fb.array([]));
    } else {
      const optionsControl = questionGroup.get('options');
      if (
        !(optionsControl instanceof FormArray) ||
        optionsControl.length === 0
      ) {
        questionGroup.setControl(
          'options',
          this.fb.array([this.createOptionForm()])
        );
      }
    }
  }

  submitAllQuestions(): void {
    // console.log(" helllllllllllllo");
    const payload = this.questions.value;
    console.log(payload);
    this.http.post(`https://hanyadib606.bsite.net/api/Question?QuizId=${this.quizId}&token=${this.token}`, payload).subscribe({
      next: () => alert('Questions submitted!'),
      error: (err) => console.error('Submission failed:', err),
    });
  }
  // submitAllQuestions(): void {
  //   // console.log(" helllllllllllllo");
  //   const payload = this.questions.value;
  //   console.log(payload);
  //   this.http
  //     .post(
  //       `https://localhost:44355/api/Question?QuizId=${this.quizId}&token=${this.token}`,
  //       payload
  //     )
  //     .subscribe({
  //       next: () => alert('Questions submitted!'),
  //       error: (err) => console.error('Submission failed:', err),
  //     });
  // }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }
}
