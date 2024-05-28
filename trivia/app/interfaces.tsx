export interface QuestionLayoutProps {
    options: string[];
    onButtonClick: (answer_index: number) => void;
}

export interface AnswerButtonProps {
    choice: string;
    index: number;
    onButtonClick: () => void;
}

export interface GameHeaderProps {
    HomeTeam: string;
    AwayTeam: string;
}