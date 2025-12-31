export interface UserResponse {
  stage: string;
  transcript: string;
}

export interface AnalysisResult {
  scores: {
    syntax: number;
    lexicalRange: number;
    fluidity: number;
  };
  pastMistakes: string[];
  roadmap: RoadmapDay[];
}

export interface RoadmapDay {
  day: number;
  task: string;
  whyItMatters: string;
}

export type AppState = 'home' | 'assessment' | 'result';

