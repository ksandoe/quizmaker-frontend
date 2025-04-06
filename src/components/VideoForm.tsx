import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createVideo, getVideo } from '../utils/supabase';
import type { NewVideo } from '../utils/supabase';

export default function VideoForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (videoId) {
      intervalId = setInterval(async () => {
        try {
          const video = await getVideo(videoId);
          if (video.status === 'error') {
            setError(video.error_message || 'Failed to process video');
            setLoading(false);
            clearInterval(intervalId);
          } else if (video.status === 'completed') {
            navigate(`/video/${video.video_id}/segments`);
            clearInterval(intervalId);
          } else {
            setProcessingStatus(getStatusMessage(video.status));
          }
        } catch (err) {
          setError('Failed to check video status');
          setLoading(false);
          clearInterval(intervalId);
        }
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [videoId, navigate]);

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'downloading':
        return 'Downloading video...';
      case 'transcribing':
        return 'Transcribing video...';
      case 'segmenting':
        return 'Creating segments...';
      case 'generating_questions':
        return 'Generating questions...';
      default:
        return 'Processing...';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a video');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setProcessingStatus('Starting video processing...');

      // Extract video title from URL
      const videoId = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1];
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const videoData: NewVideo = {
        title: `Video ${videoId}`, // Temporary title, will be updated by server
        url,
        creator_id: user.id,
        status: 'pending'
      };

      const video = await createVideo(videoData);
      if (!video) {
        throw new Error('Failed to create video');
      }

      setVideoId(video.video_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create video');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-300">
                Video URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={loading}
                className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500 sm:text-sm disabled:opacity-50"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50"
            >
              {loading ? 'Creating Quiz...' : 'Create Quiz'}
            </button>
          </form>
          {processingStatus && (
            <div className="mt-4 p-3 bg-blue-900 text-blue-200 rounded-lg">
              {processingStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
