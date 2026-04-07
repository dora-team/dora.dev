export interface Question {
    number: number;
    question_text: string;
}

export interface Capability {
    number: number;
    capability_name: string;
    shortname: string;
    description: string;
    article_url: string;
    response_prompt: string;
    questions: Question[];
}

export interface Metrics {
    leadtime: number | string;
    deployfreq: number | string;
    changefailure: number | string;
    failurerecovery: number | string;
    rework: number | string;
    [key: string]: number | string;
}

export type DisplayMode = 'embedded' | 'kiosk';
export type Step = 'input' | 'results' | 'priorities';
