import { OptionCreate } from './option-create';

export interface QuestionPostVM {
  id: number;
  text?: string;
  quizId: number;
  type: string;
  correctTextAnswer?: string;
  url?: string;

  options?: OptionCreate[];
}
