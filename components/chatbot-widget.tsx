'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, User, Bot, Minimize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: 'Hola! Soy tu asistente de WebDev Pro. Puedo ayudarte a encontrar el paquete perfecto para tu negocio, responder preguntas sobre nuestros servicios o agendar una reunion. Como puedo ayudarte hoy?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input?.trim() || isLoading) return;
    const userMessage = input?.trim();
    setInput('');
    setMessages(prev => [...(prev ?? []), { role: 'user', content: userMessage }]);
    setIsLoading(true);
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, conversationId, history: messages }),
      });
      if (!response?.body) throw new Error('No response body');
      const reader = response?.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      setMessages(prev => [...(prev ?? []), { role: 'assistant', content: '' }]);
      let partialRead = '';
      while (true) {
        const result = await reader?.read();
        if (result?.done) break;
        partialRead += decoder?.decode(result?.value, { stream: true });
        const lines = partialRead?.split('\n');
        partialRead = lines?.pop() || '';
        for (const line of (lines ?? [])) {
          if (line?.startsWith('data: ')) {
            const data = line?.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed?.conversationId) setConversationId(parsed?.conversationId);
              if (parsed?.content) {
                assistantMessage += parsed?.content;
                setMessages(prev => {
                  const newMessages = [...(prev ?? [])];
                  if (newMessages?.length > 0) {
                    newMessages[newMessages.length - 1] = { role: 'assistant', content: assistantMessage };
                  }
                  return newMessages;
                });
              }
            } catch (e) { /* skip */ }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...(prev ?? []), { role: 'assistant', content: 'Lo siento, hubo un error. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-4 md:right-6 w-[calc(100%-2rem)] md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
            <div className="gradient-bg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
                <div><h3 className="font-semibold text-white">Asistente WebDev</h3><p className="text-xs text-white/70">En linea</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5 text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages?.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message?.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message?.role === 'assistant' && <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>}
                  <div className={`max-w-[80%] p-3 rounded-2xl ${message?.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white text-gray-700 rounded-bl-md shadow-sm'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                  </div>
                  {message?.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-gray-600" /></div>}
                </div>
              ))}
              {isLoading && messages?.[messages?.length - 1]?.role === 'user' && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm"><Loader2 className="w-5 h-5 text-blue-600 animate-spin" /></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e?.target?.value ?? '')} onKeyPress={(e) => e?.key === 'Enter' && sendMessage()} placeholder="Escribe tu mensaje..." className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isLoading} />
                <button onClick={sendMessage} disabled={isLoading || !input?.trim()} className="px-4 py-3 gradient-bg text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"><Send className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-6 right-4 md:right-6 w-14 h-14 rounded-full gradient-bg text-white shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </>
  );
}