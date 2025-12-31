import { ArrowRight } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

const Home = ({ onStart }: HomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-vermeer-deepBlue">
              EchoMap
            </h1>
            <p className="text-xl text-vermeer-softBlue">
              A resourceful tool to map your English communication gaps.
            </p>
          </div>
          
          <div className="pt-8">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 px-8 py-4 bg-vermeer-deepBlue text-vermeer-white rounded-lg hover:bg-vermeer-softBlue transition-colors text-lg font-medium"
            >
              Begin Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

