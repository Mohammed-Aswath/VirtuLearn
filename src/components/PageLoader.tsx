import { LoadingSpinner } from './LoadingSpinner';

interface PageLoaderProps {
  text?: string;
}

export const PageLoader = ({ text = 'Loading...' }: PageLoaderProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] animate-fade-in">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};
