import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
