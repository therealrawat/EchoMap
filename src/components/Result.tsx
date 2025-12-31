import { useState } from 'react';
import type { AnalysisResult } from '../types';
import { Calendar, Target, Download } from 'lucide-react';
import { generatePDF } from '../utils/generatePDF';

interface ResultProps {
  result: AnalysisResult;
  onRestart: () => void;
}

const Result = ({ result, onRestart }: ResultProps) => {
  const { scores, pastMistakes, roadmap } = result;
  const [includeAnalytics, setIncludeAnalytics] = useState(true);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="w-full max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-vermeer-deepBlue">
            Your Communication Profile
          </h1>
          <p className="text-vermeer-softBlue">
            Here's your diagnostic and personalized roadmap
          </p>
        </div>

        {/* Scores Section */}
        <div className="bg-vermeer-white border-2 border-vermeer-deepBlue rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-vermeer-deepBlue">
            Scores
          </h2>
          <div className="space-y-6">
            {Object.entries(scores).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-vermeer-deepBlue font-medium capitalize">
                    {key === 'lexicalRange' ? 'Lexical Range' : key}
                  </span>
                  <span className="text-vermeer-ochre font-bold">{value}/100</span>
                </div>
                <div className="w-full bg-vermeer-softBlue/20 rounded-full h-4">
                  <div
                    className="bg-vermeer-ochre h-4 rounded-full transition-all duration-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Mistakes */}
        {pastMistakes.length > 0 && (
          <div className="bg-vermeer-white border-2 border-vermeer-deepBlue rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-vermeer-deepBlue">
              Patterns to Address
            </h2>
            <ul className="space-y-2">
              {pastMistakes.map((mistake, index) => (
                <li key={index} className="flex items-start gap-3 text-vermeer-deepBlue">
                  <span className="text-vermeer-ochre mt-1">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 7-Day Roadmap */}
        <div className="bg-vermeer-white border-2 border-vermeer-deepBlue rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-vermeer-ochre" />
            <h2 className="text-2xl font-semibold text-vermeer-deepBlue">
              7-Day Roadmap
            </h2>
          </div>
          
          <div className="space-y-6">
            {roadmap.map((day, index) => (
              <div key={day.day} className="flex gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-vermeer-ochre text-vermeer-deepBlue flex items-center justify-center font-bold">
                    {day.day}
                  </div>
                  {index < roadmap.length - 1 && (
                    <div className="w-0.5 h-full bg-vermeer-softBlue/30 mt-2 min-h-[80px]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Target className="w-5 h-5 text-vermeer-ochre mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-vermeer-deepBlue mb-1">
                          Task
                        </h3>
                        <p className="text-vermeer-deepBlue">{day.task}</p>
                      </div>
                    </div>
                    <div className="ml-7">
                      <h4 className="text-sm font-medium text-vermeer-softBlue mb-1">
                        Why it matters
                      </h4>
                      <p className="text-sm text-vermeer-softBlue">
                        {day.whyItMatters}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download PDF Section */}
        <div className="bg-vermeer-white border-2 border-vermeer-deepBlue rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeAnalytics}
                  onChange={(e) => setIncludeAnalytics(e.target.checked)}
                  className="w-5 h-5 cursor-pointer accent-vermeer-ochre border-2 border-vermeer-softBlue rounded focus:ring-2 focus:ring-vermeer-ochre focus:ring-offset-2"
                />
                <span className="text-vermeer-deepBlue text-sm select-none">
                  Include analytics (scores & patterns)
                </span>
              </label>
            </div>
            <button
              onClick={() => generatePDF(result, includeAnalytics)}
              className="flex items-center gap-2 px-6 py-3 bg-vermeer-ochre text-vermeer-deepBlue rounded-lg hover:bg-vermeer-darkOchre transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              Download Roadmap PDF
            </button>
          </div>
        </div>

        {/* Restart Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-vermeer-deepBlue text-vermeer-white rounded-lg hover:bg-vermeer-softBlue transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;

