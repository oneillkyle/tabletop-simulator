import { useState } from 'react';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const API_HOST = import.meta.env.VITE_API_HOST || '';

interface Prediction {
    answer: string;
    context: string;
    question: string;
}

export default function AIQueryPanel() {
    const [question, setQuestion] = useState('');
    const [history, setHistory] = useState<Prediction[]>([]);
    const [result, setResult] = useState<Prediction | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showFullContext, setShowFullContext] = useState(false);
    const [showErrorDetails, setShowErrorDetails] = useState(false);

    const handleSubmit = async () => {
        if (!question.trim()) return;
        setLoading(true);
        setError(null);
        setResult(null);
        setShowFullContext(false);
        try {
            const res = await fetch(`${API_HOST}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`HTTP ${res.status}: ${text}`);
            }
            const data: Prediction = await res.json();
            setResult(data);
            setHistory([data, ...history]);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    // get first two lines of context
    const preview = result?.context.split('\n').slice(0, 2).join('\n');

    return (
        <div className='p-4 bg-gray-800 rounded-lg shadow-lg max-w-xl mx-auto'>
            <h2 className='text-xl font-semibold mb-2 text-white'>AI Q&A</h2>

            <textarea
                className='w-full p-2 mb-2 rounded border border-gray-600 bg-gray-900 text-white'
                rows={3}
                placeholder='Type your question…'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className='flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded text-white mb-4'>
                {loading ? (
                    <Loader2 className='animate-spin h-5 w-5' />
                ) : (
                    'Ask AI'
                )}
            </button>

            {error && (
                <div className='mb-2'>
                    <button
                        onClick={() => setShowErrorDetails(!showErrorDetails)}
                        className='text-red-500 underline'>
                        {showErrorDetails ? 'Hide' : 'Show'} error details
                    </button>
                    {showErrorDetails && (
                        <pre className='bg-gray-900 p-2 rounded text-red-400 whitespace-pre-wrap'>
                            {error}
                        </pre>
                    )}
                </div>
            )}

            {result && (
                <div className='space-y-4'>
                    <div>
                        <h3 className='font-medium text-lg text-white'>
                            Answer
                        </h3>
                        <p className='bg-gray-700 p-3 rounded text-white'>
                            {result.answer}
                        </p>
                    </div>
                    <div>
                        <h3 className='font-medium text-lg text-white flex items-center justify-between'>
                            Context
                            <button
                                onClick={() =>
                                    setShowFullContext(!showFullContext)
                                }>
                                {showFullContext ? (
                                    <ChevronUp />
                                ) : (
                                    <ChevronDown />
                                )}
                            </button>
                        </h3>
                        <div
                            className='bg-gray-700 p-3 rounded text-gray-200 whitespace-pre-wrap max-h-24 overflow-hidden'
                            style={
                                showFullContext ? { maxHeight: 'none' } : {}
                            }>
                            {showFullContext ? result.context : preview}
                        </div>
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <div className='mt-6'>
                    <h3 className='text-white font-medium mb-2'>History</h3>
                    <ul className='space-y-2 max-h-40 overflow-auto'>
                        {history.map((h, i) => (
                            <li key={i} className='bg-gray-700 p-2 rounded'>
                                <p className='text-white italic text-sm'>
                                    Q:{' '}
                                    {
                                        h.question /* you could store question as well if desired */
                                    }
                                </p>
                                <p className='text-gray-200'>A: {h.answer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
