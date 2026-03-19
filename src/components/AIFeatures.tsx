import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Square, Play, Pause, Image as ImageIcon, Video, Search, MapPin, Loader2, Download, MessageSquare } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import Markdown from 'react-markdown';

// --- Live Tutor View ---
export function LiveTutorView({ module, profile }: any) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  
  const [textInput, setTextInput] = useState('');
  
  const aiRef = useRef<any>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    setMessages([]);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      aiRef.current = ai;

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      nextPlayTimeRef.current = audioContextRef.current.currentTime;

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: `You are a helpful and encouraging tutor for the subject: ${module.title}. 
          Your student is at the ${profile?.studentLevel || 'University'} level${profile?.educationPhase ? ` (${profile.educationPhase})` : ''}${profile?.yearGrade ? `, specifically in ${profile.yearGrade}` : ''}.
          
          CRITICAL ADAPTATION RULES:
          1. Adapt your teaching style, complexity of explanations, and vocabulary to match this educational level.
          2. For Primary School: Use very simple language, short sentences, and fun examples.
          3. For High School: Use clear language but introduce subject-specific terminology.
          4. For University/College: Use academic terminology and encourage critical thinking.
          5. For Training: Focus on practical application and industry standards.
          
          Keep your answers concise and engaging.`,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: async () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            try {
              streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1 } });
              const source = audioContextRef.current!.createMediaStreamSource(streamRef.current);
              
              // Simple script processor for audio capture
              const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
              processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmData = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                  pcmData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
                }
                
                // Convert Int16Array to base64
                const uint8Array = new Uint8Array(pcmData.buffer);
                let binary = '';
                for (let i = 0; i < uint8Array.byteLength; i++) {
                  binary += String.fromCharCode(uint8Array[i]);
                }
                const base64Data = btoa(binary);

                sessionPromise.then((session: any) => {
                  if (isConnected) {
                    session.sendRealtimeInput({
                      audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                    });
                  }
                });
              };
              
              source.connect(processor);
              processor.connect(audioContextRef.current!.destination);
              workletNodeRef.current = processor as any;

            } catch (err) {
              console.error("Error accessing microphone:", err);
              setError("Could not access microphone.");
              stopSession();
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            const anyMsg = message as any;

            // Handle model output (audio and text transcription)
            if (anyMsg.serverContent?.modelTurn?.parts) {
              for (const part of anyMsg.serverContent.modelTurn.parts) {
                if (part.inlineData && part.inlineData.data) {
                  const base64Audio = part.inlineData.data;
                  playAudioChunk(base64Audio);
                }
                if (part.text) {
                  setMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.role === 'model') {
                      return [...prev.slice(0, -1), { role: 'model', text: last.text + part.text! }];
                    }
                    return [...prev, { role: 'model', text: part.text! }];
                  });
                }
              }
            }
            
            // Handle user input transcription
            if (anyMsg.serverContent?.userTurn?.parts) {
              for (const part of anyMsg.serverContent.userTurn.parts) {
                if (part.text) {
                  setMessages(prev => {
                    // Avoid duplicate messages if we just sent text manually
                    const last = prev[prev.length - 1];
                    if (last && last.role === 'user' && last.text === part.text) {
                      return prev;
                    }
                    return [...prev, { role: 'user', text: part.text! }];
                  });
                }
              }
            }

            if (message.serverContent?.interrupted) {
              if (audioContextRef.current) {
                nextPlayTimeRef.current = audioContextRef.current.currentTime;
              }
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("Connection error occurred.");
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err: any) {
      console.error("Error starting session:", err);
      setError(err.message || "Failed to start session.");
      setIsConnecting(false);
    }
  };

  const sendTextMessage = () => {
    if (!textInput.trim() || !sessionRef.current) return;
    
    const text = textInput.trim();
    sessionRef.current.sendRealtimeInput({
      text: text
    });
    
    setMessages(prev => [...prev, { role: 'user', text: text }]);
    setTextInput('');
  };

  const playAudioChunk = (base64Data: string) => {
    if (!audioContextRef.current) return;
    
    const binaryString = window.atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Decode PCM 16-bit 24kHz
    const int16Array = new Int16Array(bytes.buffer);
    const audioBuffer = audioContextRef.current.createBuffer(1, int16Array.length, 24000);
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < int16Array.length; i++) {
      channelData[i] = int16Array[i] / 32768.0;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    
    const startTime = Math.max(audioContextRef.current.currentTime, nextPlayTimeRef.current);
    source.start(startTime);
    nextPlayTimeRef.current = startTime + audioBuffer.duration;
  };

  const stopSession = () => {
    setIsConnected(false);
    setIsConnecting(false);
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Live Tutor</h3>
          <p className="text-sm text-slate-500">Have a real-time voice conversation with your AI tutor.</p>
        </div>
        <div className="flex items-center gap-4">
          {!isConnected ? (
            <button 
              onClick={startSession}
              disabled={isConnecting}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {isConnecting ? <Loader2 className="animate-spin" size={20} /> : <Mic size={20} />}
              {isConnecting ? 'Connecting...' : 'Start Conversation'}
            </button>
          ) : (
            <button 
              onClick={stopSession}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
            >
              <Square size={20} />
              End Conversation
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[400px] bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {isConnected ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                <Mic size={48} className="text-indigo-600" />
              </div>
              <p className="text-lg font-bold text-slate-600 animate-pulse">Listening & Speaking...</p>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <Mic size={48} className="mx-auto mb-4 opacity-50" />
              <p>Click "Start Conversation" to begin.</p>
            </div>
          )}
        </div>

        <div className="h-[400px] flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-500" />
              Conversation History
            </h4>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                No messages yet. Start speaking or type below!
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-2">
                    {msg.role === 'user' ? 'You' : 'AI Tutor'}
                  </span>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                  }`}>
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {isConnected && (
            <div className="p-4 border-t border-slate-50 bg-slate-50/30">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
                  placeholder="Type a message to the tutor..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button 
                  onClick={sendTextMessage}
                  disabled={!textInput.trim()}
                  className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  <Play size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Visuals View ---
export function VisualsView({ module, onUpdate }: any) {
  const [prompt, setPrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingImage(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          setGeneratedImage(imageUrl);
          break;
        }
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(err.message || "Failed to generate image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const generateVideo = async () => {
    if (!generatedImage) return;
    
    // Check for API key for Veo
    if (!(window as any).aistudio?.hasSelectedApiKey?.()) {
      if ((window as any).aistudio?.openSelectKey) {
        await (window as any).aistudio.openSelectKey();
      } else {
        setError("API key selection is required for video generation.");
        return;
      }
    }

    setIsGeneratingVideo(true);
    setError(null);
    setGeneratedVideo(null);

    try {
      // Create a new instance after key selection
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const base64Data = generatedImage.split(',')[1];
      const mimeType = generatedImage.split(';')[0].split(':')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
          imageBytes: base64Data,
          mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey as string,
          },
        });
        const blob = await response.blob();
        setGeneratedVideo(URL.createObjectURL(blob));
      } else {
        setError("Failed to retrieve video URL.");
      }

    } catch (err: any) {
      console.error("Video generation error:", err);
      setError(err.message || "Failed to generate video.");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
      <h3 className="text-xl font-bold mb-2">Visuals Studio</h3>
      <p className="text-sm text-slate-500 mb-6">Generate educational images and animate them into videos.</p>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Prompt</label>
          <div className="flex gap-2">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A detailed diagram of a plant cell..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              onClick={generateImage}
              disabled={isGeneratingImage || !prompt.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isGeneratingImage ? <Loader2 className="animate-spin" size={18} /> : <ImageIcon size={18} />}
              Generate Image
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {generatedImage && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700">Generated Image</h4>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video flex items-center justify-center">
              <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={generateVideo}
                disabled={isGeneratingVideo}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isGeneratingVideo ? <Loader2 className="animate-spin" size={18} /> : <Video size={18} />}
                {isGeneratingVideo ? 'Animating Video (This takes a few minutes)...' : 'Animate with Veo'}
              </button>
            </div>
          </div>
        )}

        {generatedVideo && (
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-700">Generated Video</h4>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-black aspect-video flex items-center justify-center">
              <video src={generatedVideo} controls className="w-full h-full" />
            </div>
            <div className="flex justify-end">
               <a 
                href={generatedVideo} 
                download="generated-video.mp4"
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition-all flex items-center gap-2 text-sm"
              >
                <Download size={16} /> Download Video
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Research View ---
export function ResearchView({ module }: any) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'web' | 'maps'>('web');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setError(null);
    setResult(null);
    setGroundingChunks([]);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      let response;
      if (searchType === 'web') {
        response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Research the following topic related to ${module.title}: ${query}`,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });
      } else {
        // Maps search
        let location = null;
        try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          location = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
        } catch (e) {
          console.warn("Could not get location", e);
        }

        const config: any = {
          tools: [{ googleMaps: {} }],
        };

        if (location) {
          config.toolConfig = {
            retrievalConfig: {
              latLng: location
            }
          };
        }

        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Find places related to: ${query}`,
          config: config,
        });
      }

      setResult(response.text || "No results found.");
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        setGroundingChunks(chunks);
      }

    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Failed to perform search.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
      <h3 className="text-xl font-bold mb-2">Research Assistant</h3>
      <p className="text-sm text-slate-500 mb-6">Use Google Search or Maps to find up-to-date information.</p>

      <div className="space-y-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSearchType('web')}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${searchType === 'web' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            <Search size={16} /> Web Search
          </button>
          <button
            onClick={() => setSearchType('maps')}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${searchType === 'maps' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            <MapPin size={16} /> Maps Search
          </button>
        </div>

        <div className="flex gap-2">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={searchType === 'web' ? "Ask a question about this module..." : "Find study spots, libraries, tutors..."}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            Search
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="prose prose-sm max-w-none bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <Markdown>{result}</Markdown>
            </div>
            
            {groundingChunks.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {groundingChunks.map((chunk, idx) => {
                    if (chunk.web?.uri) {
                      return (
                        <a key={idx} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-indigo-600 hover:bg-indigo-50 transition-colors">
                          {chunk.web.title || new URL(chunk.web.uri).hostname}
                        </a>
                      );
                    }
                    if (chunk.maps?.uri) {
                       return (
                        <a key={idx} href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors">
                          <MapPin size={12} /> {chunk.maps.title || 'View on Maps'}
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
