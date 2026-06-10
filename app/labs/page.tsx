"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, Download, Search, Sparkles, BookOpen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import LabStep from "@/components/labs/LabStep";
import { AcceptanceCriteria, DEFAULT_HIERARCHY } from "@/data";
import { filterLabs, getPersonas, getTopics, getAreas, getProblems } from "@/lib/lab-utils";
import SelectFilter from "@/components/labs/SelectFilter";
import { getPersonaIntro } from "@/data";
import { downloadLabSheet } from "@/lib/download";
import { copyToClipboard } from "@/lib/utils";
import CaseStudyHierarchy from "@/components/labs/CaseStudyHierarchy";

const findMatchingOption = (options: string[], urlValue: string): string => {
  if (!urlValue) return "";
  return (
    options.find((option) => option.toLowerCase() === urlValue.toLowerCase()) || ""
  );
};

const LabsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lastParamsRef = useRef<string>("");

  const areas = useMemo(() => getAreas(), []);
  const personas = useMemo(() => getPersonas(), []);

  const [filters, setFilters] = useState({
    area: "",
    topic: "",
    persona: "",
  });

  const [hierarchySelection, setHierarchySelection] = useState({
    problemId: "",
    userStoryId: "",
    acceptanceCriteriaIds: [] as string[],
  });

  const selectedArea = filters.area;
  const topics = useMemo(() => getTopics(selectedArea), [selectedArea]);

  useEffect(() => {
    const currentParams = searchParams.toString();
    if (currentParams !== lastParamsRef.current) {
      lastParamsRef.current = currentParams;
      const urlArea = findMatchingOption(areas, searchParams.get("area") || "");
      const urlTopic = findMatchingOption(topics, searchParams.get("topic") || "");
      const urlPersona = findMatchingOption(personas, searchParams.get("persona") || "");
      const urlProblemId = searchParams.get("problemId") || "";
      const urlUserStoryId = searchParams.get("userStoryId") || "";
      const urlAcceptanceCriteriaIds = searchParams.get("acceptanceCriteriaIds")?.split(",") || [];
      
      setFilters((prev) => {
        if (
          prev.area !== urlArea ||
          prev.topic !== urlTopic ||
          prev.persona !== urlPersona
        ) {
          return {
            area: urlArea,
            topic: urlTopic,
            persona: urlPersona,
          };
        }
        return prev;
      });
      
      setHierarchySelection({
        problemId: urlProblemId,
        userStoryId: urlUserStoryId,
        acceptanceCriteriaIds: urlAcceptanceCriteriaIds,
      });
    }
  }, [searchParams, areas, topics, personas]);

  const selectedTopic = filters.topic;
  const explicitPersona = filters.persona;

  const availableProblems = useMemo(() => {
    if (selectedArea && selectedTopic) {
      return getProblems(selectedArea, selectedTopic);
    }
    return [];
  }, [selectedArea, selectedTopic]);

  const defaultPersona = useMemo(() => {
    if (explicitPersona) return explicitPersona;
    if (selectedArea && selectedTopic && personas.length > 0) {
      return personas[0];
    }
    return "";
  }, [explicitPersona, selectedArea, selectedTopic, personas]);

  const { filteredLabs, selectedProblem, topicHierarchy } = useMemo(() => {
    if (selectedArea && selectedTopic) {
      const result = filterLabs(
        selectedArea,
        selectedTopic,
        hierarchySelection.problemId
      );
      return {
        filteredLabs: result.labs,
        selectedProblem: result.selectedProblem,
        topicHierarchy: result.hierarchy,
      };
    }
    return { filteredLabs: [], selectedProblem: null, topicHierarchy: DEFAULT_HIERARCHY };
  }, [selectedArea, selectedTopic, hierarchySelection.problemId]);

  const selectedHierarchicalData = useMemo(() => {
    if (!selectedProblem) return null;
    const levels = topicHierarchy.levels;

    if (!levels.includes("userStory")) {
      return { problem: selectedProblem, userStory: null, acceptanceCriteria: [] as AcceptanceCriteria[] };
    }

    if (!hierarchySelection.userStoryId) return null;
    const userStory = selectedProblem.userStories.find(us => us.id === hierarchySelection.userStoryId);
    if (!userStory) return null;

    if (!levels.includes("acceptanceCriteria")) {
      return { problem: selectedProblem, userStory, acceptanceCriteria: [] as AcceptanceCriteria[] };
    }

    if (hierarchySelection.acceptanceCriteriaIds.length === 0) return null;
    const acceptanceCriteria = hierarchySelection.acceptanceCriteriaIds
      .map(id => userStory.acceptanceCriteria.find(ac => ac.id === id))
      .filter((ac): ac is AcceptanceCriteria => ac !== undefined);
    if (acceptanceCriteria.length === 0) return null;

    return { problem: selectedProblem, userStory, acceptanceCriteria };
  }, [selectedProblem, hierarchySelection, topicHierarchy]);

  const selectedLab = filteredLabs.length > 0 ? filteredLabs[0] : null;
  const personaIntro = useMemo(
    () => (selectedArea ? getPersonaIntro(selectedArea, defaultPersona) : null),
    [selectedArea, defaultPersona]
  );

  const updateFilters = (updates: Record<string, string>) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (updates.area !== undefined) {
        newFilters.area = findMatchingOption(areas, updates.area);
        if (newFilters.area !== prev.area) {
          newFilters.topic = "";
        }
      }
      if (updates.topic !== undefined) {
        newFilters.topic = findMatchingOption(topics, updates.topic);
      }
      if (updates.persona !== undefined) {
        newFilters.persona = findMatchingOption(personas, updates.persona);
      }
      return newFilters;
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.area) params.set("area", filters.area.toLowerCase());
    if (filters.topic) params.set("topic", filters.topic.toLowerCase());
    if (filters.persona) params.set("persona", filters.persona.toLowerCase());
    if (hierarchySelection.problemId) params.set("problemId", hierarchySelection.problemId);
    if (hierarchySelection.userStoryId) params.set("userStoryId", hierarchySelection.userStoryId);
    if (hierarchySelection.acceptanceCriteriaIds.length > 0) params.set("acceptanceCriteriaIds", hierarchySelection.acceptanceCriteriaIds.join(","));
    router.push(`/labs?${params.toString()}`, { scroll: false });
  }, [filters, hierarchySelection, router]);

  const handleDownload = () => {
    if (!selectedLab) return;
    downloadLabSheet(selectedLab, personaIntro, selectedHierarchicalData, topicHierarchy);
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden px-6 pt-32 pb-20 bg-slate-50/50">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Floating background blur accent */}
      <div className="absolute top-1/4 -right-10 w-80 h-80 rounded-full bg-accent-sky/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 w-96 h-96 rounded-full bg-accent-indigo/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* Title & Description Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full bg-navy-900 border border-white/10 text-accent-sky text-2xs font-extrabold mb-4 tracking-wider uppercase">
            <Sparkles size={12} className="text-accent-sky" />
            <span>Interactive Sandbox</span>
          </span>
          
          <h1 className="text-4xl sm:text-5xl font-black text-navy-900 tracking-tighter leading-none mb-4">
            AI-Powered Workbench
          </h1>
          
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Select your Area, Topic, and Mentor Persona to load the structured lab template. Then utilize the Case Study to build contextual test prompts.
          </p>
        </motion.div>

        {/* 1. Filters Section: Rounded Card Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-premium mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SelectFilter
            label="1. Target Area"
            options={areas}
            value={selectedArea}
            onChange={(value) => updateFilters({ area: value })}
            icon={<Search size={16} />}
          />

          <SelectFilter
            label="2. Exercise Topic"
            options={topics}
            value={selectedTopic}
            onChange={(value) => updateFilters({ topic: value })}
            icon={<Search size={16} />}
          />

          <SelectFilter
            label="3. Mentor Persona"
            options={personas}
            value={defaultPersona}
            onChange={(value) => updateFilters({ persona: value })}
            icon={<Search size={16} />}
          />
        </motion.div>

        {/* 2. Hierarchy Cases Panel (only rendered if topic/area active) */}
        {selectedArea && selectedTopic && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CaseStudyHierarchy
              problems={availableProblems}
              onSelectionChange={setHierarchySelection}
              initialSelection={hierarchySelection}
              hierarchy={topicHierarchy}
            />
          </motion.div>
        )}

        {/* 3. Empty State Card */}
        {!selectedLab && (
          <motion.div
            className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-premium relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-blue via-accent-sky to-accent-indigo" />
            
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400">
                <Filter size={40} className="text-accent-blue" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-navy-900 mb-2">
              Workbench is Empty
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              Please choose a Target Area and Exercise Topic from the control deck above to automatically load your interactive lab modules.
            </p>
          </motion.div>
        )}

        {/* 4. Active Workbench Display */}
        {selectedLab && personaIntro && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Lab Card Header banner */}
            <div className="bg-navy-950 text-white rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
              
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-accent-sky text-3xs font-extrabold uppercase tracking-widest">
                  <BookOpen size={10} /> Active Lab Sheet
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  {selectedLab.title}
                </h2>
                {selectedLab.description && (
                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                    {selectedLab.description}
                  </p>
                )}
              </div>
              
              {/* Download CTA button */}
              <button
                onClick={handleDownload}
                className="relative z-10 flex items-center justify-center gap-2 bg-white text-navy-950 hover:bg-accent-blue hover:text-white font-extrabold text-xs uppercase tracking-wider py-4 px-6.5 rounded-full transition-all shadow-lg hover:scale-103 cursor-pointer"
              >
                <Download size={14} />
                <span>Download Lab Sheet</span>
              </button>
            </div>

            {/* List of Steps */}
            <div className="space-y-8">
              {selectedLab.steps.map((step, i) => (
                <LabStep
                  key={i}
                  step={step}
                  index={i}
                  copyToClipboard={copyToClipboard}
                  caseStudy={step.type === "interaction" ? selectedHierarchicalData : null}
                  isSecondStep={step.type === "interaction"}
                  hierarchy={topicHierarchy}
                  personaIntro={personaIntro}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default LabsPage;
