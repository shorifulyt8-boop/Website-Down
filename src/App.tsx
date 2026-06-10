import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Mail, 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  AlertTriangle, 
  CircleDollarSign, 
  Clock, 
  Settings, 
  User, 
  X,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Default developer details if not changed by the customizable panel
interface DevConfig {
  devName: string;
  devEmail: string;
  telegramHandle: string;
  outstandingAmount: string;
  currency: string;
  invoiceNumber: string;
  customNoteBengali: string;
  customNoteEnglish: string;
}

export default function App() {
  // Config state
  const [config, setConfig] = useState<DevConfig>({
    devName: "Shoriful Islam",
    devEmail: "shoriful.dev.official@gmail.com",
    telegramHandle: "@shoriful_islam",
    outstandingAmount: "350",
    currency: "USD",
    invoiceNumber: "INV-2026-6091",
    customNoteBengali: "বকেয়া পেমেন্ট পরিশোধ না করা পর্যন্ত সাইটের সকল অ্যাক্সেস সাময়িকভাবে স্থগিত করা হয়েছে।",
    customNoteEnglish: "Access to this website's backend services and front-end user experience is currently suspended due to an unresolved development invoice."
  });

  // UI state
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  
  // Custom contact form states
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Quick Copy Helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    triggerNotification(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const triggerNotification = (text: string) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Dry Run Refresh System Simulator
  const handleRefreshCheck = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshMessage("Checking server handshake...");
    
    setTimeout(() => {
      setRefreshMessage("Re-evaluating pending outstanding ledger transactions...");
    }, 1500);

    setTimeout(() => {
      setRefreshMessage("Error: Token verification failed. Unpaid dev account lock active.");
    }, 3000);

    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshMessage("");
      triggerNotification("System Lock Active: Action required from administrator.");
    }, 4500);
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) {
      triggerNotification("Please fill in all the message fields.");
      return;
    }
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      setFormSuccess(true);
      setSenderName("");
      setSenderEmail("");
      setSenderMessage("");
      triggerNotification("Notification queued & sent to Developer's alert logs!");
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1500);
  };

  // Load custom configuration from localStorage if exists
  useEffect(() => {
    const savedConfig = localStorage.getItem("dev_suspended_config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (err) {
        console.error("Failed to parse saved config.");
      }
    }
  }, []);

  const handleSaveConfig = (newConfig: DevConfig) => {
    setConfig(newConfig);
    localStorage.setItem("dev_suspended_config", JSON.stringify(newConfig));
    setIsSettingsOpen(false);
    triggerNotification("Template configuration updated successfully!");
  };

  return (
    <div className="min-h-screen dynamic-bg flex flex-col items-center justify-between p-4 md:p-8 relative selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* Background Decorative Mesh Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute -bottom-40 -right-4 w-96 h-96 bg-amber-950/10 rounded-full blur-[120px]" />
        
        {/* Fine background grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Floating Status Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 border border-red-500/30 text-rose-200 shadow-2xl shadow-rose-950/40 font-medium text-sm backdrop-blur-md"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
            <span>{notificationText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Line */}
      <header className="w-full max-w-5xl flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-500 shadow-lg shadow-red-950/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span>Security Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div className="text-sm font-bold text-slate-200 tracking-tight">System Guardian</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-red-950/50 border border-red-500/20 text-rose-400 font-semibold uppercase tracking-wider backdrop-blur-sm">
            STATUS: SUSPENDED
          </span>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="w-full max-w-5xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-8">
        
        {/* Left Side: Statement Box (Notice of deactivation) */}
        <section className="lg:col-span-7 flex flex-col gap-6 text-left" id="main-notice-section">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs w-fit"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>ERROR CODE: 402 PAYMENT REQUIRED</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {/* Bilingual English Headline */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Website Is Down
            </h1>
            
            {/* Bilingual Bengali Headline */}
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-rose-200/95 leading-normal font-sans">
              এই ওয়েবসাইটটি বন্ধ রয়েছে
            </h2>
          </motion.div>

          {/* Core Stated Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden"
          >
            {/* Gloss effect overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl" />
            
            <p className="text-lg md:text-xl font-semibold text-rose-200 leading-relaxed mb-4">
              Due to Unpaid Developer Payment, please Contact Developer to resolve the issue and restore site access immediately.
            </p>
            <div className="border-t border-slate-800/80 my-4" />
            <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed">
              বকেয়া পেমেন্ট পরিশোধ না করার কারণে সাময়িকভাবে এই ওয়েবসাইটের সমস্ত বাহ্যিক ও অভ্যন্তরীণ ফিচার স্থগিত করা হয়েছে। অবিলম্বে অ্যাক্সেস পুনরুদ্ধার ও সমস্যা সমাধানের ক্ষেত্রে ডেভেলপারের সাথে যোগাযোগ করার নির্দেশ দেওয়া হলো।
            </p>
          </motion.div>

          {/* Outstanding Invoice Ledger Overview (Increases legitimacy and authoritative aesthetic) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl">
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>LEDGER STATE</span>
              </div>
              <div className="text-sm font-bold text-red-400 uppercase tracking-wider">OVERDUE LOCK</div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl">
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1 font-sans">
                <CircleDollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>PENDING SUM</span>
              </div>
              <div className="text-lg font-bold text-amber-400 font-mono">
                {config.outstandingAmount} <span className="text-xs">{config.currency}</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl col-span-2 sm:col-span-1">
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1">
                <span>INVOICE PIN</span>
              </div>
              <div className="text-sm font-semibold text-slate-300 font-mono truncate">{config.invoiceNumber}</div>
            </div>
          </motion.div>

          {/* Refresh simulator trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2"
          >
            <button
              onClick={handleRefreshCheck}
              disabled={isRefreshing}
              id="retest-button"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 active:bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-sm font-semibold select-none disabled:opacity-75 disabled:cursor-not-allowed group"
            >
              <RefreshCw className={`w-4 h-4 text-rose-400 group-hover:rotate-180 transition-transform duration-700 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isRefreshing ? 'Revisiting DNS registers...' : 'Re-verify Payment Status'}</span>
            </button>
            
            <AnimatePresence>
              {refreshMessage && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-mono text-rose-300/80 italic py-2 px-3 bg-red-950/20 border border-red-500/10 rounded-lg flex items-center gap-1.5"
                >
                  <span className="w-1 rounded-full aspect-square bg-amber-400 animate-ping inline-block" />
                  <span>{refreshMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Right Side: Interactive Developer Contact Card & secure messaging panel */}
        <section className="lg:col-span-5 flex flex-col gap-6" id="contact-side-section">
          {/* Card Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/90 border border-slate-800 shadow-2xl shadow-rose-950/25 p-6 rounded-3xl relative overflow-hidden backdrop-blur-md"
          >
            {/* Subtle red outline glow */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 opacity-65" />
            
            <div className="mb-6">
              <h3 className="text-sm font-mono text-rose-400 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Authorized Professional</span>
              </h3>
              <h4 className="text-xl font-bold text-white tracking-tight leading-tight flex items-center gap-2">
                <span>{config.devName}</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/15">Lead Dev</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">Responsible for initial systems engineering & source deployment</p>
            </div>

            {/* Quick Copyable Addresses Container */}
            <div className="space-y-3 mb-6">
              {/* E-Mail Address */}
              <div className="group bg-slate-950/70 hover:bg-slate-950/90 border border-slate-800/80 p-3 rounded-xl transition-all duration-300 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden text-left">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Developer Email</div>
                    <div className="text-sm text-slate-300 font-semibold truncate select-all">{config.devEmail}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <a 
                    href={`mailto:${config.devEmail}?subject=Regarding website suspension - Invoice payment resolution`}
                    title="Send instant mail"
                    className="p-1 px-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition text-xs flex items-center gap-1"
                  >
                    <span>Mail</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => handleCopy(config.devEmail, "Email Address")}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                    title="Copy to clipboard"
                  >
                    {copiedText === "Email Address" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Telegram Channel */}
              <div className="group bg-slate-950/70 hover:bg-slate-950/90 border border-slate-800/80 p-3 rounded-xl transition-all duration-300 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden text-left">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Direct Wire</div>
                    <div className="text-sm text-slate-300 font-semibold truncate">{config.telegramHandle}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCopy(config.telegramHandle, "Telegram Username")}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                    title="Copy Handle"
                  >
                    {copiedText === "Telegram Username" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Support Message Client Gateway Mock */}
            <div className="border-t border-slate-800/80 pt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 text-left font-semibold">
                Instant System Notice Dispatch
              </h4>
              
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name (আপনার নাম)"
                    id="sender-name-input"
                    className="w-full bg-slate-950/90 border border-slate-800 hover:border-slate-700 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 px-3 py-2 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 transition"
                  />
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="Your Email (ইমেইল)"
                    id="sender-email-input"
                    className="w-full bg-slate-950/90 border border-slate-800 hover:border-slate-700 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 px-3 py-2 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 transition"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Enter message regarding settlement status..."
                  id="sender-message-textarea"
                  className="w-full bg-slate-950/90 border border-slate-800 hover:border-slate-700 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 px-3 py-2 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 transition resize-none"
                />

                <button
                  type="submit"
                  disabled={isSending || formSuccess}
                  id="submit-notice-button"
                  className="w-full hover:shadow-lg shadow-rose-950/10 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Transmitting Notice...</span>
                    </>
                  ) : formSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white animate-bounce" />
                      <span>Message Dispatched Success!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-red-100" />
                      <span>Dispatch Resolution Alert</span>
                    </>
                  )}
                </button>
              </form>

              {formSuccess && (
                <p className="text-[11px] text-emerald-400 font-sans tracking-wide mt-2 leading-relaxed text-left animate-fade-in">
                  ✓ Your message has been encrypted and saved to local developer queue. It will alert the system owner. Thank you.
                </p>
              )}
            </div>
          </motion.div>
        </section>

      </main>

      {/* Footer block and invisible customization area for developers */}
      <footer className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center z-10 border-t border-slate-900 pt-6 gap-4 text-slate-500 text-xs">
        <div className="flex items-center gap-1.5 font-mono">
          <span>Shield Guardian Framework v4.2.1-prod</span>
        </div>
        
        {/* Interactive config settings button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            id="configure-panel-button"
            className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Developer Panel Config</span>
          </button>
          <span>•</span>
          <span>© {new Date().getFullYear()} Security Ledger System</span>
        </div>
      </footer>

      {/* Developer Customization Modal Backdrop */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-2.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-xs font-semibold">
                    SETUP
                  </div>
                  <h3 className="font-bold text-white tracking-tight">Configure Suspend Message</h3>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1 px-2 rounded-lg hover:bg-slate-850 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Warning to developers utilizing this template */}
              <div className="bg-slate-950 border border-slate-850/50 p-3 rounded-xl mb-4 text-xs text-rose-300 flex items-start gap-2.5 leading-relaxed text-left">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  Developers can custom-tune the details. Values persist locally in the client browser's <code className="text-white font-mono bg-slate-800/60 p-0.5 rounded px-1">localStorage</code> for deployment flexibility.
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Developer Name</label>
                    <input
                      type="text"
                      id="config-devName"
                      value={config.devName}
                      onChange={(e) => setConfig({ ...config, devName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Invoice Pending Sum</label>
                    <input
                      type="text"
                      id="config-outstandingAmount"
                      value={config.outstandingAmount}
                      onChange={(e) => setConfig({ ...config, outstandingAmount: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Developer E-Mail</label>
                    <input
                      type="email"
                      id="config-devEmail"
                      value={config.devEmail}
                      onChange={(e) => setConfig({ ...config, devEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Telegram User Link</label>
                    <input
                      type="text"
                      id="config-telegramHandle"
                      value={config.telegramHandle}
                      onChange={(e) => setConfig({ ...config, telegramHandle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Currency Code</label>
                    <input
                      type="text"
                      id="config-currency"
                      value={config.currency}
                      onChange={(e) => setConfig({ ...config, currency: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Invoice Number Prefix</label>
                    <input
                      type="text"
                      id="config-invoiceNumber"
                      value={config.invoiceNumber}
                      onChange={(e) => setConfig({ ...config, invoiceNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Save Controls */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => {
                    const defaultConfig: DevConfig = {
                      devName: "Shoriful Islam",
                      devEmail: "shoriful.dev.official@gmail.com",
                      telegramHandle: "@shoriful_islam",
                      outstandingAmount: "350",
                      currency: "USD",
                      invoiceNumber: "INV-2026-6091",
                      customNoteBengali: "বকেয়া পেমেন্ট পরিশোধ না করা পর্যন্ত সাইটের সকল অ্যাক্সেস সাময়িকভাবে স্থগিত করা হয়েছে।",
                      customNoteEnglish: "Access to this website's backend services and front-end user experience is currently suspended due to an unresolved development invoice."
                    };
                    handleSaveConfig(defaultConfig);
                  }}
                  id="reset-config-button"
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-850 rounded-lg transition"
                >
                  Reset Default
                </button>
                <button
                  onClick={() => handleSaveConfig(config)}
                  id="save-config-button"
                  className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply Settings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
