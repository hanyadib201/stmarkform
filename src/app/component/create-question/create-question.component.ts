import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
})
export class CreateQuestionComponent implements OnInit {
  questions: FormArray;
  quizId :number=0;
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
     // quizId: [1], // Replace with actual quizId
      type: ['multiple-choice'],
      correctTextAnswer: [''],
      degree :[0] , // Degree field
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

    if (type === 'true-false' || type === 'fill-blank') {
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
    const payload = this.questions.value;
    console.log(payload);
    this.http.post(`https://localhost:44363/api/Question?QuizId=${this.quizId}`, payload).subscribe({
      next: () => alert('Questions submitted!'),
      error: (err) => console.error('Submission failed:', err),
    });
  }
  getQuestionFormGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }
}
