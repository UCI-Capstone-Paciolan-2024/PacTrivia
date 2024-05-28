export interface QuestionLayoutProps {
    options: string[];
    onButtonClick: (answer_index: number) => void;
    selectedAnswer: number | null;
    checkAnswer: boolean | null
}
export interface AnswerButtonProps {
    choice: string;
    index: number;
    onButtonClick: () => void;
    disabled: boolean;
    greyedOut: boolean;
    checkAnswer: boolean | null;
  }

export interface GameHeaderProps {
    HomeTeam: string;
    AwayTeam: string;
}