"use client";
import { useState } from "react";

interface AptitudeChapter {
    id?: number;
    title: string;
    content: string;
    order: number;
}

interface AptitudeChapterFormModalProps {
    chapter: AptitudeChapter | null;
    onClose: () => void;
    onSave: (chapter: Partial<AptitudeChapter>) => Promise<void>;
}

export default function AptitudeChapterFormModal({ chapter, onClose, onSave }: AptitudeChapterFormModalProps) {
    const [title, setTitle] = useState(chapter?.title || "");
    const [content, setContent] = useState(chapter?.content || "");
    const [order, setOrder] = useState(chapter?.order || 1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (!title.trim() || !content.trim()) {
                setError("Title and content are required");
                return;
            }

            await onSave({
                title: title.trim(),
                content: content.trim(),
                order: order || 1,
            });
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to save chapter");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-panel w-full max-w-2xl rounded-2xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {chapter ? "Edit Aptitude Chapter" : "Create Aptitude Chapter"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Chapter Title *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500"
                            placeholder="e.g., Logical Reasoning, Quantitative Aptitude"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Chapter Content *
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500 resize-none"
                            placeholder="Describe what this chapter covers, key concepts, and learning objectives..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Order
                        </label>
                        <input
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                            min="1"
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500/40 outline-none text-white placeholder-gray-500"
                            placeholder="1"
                        />
                        <p className="text-xs text-gray-500 mt-1">Order in which this chapter appears</p>
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
                                chapter ? "Update Chapter" : "Create Chapter"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
