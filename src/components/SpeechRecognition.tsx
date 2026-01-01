import { useState, useEffect, useRef, useCallback } from 'react';
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
  const shouldKeepListeningRef = useRef(false);
  const accumulatedTranscriptRef = useRef('');

  // 1. Critical Fix: Setup recognition ONCE on mount
  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
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
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += text + ' ';
        } else {
          interimTranscript += text;
        }
      }

      if (finalTranscript) {
        accumulatedTranscriptRef.current += finalTranscript;
      }

      const fullTranscript = accumulatedTranscriptRef.current + interimTranscript;
      setTranscript(fullTranscript);
      onTranscript(fullTranscript);
    };

    recognition.onerror = (event: any) => {
      // Ignore 'no-speech' to prevent the mic from clicking off during thought pauses
      if (event.error === 'no-speech') return;
      
      console.error('Speech Error:', event.error);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied.');
        shouldKeepListeningRef.current = false;
      }
    };

    recognition.onend = () => {
      // 2. Critical Fix: Auto-restart logic if user hasn't pressed 'Stop'
      if (shouldKeepListeningRef.current) {
        try {
          recognition.start();
        } catch (e) {
          console.error("Restart failed", e);
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldKeepListeningRef.current = false;
      recognition.stop();
    };
  }, []); // Empty dependency array ensures we don't reset the mic on every render

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      setTranscript('');
      accumulatedTranscriptRef.current = '';
      shouldKeepListeningRef.current = true;
      recognitionRef.current.start();
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      shouldKeepListeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
      onComplete();
    }
  }, [onComplete]);

  if (!isActive) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-vermeer-white border-2 border-vermeer-deepBlue rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-vermeer-deepBlue">{question}</h3>
        
        <div className="flex items-center gap-4 mb-6">
          {!isListening ? (
            <button onClick={startListening} className="flex items-center gap-2 px-6 py-3 bg-vermeer-deepBlue text-vermeer-white rounded-lg hover:opacity-90">
              <Mic className="w-5 h-5" /> Start Recording
            </button>
          ) : (
            <button onClick={stopListening} className="flex items-center gap-2 px-6 py-3 bg-vermeer-ochre text-vermeer-deepBlue rounded-lg hover:opacity-90">
              <Square className="w-5 h-5" /> Stop Recording
            </button>
          )}
          
          {isListening && (
            <div className="flex items-center gap-2 text-vermeer-ochre animate-pulse">
              <span className="text-sm font-medium">Recording Live...</span>
            </div>
          )}
        </div>

        {error && <div className="p-3 mb-4 bg-red-50 text-red-700 rounded border border-red-200">{error}</div>}

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[200px]">
          <p className="text-slate-700 leading-relaxed">{transcript || "Waiting for your voice..."}</p>
        </div>
      </div>
    </div>
  );
};

export default SpeechRecognition;