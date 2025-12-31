import { useState, useEffect } from 'react';
import SpeechRecognition from './SpeechRecognition';
import { ChevronRight } from 'lucide-react';
import type { UserResponse } from '../types';

const ASSESSMENT_STAGES = [
  {
    name: 'Daily Life',
    question: 'Describe your typical morning routine. What do you do from the moment you wake up?'
  },
  {
    name: 'Descriptive',
    question: 'Describe a place you visited recently. What did it look like? What sounds, smells, or feelings do you remember?'
  },
  {
    name: 'Opinion',
    question: 'What is your opinion on remote work? Do you think it\'s beneficial or challenging?'
  },
  {
    name: 'Professional',
    question: 'Describe a professional challenge you faced recently. How did you approach solving it?'
  },
  {
    name: 'Abstract',
    question: 'What does "success" mean to you? How would you define it in your own words?'
  }
];

interface AssessmentProps {
  onComplete: (responses: UserResponse[]) => void;
}

const Assessment = ({ onComplete }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');

  useEffect(() => {
    // Initialize userResponses array
    if (userResponses.length === 0) {
      setUserResponses(
        ASSESSMENT_STAGES.map(stage => ({
          stage: stage.name,
          transcript: ''
        }))
      );
    }
  }, []);

  const handleTranscript = (text: string) => {
    setCurrentTranscript(text);
    // Update the response in real-time
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion] = {
      stage: ASSESSMENT_STAGES[currentQuestion].name,
      transcript: text.trim()
    };
    setUserResponses(updatedResponses);
  };

  const handleComplete = () => {
    // Ensure current transcript is saved
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion] = {
      stage: ASSESSMENT_STAGES[currentQuestion].name,
      transcript: currentTranscript.trim()
    };
    setUserResponses(updatedResponses);

    // Move to next question or complete
    if (currentQuestion < ASSESSMENT_STAGES.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentTranscript('');
    } else {
      // All questions completed - use updatedResponses
      onComplete(updatedResponses);
    }
  };

  const handleNext = () => {
    if (currentTranscript.trim()) {
      handleComplete();
    }
  };

  const progress = ((currentQuestion + 1) / ASSESSMENT_STAGES.length) * 100;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-vermeer-softBlue">
            <span>Question {currentQuestion + 1} of {ASSESSMENT_STAGES.length}</span>
            <span>{ASSESSMENT_STAGES[currentQuestion].name}</span>
          </div>
          <div className="w-full bg-vermeer-softBlue/20 rounded-full h-2">
            <div
              className="bg-vermeer-ochre h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Speech Recognition Component */}
        <SpeechRecognition
          onTranscript={handleTranscript}
          onComplete={handleComplete}
          isActive={true}
          question={ASSESSMENT_STAGES[currentQuestion].question}
        />

        {/* Next Button */}
        {currentTranscript.trim() && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-vermeer-deepBlue text-vermeer-white rounded-lg hover:bg-vermeer-softBlue transition-colors"
            >
              {currentQuestion < ASSESSMENT_STAGES.length - 1 ? 'Next Question' : 'Complete Assessment'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;

