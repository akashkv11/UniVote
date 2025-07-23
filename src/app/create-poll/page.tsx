"use client";
import { useRef, useState } from "react";
import CopyToClipboard from "../components/CopyToClipboard";

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
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h1 className="text-2xl font-bold mb-4">Create a Poll</h1>
      <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
        <div>
          <label className="block font-medium mb-1">Question (optional)</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="What's your question?"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e.target.value, index)}
                className="flex-1 p-2 border rounded"
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="text-blue-600 mt-2"
          >
            + Add Option
          </button>
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            style={{ cursor: "pointer" }}
            disabled={
              pollCode !== null ||
              options.length < 2 ||
              options.some((opt) => opt.trim() === "")
            }
          >
            {pollCode ? "Poll Created" : "Create Poll"}
          </button>
          {pollCode ? (
            <button
              type="reset"
              className="bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white"
              style={{ cursor: "pointer" }}
              onClick={handleClearForm}
            >
              Create Another Poll
            </button>
          ) : null}
        </div>
      </form>
      <div className=" my-4 w-full flex justify-center">
        {pollCode ? (
          <CopyToClipboard text={`Your poll code: ${pollCode}`} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
