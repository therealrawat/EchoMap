import { useState, useEffect, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

interface SpeechRecognitionProps {
  onTranscript: (text: string) => void;
  onComplete: () => void;
  isActive: boolean;
  question: string;
}

const SpeechRecognition = ({ onTranscript, onComplete, isActive, question }: SpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    // Initialize recognition
    const recognition = new SpeechRecognition() as any;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript + interimTranscript;
      setTranscript(fullTranscript);
      onTranscript(fullTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        setError('No speech detected. Please try again.');
      } else if (event.error === 'audio-capture') {
        setError('No microphone found. Please check your microphone settings.');
      } else if (event.error === 'not-allowed') {
        setError('Microphone permission denied. Please allow microphone access.');
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Error starting recognition:', err);
        setError('Failed to start speech recognition. Please try again.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      onComplete();
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-vermeer-white border-2 border-vermeer-deepBlue rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-vermeer-deepBlue">{question}</h3>
        
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            {!isListening ? (
              <button
                onClick={startListening}
                className="flex items-center gap-2 px-6 py-3 bg-vermeer-deepBlue text-vermeer-white rounded-lg hover:bg-vermeer-softBlue transition-colors"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="flex items-center gap-2 px-6 py-3 bg-vermeer-ochre text-vermeer-deepBlue rounded-lg hover:bg-vermeer-darkOchre transition-colors"
              >
                <Square className="w-5 h-5" />
                Stop Recording
              </button>
            )}
            
            {isListening && (
              <div className="flex items-center gap-2 text-vermeer-ochre">
                <div className="w-3 h-3 bg-vermeer-ochre rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Listening...</span>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="bg-vermeer-white border border-vermeer-softBlue rounded-lg p-4 min-h-[200px]">
          <div className="text-xs uppercase tracking-wider text-vermeer-softBlue mb-2">
            Live Transcript
          </div>
          <div className="text-vermeer-deepBlue leading-relaxed">
            {transcript || (
              <span className="text-vermeer-softBlue italic">
                Your speech will appear here as you speak...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default SpeechRecognition;

