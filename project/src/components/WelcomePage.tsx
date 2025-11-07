import { Rocket, Target, BookOpen, Briefcase } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export const WelcomePage = ({ onGetStarted }: WelcomePageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block p-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl mb-6">
            <Rocket className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            6-Month AI Engineer Roadmap
          </h1>
          <p className="text-xl text-slate-400 mb-2">
            Nov 2025 - Apr 2026 | Get Hired Plan
          </p>
          <p className="text-lg text-slate-500">
            Your journey from Web Developer to AI Engineer
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Target className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Track Progress
            </h3>
            <p className="text-slate-400 text-center text-sm">
              Monitor your weekly goals and achievements across 24 weeks of learning
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Briefcase className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Build Portfolio
            </h3>
            <p className="text-slate-400 text-center text-sm">
              Upload and manage your projects and CV to showcase your work
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-12 h-12 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Daily Journal
            </h3>
            <p className="text-slate-400 text-center text-sm">
              Document what you learned, completed, and accomplished each day
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 rounded-2xl border border-emerald-500/30 p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Your Mission</h3>
          <div className="space-y-2 text-slate-300">
            <p>Build one killer project that will get you hired</p>
            <p>Master the AI stack: Python, FastAPI, LlamaIndex, RAG</p>
            <p>Sharpen your C++ DSA skills daily (1 hour/day)</p>
            <p>Deploy a live, production-ready AI application</p>
            <p>Land a 10-15 LPA AI Engineer role</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-lg font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
