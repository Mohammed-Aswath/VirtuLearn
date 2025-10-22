/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Provide app-wide config placeholders (Arcware, S3) via context
 * BACKEND CONTRACT: Config values will be sourced from server/env in production
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { createContext, useContext } from 'react';

const AppConfigContext = createContext(null);

export const AppConfigProvider = ({ children }) => {
  const value = {
    arcwareBaseUrl: 'https://arcware.example.com',
    s3: {
      communityBasePath: 'virtulearn/community',
      experimentsBasePath: 'virtulearn/experiments',
      reportsBasePath: 'virtulearn/reports',
    },
  };
  return (
    <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const ctx = useContext(AppConfigContext);
  if (!ctx) throw new Error('useAppConfig must be used within AppConfigProvider');
  return ctx;
};


