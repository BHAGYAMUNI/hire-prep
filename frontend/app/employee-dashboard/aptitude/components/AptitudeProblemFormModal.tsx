"use client";
import { useState } from "react";

interface AptitudeProblem {
    id?: number;
    title: string;
    description: string;
    question_type: string;
    difficulty: string;
    options: string[];
    correct_answer: string;
    explanation: string;
    time_limit: number;
}

interface AptitudeProblemFormModalProps {
    problem: AptitudeProblem | null;
    chapterId: number;
    onClose: () => void;
    onSave: (problem: Partial<AptitudeProblem>) => Promise<void>;
}

export default function AptitudeProblemFormModal({ problem, chapterId, onClose, onSave }: AptitudeProblemFormModalProps) {
    const [title, setTitle] = useState(problem?.title || "");
    const [description, setDescription] = useState(problem?.description || "");
    const [questionType, setQuestionType] = useState(problem?.question_type || "MCQ");
    const [difficulty, setDifficulty] = useState(problem?.difficulty || "Easy");
    const [options, setOptions] = useState<string[]>(problem?.options || ["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState(problem?.correct_answer || "");
    const [explanation, setExplanation] = useState(problem?.explanation || "");
    const [timeLimit, setTimeLimit] = useState(problem?.time_limit || 60);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (!title.trim() || !description.trim()) {
                setError("Title and description are required");
                return;
            }

            if (questionType === "MCQ") {
                const validOptions = options.filter(opt => opt.trim());
                if (validOptions.length < 2) {
                    setError("At least 2 options are required for MCQ questions");
                    return;
                }
                if (!correctAnswer || !validOptions.includes(correctAnswer)) {
                    setError("Correct answer must be one of the options");
                    return;
                }
            } else {
                if (!correctAnswer.trim()) {
                    setError("Correct answer is required for numerical questions");
                    return;
                }
            }

            await onSave({
                title: title.trim(),
                description: description.trim(),
                question_type: questionType,
                difficulty,
                options: questionType === "MCQ" ? options.filter(opt => opt.trim()) : [],
                correct_answer: correctAnswer.trim(),
                explanation: explanation.trim(),
                time_limit: timeLimit || 60,
            });
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to save problem");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-panel w-full max-w-3xl rounded-2xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {problem ? "Edit Aptitude Problem" : "Create Aptitude Problem"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Problem Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500"
                                placeholder="e.g., Number Series Problem"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Question Type
                            </label>
                            <select
                                value={questionType}
                                onChange={(e) => setQuestionType(e.target.value)}
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white"
                            >
                                <option value="MCQ">Multiple Choice (MCQ)</option>
                                <option value="NUMERICAL">Numerical Answer</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Problem Description *
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500 resize-none"
                            placeholder="Describe the problem in detail..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Difficulty
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Time Limit (seconds)
                            </label>
                            <input
                                type="number"
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 60)}
                                min="10"
                                max="600"
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {questionType === "MCQ" ? (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Options *
                                </label>
                                <button
                                    type="button"
                                    onClick={addOption}
                                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors"
                                >
                                    Add Option
                                </button>
                            </div>
                            <div className="space-y-3">
                                {options.map((option, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={correctAnswer === option}
                                            onChange={() => setCorrectAnswer(option)}
                                            className="w-4 h-4 text-purple-600"
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500"
                                            placeholder={`Option ${index + 1}`}
                                        />
                                        {options.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => removeOption(index)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Select the radio button for the correct answer</p>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Correct Answer *
                            </label>
                            <input
                                type="text"
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500"
                                placeholder="e.g., 42, 3.14, 100"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Explanation
                        </label>
                        <textarea
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500 resize-none"
                            placeholder="Explain the solution approach and reasoning..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                problem ? "Update Problem" : "Create Problem"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
