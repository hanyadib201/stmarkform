export interface Question { id: number;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'matching' | 'fill-blank' |'pictureSummry' |'pdfSummry' |'youtubeSummry';
    correctTextAnswer: string | null;
    degree :number;
    url :string;
    options : Option[] | null;
}
export interface Option { id: number;
    text: string | null;
    isCorrect: boolean | null;
    leftItem: string[] | null;
    rightItem: string[] | null;
}
