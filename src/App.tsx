import { useState } from 'react';
import Home from './components/Home';
import Assessment from './components/Assessment';
import Result from './components/Result';
import Footer from './components/Footer';
import { analyzeResponses } from './utils/aiAnalysis';
import type { AppState, UserResponse, AnalysisResult } from './types';
import './App.css';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartAssessment = () => {
    setAppState('assessment');
    setError(null);
  };

  const handleAssessmentComplete = async (responses: UserResponse[]) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Get API key from environment variable or prompt user
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.');
      }

      const result = await analyzeResponses(responses, apiKey);
      setAnalysisResult(result);
      setAppState('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze responses');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRestart = () => {
    setAppState('home');
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-vermeer-white flex flex-col">
      <main className="flex-1">
        {appState === 'home' && <Home onStart={handleStartAssessment} />}
        
        {appState === 'assessment' && (
          <>
            {isAnalyzing ? (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vermeer-deepBlue mx-auto"></div>
                  <p className="text-vermeer-deepBlue">Analyzing your responses...</p>
                </div>
              </div>
            ) : (
              <Assessment onComplete={handleAssessmentComplete} />
            )}
          </>
        )}

        {appState === 'result' && analysisResult && (
          <Result result={analysisResult} onRestart={handleRestart} />
        )}

        {error && (
          <div className="fixed bottom-6 right-6 bg-red-100 border-2 border-red-300 rounded-lg p-4 max-w-md z-50">
            <p className="text-red-700 font-medium mb-2">Error</p>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-700 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
