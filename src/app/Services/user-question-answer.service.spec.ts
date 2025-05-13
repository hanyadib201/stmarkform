import { TestBed } from '@angular/core/testing';

import { UserQuestionAnswerService } from './user-question-answer.service';

describe('UserQuestionAnswerService', () => {
  let service: UserQuestionAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserQuestionAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
