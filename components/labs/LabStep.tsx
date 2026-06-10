import { Copy, Clock, Check, Terminal, FileCode, CheckSquare } from "lucide-react";
import { useState } from "react";
import { Step, TopicHierarchy, DEFAULT_HIERARCHY } from "@/data/index";
import { Problem, UserStoryExample, AcceptanceCriteria } from "@/data";
import { motion, AnimatePresence } from "framer-motion";

interface LabStepProps {
  step: Step;
  index: number;
  copyToClipboard: (text: string) => void;
  caseStudy?: {
    problem: Problem;
    userStory: UserStoryExample | null;
    acceptanceCriteria: AcceptanceCriteria[];
  } | null;
  isSecondStep?: boolean;
  hierarchy?: TopicHierarchy;
  personaIntro?: string;
}

const LabStep: React.FC<LabStepProps> = ({
  step,
  index,
  copyToClipboard,
  caseStudy,
  isSecondStep,
  hierarchy,
  personaIntro,
}) => {
  const resolvedHierarchy = hierarchy ?? DEFAULT_HIERARCHY;
  const showUserStory = resolvedHierarchy.levels.includes("userStory");
  const showAC = resolvedHierarchy.levels.includes("acceptanceCriteria");
  const userStoryLabel = resolvedHierarchy.labels.userStory ?? "User Story";
  const acLabel = resolvedHierarchy.labels.acceptanceCriteria ?? "Acceptance Criteria";
  
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopy = (text: string) => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySummary = (text: string) => {
    copyToClipboard(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const getPrompt = () => {
    return step.prompt
      ?.replace("{{PERSONA_INTRO}}", personaIntro ?? "")
      ?.replace("{{CASE_STUDY_DATA}}", "") ?? null;
  };

  const prompt = getPrompt();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-premium relative overflow-hidden">
      
      {/* Top Header Block */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase block mb-1">
            PART 0{index + 1}
          </span>
          <h3 className="font-extrabold text-lg sm:text-xl text-navy-900 leading-tight">
            {step.title}
          </h3>
        </div>
        
        {/* Timer badge */}
        <div className="flex items-center gap-1.5 bg-slate-100 py-1.5 px-3 rounded-full text-slate-650 font-bold text-xs flex-shrink-0 self-start sm:self-center">
          <Clock size={14} />
          <span>{step.time} mins</span>
        </div>
      </div>

      {/* Setup Checklist */}
      {step.setup && (
        <div className="mb-6">
          <h4 className="font-extrabold text-navy-900 mb-3 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <CheckSquare size={14} className="text-accent-blue" />
            Setup Checklist
          </h4>
          <ul className="space-y-2.5">
            {step.setup.map((item, i) => (
              <li key={i} className="text-slate-600 text-xs sm:text-sm font-semibold flex items-start">
                <span className="text-accent-blue mr-2 text-sm mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Guidelines Section */}
      {step.guidelines && (
        <div className="mb-6">
          <h4 className="font-extrabold text-navy-900 mb-3 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <FileCode size={14} className="text-accent-blue" />
            Instructions & Guidelines
          </h4>
          <ul className="space-y-2.5">
            {step.guidelines.map((item, i) => (
              <li key={i} className="text-slate-650 text-xs sm:text-sm leading-relaxed flex items-start">
                <span className="text-accent-blue mr-2 text-sm mt-0.5">›</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detail Boxes */}
      {step.details && (
        <div className="mb-6 space-y-4">
          {step.details.map((detail, i) => (
            <div key={i} className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
              <h4 className="font-extrabold text-navy-900 mb-2 text-sm uppercase tracking-wide">
                {detail.heading}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm whitespace-pre-line leading-relaxed font-semibold">
                {detail.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* AI Teacher prompt block */}
      {prompt && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2.5">
            <h4 className="font-extrabold text-navy-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Terminal size={14} className="text-accent-blue" />
              {isSecondStep && caseStudy ? `${userStoryLabel} Prompt` : "Instructions Prompt"}
            </h4>
            
            <button
              onClick={() => handleCopy(prompt)}
              className="flex items-center gap-1.5 text-xs font-bold text-accent-blue hover:text-navy-900 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500 animate-bounce" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          
          {/* Terminal styled prompt box */}
          <div className="bg-navy-950 text-slate-250 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm font-mono whitespace-pre-line overflow-auto max-h-56 border border-white/5 shadow-inner">
            {prompt}
          </div>
        </div>
      )}

      {/* Lock warning if second step hasn't loaded context */}
      {isSecondStep && !caseStudy && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <span className="text-2xl mt-0.5">⚠️</span>
          <div>
            <h4 className="font-extrabold text-amber-900 text-xs uppercase tracking-wider mb-1">Context Locked</h4>
            <p className="text-xs text-amber-800 leading-relaxed font-semibold">
              {resolvedHierarchy.levels.length === 1
                ? "Please choose a Scenario problem context above to unlock this step."
                : resolvedHierarchy.levels.length === 2
                ? `Please choose a Scenario problem and select a ${userStoryLabel.toLowerCase()} above to unlock this step.`
                : `Please select a Scenario problem, ${userStoryLabel.toLowerCase()}, and ${acLabel.toLowerCase()} criteria options above to unlock this step.`}
            </p>
          </div>
        </div>
      )}

      {/* Full workspace copy segment */}
      {isSecondStep && caseStudy && (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200 bg-slate-100/50">
            <h4 className="font-extrabold text-navy-900 text-xs uppercase tracking-wider">Loaded Workspace Context</h4>
            <button
              onClick={() => {
                const { problem, userStory, acceptanceCriteria } = caseStudy;
                const lines = [
                  `Problem Statement: ${problem.statement}`,
                  ...(problem.description ? [`Description: ${problem.description}`] : []),
                  ...(problem.context ? [`Context: ${problem.context}`] : []),
                  ...(problem.note ? [`Note: ${problem.note}`] : []),
                  ...(problem.personas.length > 0
                    ? [`Personas:\n${problem.personas.map((p, i) => `${i + 1}. ${p.name} (${p.role}): ${p.description}`).join("\n")}`]
                    : []),
                  ...(userStory && showUserStory ? [`Selected ${userStoryLabel}: ${userStory.statement}`] : []),
                  ...(acceptanceCriteria.length > 0 && showAC
                    ? [`Selected ${acLabel}:\n${acceptanceCriteria.map((ac, i) => `${i + 1}. ${ac.criteria}`).join("\n")}`]
                    : []),
                ];
                handleCopySummary(lines.join("\n\n"));
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-accent-blue hover:text-navy-900 transition-colors cursor-pointer"
            >
              {copiedSummary ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Content Summary</span>
                </>
              )}
            </button>
          </div>
          
          {/* Metadata content tags */}
          <div className="p-5 space-y-4 max-h-[300px] overflow-auto">
            <div>
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Scenario statement:</p>
              <p className="text-xs text-navy-900 font-semibold leading-relaxed">{caseStudy.problem.statement}</p>
            </div>
            
            {caseStudy.problem.description && (
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Description:</p>
                <p className="text-xs text-slate-650 leading-relaxed">{caseStudy.problem.description}</p>
              </div>
            )}
            
            {caseStudy.problem.context && (
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">System Context:</p>
                <p className="text-xs text-slate-600 font-medium">{caseStudy.problem.context}</p>
              </div>
            )}
            
            {caseStudy.problem.note && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5">
                <p className="text-[10px] font-black text-amber-800 tracking-widest uppercase mb-1">Important Note:</p>
                <p className="text-xs text-amber-800 leading-relaxed font-semibold">{caseStudy.problem.note}</p>
              </div>
            )}
            
            {caseStudy.problem.personas.length > 0 && (
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2">Scenario Personas:</p>
                <ul className="space-y-2">
                  {caseStudy.problem.personas.map((p, i) => (
                    <li key={i} className="text-xs text-slate-650 font-semibold bg-white border border-slate-150 p-2.5 rounded-xl">
                      <span className="text-navy-950 font-extrabold">{p.name}</span> <span className="text-slate-400 text-3xs font-black tracking-wide">({p.role})</span>: {p.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {caseStudy.userStory && showUserStory && (
              <div className="border-t border-slate-200 pt-3">
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">
                  Selected {userStoryLabel}:
                </p>
                <p className="text-xs text-navy-900 font-extrabold italic">"{caseStudy.userStory.statement}"</p>
              </div>
            )}
            
            {caseStudy.acceptanceCriteria.length > 0 && showAC && (
              <div className="border-t border-slate-200 pt-3">
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2">Selected Criteria:</p>
                <ul className="space-y-1.5">
                  {caseStudy.acceptanceCriteria.map((ac, i) => (
                    <li key={i} className="text-xs text-slate-650 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                      <span>{ac.criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabStep;
