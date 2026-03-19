import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ProviderProfile, ProviderRequirement, ProviderOnboardingState } from '../types';

// ── Default state ────────────────────────────────────────────────────────────
const DEFAULT_PROFILE: ProviderProfile = {
  photoUrl: null,
  bio: '',
  skillTags: [],
  professionalCerts: [],
  idVerified: false,
  idDocumentUrl: null,
};

const buildRequirements = (profile: ProviderProfile): ProviderRequirement[] => [
  {
    id: 'photo',
    label: 'Profile Photo',
    description: 'Upload a professional headshot or business logo',
    isComplete: !!profile.photoUrl,
    weight: 20,
  },
  {
    id: 'bio',
    label: 'Professional Bio',
    description: 'Write at least 80 characters describing your expertise',
    isComplete: profile.bio.trim().length >= 80,
    weight: 20,
  },
  {
    id: 'skills',
    label: 'Skill Tags',
    description: 'Add a minimum of 3 skill tags to your profile',
    isComplete: profile.skillTags.length >= 3,
    weight: 20,
  },
  {
    id: 'certs',
    label: 'Professional Certifications',
    description: 'Upload at least one professional certificate',
    isComplete: profile.professionalCerts.length >= 1,
    weight: 20,
  },
  {
    id: 'identity',
    label: 'Identity Verification',
    description: 'Upload a valid government-issued ID for verification',
    isComplete: profile.idVerified && !!profile.idDocumentUrl,
    weight: 20,
  },
];

const calcCompletion = (reqs: ProviderRequirement[]): number =>
  reqs.reduce((acc, r) => (r.isComplete ? acc + r.weight : acc), 0);

// ── Context ──────────────────────────────────────────────────────────────────
const ProviderContext = createContext<ProviderOnboardingState | null>(null);

export const ProviderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProviderProfile>(DEFAULT_PROFILE);

  const updateProfile = useCallback((partial: Partial<ProviderProfile>) => {
    setProfile(prev => ({ ...prev, ...partial }));
  }, []);

  const requirements = useMemo(() => buildRequirements(profile), [profile]);
  const completionPct = useMemo(() => calcCompletion(requirements), [requirements]);
  const canPostService = completionPct === 100;

  const value: ProviderOnboardingState = {
    profile,
    completionPct,
    requirements,
    canPostService,
    updateProfile,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProvider = (): ProviderOnboardingState => {
  const ctx = useContext(ProviderContext);
  if (!ctx) throw new Error('useProvider must be used inside ProviderContextProvider');
  return ctx;
};
