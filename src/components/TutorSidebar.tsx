import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Paperclip, 
  Sparkles, 
  FileText, 
  Loader2, 
  Trash2,
  User,
  Bot
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  files?: { name: string; type: string; data: string }[];
  timestamp: Date;
}

interface TutorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
}

export function TutorSidebar({ isOpen, onClose, profile }: TutorSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: `Hi ${profile?.firstName || 'there'}! I'm your AI study tutor. I can help you summarize notes, explain complex topics, or even review your documents. What are we studying today?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; type: string; data: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = (event.target?.result as string).split(',')[1];
        setAttachedFiles(prev => [...prev, {
          name: file.name,
          type: file.type,
          data: base64Data
        }]);
      };
      reader.readAsDataURL(file);
    });
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      files: [...attachedFiles],
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      // Build history for context
      const history = messages.slice(-10).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // Add current message with files
      const currentParts: any[] = [{ text: input || "Please analyze these documents." }];
      userMessage.files?.forEach(file => {
        currentParts.push({
          inlineData: {
            mimeType: file.type,
            data: file.data
          }
        });
      });

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: 'user', parts: currentParts }],
        config: {
          systemInstruction: `You are a helpful and encouraging AI Study Tutor. 
          The student's name is ${profile?.firstName || 'Student'}.
          They are at the ${profile?.studentLevel || 'University'} level.
          Provide clear, concise, and accurate explanations. 
          If documents are provided, prioritize information from them while adding your own expert knowledge.
          Use Markdown for formatting.`,
        }
      });

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error: any) {
      console.error("Tutor Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error. Please check your connection or try again later.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'model',
        text: `Hi ${profile?.firstName || 'there'}! I'm your AI study tutor. I can help you summarize notes, explain complex topics, or even review your documents. What are we studying today?`,
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-96 bg-white border-l border-slate-100 flex flex-col h-screen sticky top-0 z-50 shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">AI Study Tutor</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={clearChat}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear Chat"
              >
                <Trash2 size={18} />
              </button>
              <button 
                onClick={onClose} 
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  {msg.role === 'model' && <Bot size={12} className="text-indigo-600" />}
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {msg.role === 'user' ? 'You' : 'AI Tutor'}
                  </span>
                  {msg.role === 'user' && <User size={12} className="text-slate-400" />}
                </div>
                
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                  {msg.files && msg.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {msg.files.map((file, idx) => (
                        <div key={idx} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-[10px] font-medium ${
                          msg.role === 'user' ? 'bg-indigo-500/50 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <FileText size={12} />
                          <span className="truncate max-w-[100px]">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none prose-slate">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
                <span className="text-[10px] text-slate-300 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  <Bot size={12} className="text-indigo-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Tutor</span>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {attachedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-100 group">
                    <FileText size={14} />
                    <span className="truncate max-w-[120px]">{file.name}</span>
                    <button 
                      onClick={() => removeFile(idx)}
                      className="p-0.5 hover:bg-indigo-200 rounded-full transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask your tutor anything..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none min-h-[48px] max-h-[120px]"
                  rows={1}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    title="Attach document"
                  >
                    <Paperclip size={18} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    multiple
                    accept=".pdf,.doc,.docx,.txt,image/*"
                  />
                </div>
              </div>
              <button 
                onClick={sendMessage}
                disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-3 font-medium">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
