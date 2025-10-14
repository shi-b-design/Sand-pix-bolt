import { useState } from 'react';
import { X, Download, Copy, MessageSquare, CheckCircle } from 'lucide-react';
import { useSwipeStore } from '../store/useSwipeStore';
import toast from 'react-hot-toast';

export default function FullPagePreview() {
  const [copied, setCopied] = useState(false);
  const { fullPageCode, brandName, setCurrentPhase } = useSwipeStore();

  const handleDownload = () => {
    if (!fullPageCode) return;

    const blob = new Blob([fullPageCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.toLowerCase().replace(/\s+/g, '-')}-landing-page.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Landing page downloaded!');
  };

  const handleCopyToClipboard = async () => {
    if (!fullPageCode) return;

    try {
      await navigator.clipboard.writeText(fullPageCode);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleBackToRefinement = () => {
    setCurrentPhase('chat');
  };

  const handleClose = () => {
    if (confirm('Are you sure you want to close? You can still download your page.')) {
      setCurrentPhase('heroPreview');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-white">Full Landing Page</h2>
          <span className="text-sm text-gray-400">{brandName}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBackToRefinement}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            Back to Refinement
          </button>
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Code
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
          >
            <Download className="w-4 h-4" />
            Download HTML
          </button>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-700 rounded transition"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={fullPageCode || ''}
          className="w-full h-full bg-white"
          title="Full Page Preview"
        />
      </div>

      <div className="bg-gray-800 border-t border-gray-700 px-6 py-2 text-center">
        <p className="text-sm text-gray-400">
          Scroll within the preview to see your complete landing page
        </p>
      </div>
    </div>
  );
}
