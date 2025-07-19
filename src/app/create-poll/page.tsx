'use client';
import { useState } from 'react';

export default function CreatePollPage() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (value: string, index: number) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length < 10) setOptions([...options, '']);
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
      options: options.filter((opt) => opt.trim() !== ''),
    };

    const res = await fetch('/api/create-poll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      console.error(`Poll created! Share this code: ${data.code}`);
    } else {
      console.error(data);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h1 className="text-2xl font-bold mb-4">Create a Poll</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
}
