"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Eye, BookOpen, Layers } from "lucide-react";
import { Problem, TopicHierarchy } from "@/data";

interface CaseStudyHierarchyProps {
  problems: Problem[];
  onSelectionChange: (selection: {
    problemId: string;
    userStoryId: string;
    acceptanceCriteriaIds: string[];
  }) => void;
  initialSelection?: {
    problemId: string;
    userStoryId: string;
    acceptanceCriteriaIds: string[];
  };
  hierarchy: TopicHierarchy;
}

const CaseStudyHierarchy: React.FC<CaseStudyHierarchyProps> = ({
  problems,
  onSelectionChange,
  initialSelection,
  hierarchy,
}) => {
  const showUserStory = hierarchy.levels.includes("userStory");
  const showAcceptanceCriteria = hierarchy.levels.includes("acceptanceCriteria");
  const userStoryLabel = hierarchy.labels.userStory ?? "User Story";
  const userStoriesLabel = `${userStoryLabel}s`;
  const acLabel = hierarchy.labels.acceptanceCriteria ?? "Acceptance Criteria";
  
  const [expandedProblems, setExpandedProblems] = useState<Set<string>>(new Set());
  const [expandedUserStories, setExpandedUserStories] = useState<Set<string>>(new Set());
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [selectedUserStoryId, setSelectedUserStoryId] = useState<string>("");
  const [selectedAcceptanceCriteriaIds, setSelectedAcceptanceCriteriaIds] = useState<string[]>([]);

  useEffect(() => {
    if (initialSelection) {
      setSelectedProblemId(initialSelection.problemId);
      setSelectedUserStoryId(initialSelection.userStoryId);
      setSelectedAcceptanceCriteriaIds(initialSelection.acceptanceCriteriaIds);
      
      // Auto-expand initial selections
      if (initialSelection.problemId) {
        setExpandedProblems(new Set([initialSelection.problemId]));
      }
      if (initialSelection.userStoryId) {
        setExpandedUserStories(new Set([initialSelection.userStoryId]));
      }
    }
  }, [initialSelection]);

  const selectedProblem = problems.find((p) => p.id === selectedProblemId) ?? null;
  const selectedUserStory =
    selectedProblem?.userStories.find((us) => us.id === selectedUserStoryId) ?? null;

  const toggleProblem = (problemId: string) => {
    setExpandedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(problemId)) next.delete(problemId);
      else next.add(problemId);
      return next;
    });
  };

  const toggleUserStory = (userStoryId: string) => {
    setExpandedUserStories((prev) => {
      const next = new Set(prev);
      if (next.has(userStoryId)) next.delete(userStoryId);
      else next.add(userStoryId);
      return next;
    });
  };

  const selectProblem = (problemId: string) => {
    const isDeselect = selectedProblemId === problemId;
    const newProblemId = isDeselect ? "" : problemId;
    setSelectedProblemId(newProblemId);
    setSelectedUserStoryId("");
    setSelectedAcceptanceCriteriaIds([]);
    onSelectionChange({ problemId: newProblemId, userStoryId: "", acceptanceCriteriaIds: [] });
  };

  const selectUserStory = (userStoryId: string) => {
    const newId = selectedUserStoryId === userStoryId ? "" : userStoryId;
    setSelectedUserStoryId(newId);
    setSelectedAcceptanceCriteriaIds([]);
    onSelectionChange({ problemId: selectedProblemId, userStoryId: newId, acceptanceCriteriaIds: [] });
  };

  const toggleAcceptanceCriteria = (acId: string, userStoryId: string) => {
    if (selectedUserStoryId !== userStoryId) {
      setSelectedUserStoryId(userStoryId);
      setSelectedAcceptanceCriteriaIds([acId]);
      onSelectionChange({ problemId: selectedProblemId, userStoryId, acceptanceCriteriaIds: [acId] });
      return;
    }
    const newSelected = selectedAcceptanceCriteriaIds.includes(acId)
      ? selectedAcceptanceCriteriaIds.filter((id) => id !== acId)
      : [...selectedAcceptanceCriteriaIds, acId];
    setSelectedAcceptanceCriteriaIds(newSelected);
    onSelectionChange({ problemId: selectedProblemId, userStoryId, acceptanceCriteriaIds: newSelected });
  };

  if (problems.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
        <p className="text-slate-500 text-sm font-semibold">Select an area and topic above to view case study scenarios.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* 1. Hierarchy Selection Panel */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-premium border border-slate-200">
        <h3 className="text-base font-black text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers size={18} className="text-accent-blue" />
          <span>Select Exercise Context</span>
        </h3>

        <div className="space-y-3.5">
          {problems.map((p) => {
            const isProblemExpanded = expandedProblems.has(p.id);
            const isProblemSelected = selectedProblemId === p.id;
            return (
              <div key={p.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <button
                  onClick={() => toggleProblem(p.id)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-navy-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectProblem(p.id);
                      }}
                      className="cursor-pointer flex-shrink-0"
                    >
                      {isProblemSelected ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      ) : (
                        <Circle size={18} className="text-slate-400 hover:text-navy-900 transition-colors" />
                      )}
                    </span>
                    <span className="truncate font-extrabold pr-2">{p.name}</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-3xs font-black tracking-widest uppercase hidden sm:inline">
                      {isProblemExpanded ? "Hide" : "Expand"}
                    </span>
                    {isProblemExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isProblemExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-white border-t border-slate-150"
                    >
                      <div className="p-4 space-y-4">
                        <div>
                          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block mb-1">Scenario Statement</span>
                          <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-medium">{p.statement}</p>
                        </div>
                        
                        <button
                          onClick={() => selectProblem(p.id)}
                          className={`w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            isProblemSelected
                              ? "bg-emerald-550 text-white shadow-md hover:bg-emerald-600"
                              : "bg-navy-900 text-white hover:bg-navy-800"
                          }`}
                        >
                          {isProblemSelected ? "✓ Scenario Selected" : "Select Scenario"}
                        </button>

                        {/* Sub-levels (User Stories) */}
                        {isProblemSelected && showUserStory && (
                          <div className="border border-slate-200 rounded-2xl overflow-hidden mt-4">
                            <div className="p-3 bg-slate-50 border-b border-slate-150">
                              <h4 className="font-extrabold text-navy-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                <BookOpen size={14} className="text-accent-blue" />
                                {userStoriesLabel}
                              </h4>
                            </div>
                            
                            <div className="divide-y divide-slate-150">
                              {p.userStories.map((us) => {
                                const isUSExpanded = expandedUserStories.has(us.id);
                                const isUSSelected = selectedUserStoryId === us.id;
                                return (
                                  <div key={us.id} className="bg-white">
                                    <button
                                      onClick={() => toggleUserStory(us.id)}
                                      className="w-full flex items-center justify-between p-3.5 text-left font-bold text-xs text-navy-900 hover:bg-slate-50/50 cursor-pointer"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            selectUserStory(us.id);
                                          }}
                                          className="cursor-pointer flex-shrink-0"
                                        >
                                          {isUSSelected ? (
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                          ) : (
                                            <Circle size={16} className="text-slate-400 hover:text-navy-900" />
                                          )}
                                        </span>
                                        <span className="truncate pr-2">{us.statement}</span>
                                      </div>
                                      {isUSExpanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                                    </button>

                                    <AnimatePresence initial={false}>
                                      {isUSExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.25 }}
                                          className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                                        >
                                          <div className="p-4 space-y-4">
                                            {us.description && (
                                              <div>
                                                <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block mb-1">Details</span>
                                                <p className="text-xs text-slate-600 leading-relaxed">{us.description}</p>
                                              </div>
                                            )}
                                            
                                            <button
                                              onClick={() => selectUserStory(us.id)}
                                              className={`w-full py-2 px-3 rounded-lg text-3xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                                                isUSSelected
                                                  ? "bg-emerald-555 text-white hover:bg-emerald-600"
                                                  : "bg-slate-200 text-navy-900 hover:bg-slate-300"
                                              }`}
                                            >
                                              {isUSSelected ? "✓ User Story Selected" : "Select User Story"}
                                            </button>

                                            {/* Acceptance Criteria */}
                                            {showAcceptanceCriteria && (
                                              <div className="space-y-2 pt-2 border-t border-slate-150">
                                                <h5 className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                                                  Select {acLabel}:
                                                </h5>
                                                <div className="space-y-1">
                                                  {us.acceptanceCriteria.map((ac) => {
                                                    const isACSelected = selectedAcceptanceCriteriaIds.includes(ac.id);
                                                    return (
                                                      <button
                                                        key={ac.id}
                                                        onClick={() => toggleAcceptanceCriteria(ac.id, us.id)}
                                                        className={`w-full text-left p-3 rounded-xl text-xs flex items-start gap-2.5 font-bold transition-all cursor-pointer ${
                                                          isACSelected
                                                            ? "bg-slate-900 text-white shadow-sm"
                                                            : "bg-white border border-slate-200 text-navy-900 hover:border-slate-300"
                                                        }`}
                                                      >
                                                        <div className="mt-0.5 flex-shrink-0">
                                                          {isACSelected ? (
                                                            <CheckCircle2 size={14} className="text-accent-sky" />
                                                          ) : (
                                                            <Circle size={14} className="text-slate-350" />
                                                          )}
                                                        </div>
                                                        <span className="leading-tight">{ac.criteria}</span>
                                                      </button>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Preview Panel */}
      <div className="lg:col-span-5 bg-navy-950 text-white rounded-3xl p-6 shadow-2xl border border-white/5 relative overflow-hidden self-stretch flex flex-col">
        {/* Subtle grid pattern inside dark preview */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />

        <h3 className="text-base font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2 relative z-10">
          <Eye size={18} className="text-accent-sky" />
          <span>Active Context Preview</span>
        </h3>

        <div className="space-y-5 flex-1 relative z-10">
          {selectedProblem ? (
            <div className="space-y-4">
              
              {/* Problem Statement Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5">
                <span className="text-[9px] font-black text-accent-sky tracking-widest uppercase block mb-1">Scenario</span>
                <h4 className="font-extrabold text-sm text-white mb-2">{selectedProblem.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{selectedProblem.statement}</p>
                {selectedProblem.context && (
                  <p className="text-3xs text-slate-400 font-mono mt-3 pt-3 border-t border-white/5">CONTEXT: {selectedProblem.context}</p>
                )}
              </div>

              {/* User Story Card */}
              {selectedUserStory && showUserStory && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4.5"
                >
                  <span className="text-[9px] font-black text-accent-sky tracking-widest uppercase block mb-1">{userStoryLabel}</span>
                  <p className="text-xs text-white font-extrabold mb-1">"{selectedUserStory.statement}"</p>
                  {selectedUserStory.description && (
                    <p className="text-2xs text-slate-350 leading-relaxed mt-2">{selectedUserStory.description}</p>
                  )}
                </motion.div>
              )}

              {/* Acceptance Criteria Card */}
              {selectedAcceptanceCriteriaIds.length > 0 && showAcceptanceCriteria && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4.5"
                >
                  <span className="text-[9px] font-black text-accent-sky tracking-widest uppercase block mb-3">
                    Selected {acLabel} ({selectedAcceptanceCriteriaIds.length})
                  </span>
                  <div className="space-y-2">
                    {selectedAcceptanceCriteriaIds.map((id) => {
                      const criteria = selectedUserStory?.acceptanceCriteria.find((ac) => ac.id === id);
                      return criteria ? (
                        <div key={id} className="text-xs text-slate-200 flex items-start gap-2 font-semibold">
                          <CheckCircle2 size={12} className="text-accent-sky mt-0.5 flex-shrink-0" />
                          <span>{criteria.criteria}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </motion.div>
              )}
              
            </div>
          ) : (
            <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center p-6 border border-white/5 rounded-2xl">
              <span className="text-3xl mb-3">📥</span>
              <p className="text-xs text-slate-400 font-bold max-w-xs leading-relaxed">
                Choose and select a scenario from the sidebar to preview the loaded workspace context.
              </p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default CaseStudyHierarchy;
