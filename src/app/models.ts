export interface Section {
    label: string;
    questions: Question[];
}

export interface Question {
    question: string;
    options: string[];
    recommendations: RecommendationOption[];
}

export interface RecommendationOption {
    key: string;
    value: string;
}

export interface QuestionOption {
    questionIndex: number;
    recommendationText: string
}
