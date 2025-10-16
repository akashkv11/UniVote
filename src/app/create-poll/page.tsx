"use client";
import { useRef, useState } from "react";
import CopyToClipboard from "../../components/shared/CopyToClipboard";
import Link from "next/link";
// Header/Footer provided by layout

export default function CreatePollPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollCode, setPollCode] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleClearForm = () => {
    setQuestion("");
    setOptions(["", ""]);
    setPollCode(null);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleOptionChange = (value: string, index: number) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length < 10) setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const updated = [...options];
      updated.splice(index, 1);
      setOptions(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      question,
      options: options.filter((opt) => opt.trim() !== ""),
    };

    const res = await fetch("/api/create-poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Poll created! Share this code", data.pollCode);
      setPollCode(data.pollCode);
    } else {
      console.error(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

  {/* Header provided by layout; showNav handled via CSS/route or per-page header controls if needed */}

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!pollCode ? (
          <>
            {/* Title Section */}
            <div className="text-center mb-12">
              {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div> */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Create Your Poll
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Design a custom poll in seconds and share it with your audience
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="p-8 md:p-12 space-y-8">
                  {/* Question Input */}
                  <div className="space-y-3">
                    <label htmlFor="question" className="block text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Your Question
                      <span className="ml-2 text-xs font-normal text-gray-500 normal-case tracking-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        id="question"
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50/50"
                        placeholder="e.g., What's your favorite programming language?"
                      />
                    </div>
                  </div>

                  {/* Options Section */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Answer Options
                    </label>
                    <div className="space-y-3">
                      {options.map((option, index) => (
                        <div key={index} className="group relative">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md">
                                {String.fromCharCode(65 + index)}
                              </div>
                            </div>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(e.target.value, index)}
                              className="flex-1 px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50/50"
                              placeholder={`Option ${index + 1}`}
                              required
                            />
                            {options.length > 2 && (
                              <button
                                type="button"
                                onClick={() => removeOption(index)}
                                className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {options.length < 10 && (
                      <button
                        type="button"
                        onClick={addOption}
                        className="inline-flex items-center px-5 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Another Option
                      </button>
                    )}
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {options.length} of 10 options added
                    </p>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="bg-gray-50/80 backdrop-blur-sm px-8 md:px-12 py-6 border-t border-gray-200/50">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold py-4 px-8 rounded-2xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:-translate-y-0.5 active:translate-y-0"
                    disabled={
                      pollCode !== null ||
                      options.length < 2 ||
                      options.some((opt) => opt.trim() === "")
                    }
                  >
                    {pollCode ? "✓ Poll Created" : "Create Poll"}
                  </button>
                </div>
              </form>
            </div>

            {/* Tips Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Pro Tips</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Keep questions clear and concise</li>
                    <li>• Ensure options are mutually exclusive</li>
                    <li>• Add 2-10 options for best results</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Poll Created!
              </h2>
              <p className="text-lg text-gray-600">
                Your poll is ready to share with the world
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Poll Code Display */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center">
                <p className="text-indigo-100 text-sm font-semibold uppercase tracking-wider mb-3">
                  Your Poll Code
                </p>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6 mb-4 border border-white/30">
                  <p className="text-5xl font-bold text-white tracking-wider font-mono">
                    {pollCode}
                  </p>
                </div>
                <div className="flex justify-center">
                  <CopyToClipboard text={pollCode} />
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 space-y-4">
                <Link 
                  href={`/poll/${pollCode}`}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold py-4 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Your Poll
                </Link>

                <Link 
                  href={`/send-otp/${pollCode}`}
                  className="flex items-center justify-center w-full bg-white text-gray-700 text-lg font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Claim Ownership
                </Link>

                <button
                  onClick={handleClearForm}
                  className="w-full text-gray-600 text-base font-medium py-3 px-6 hover:text-gray-900 transition-colors"
                >
                  Create Another Poll
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  {/* Footer provided by layout */}
    </div>
  );
}