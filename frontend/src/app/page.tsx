'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Brain } from 'lucide-react';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/landing');
      }
    }
  }, [user, isLoading, router]);

  // Show loading state while determining where to redirect
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl inline-block mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading TraceonAI...</span>
        </div>
      </div>
    </div>
  );
}
