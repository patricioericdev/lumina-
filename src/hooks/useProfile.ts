"use client";

import { useState, useEffect, useCallback } from "react";

export const PROFILE_STORAGE_KEY = "lumina_profile_v1";
export const PROFILE_UPDATED_EVENT = "lumina_profile_updated";

export interface StudentProfile {
  name: string;
  target: string;
}

export const DEFAULT_PROFILE: StudentProfile = {
  name: "Estudante",
  target: "ENEM 2027 — Medicina / Alta Performance",
};

function readStoredProfile(): StudentProfile {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE;
  }

  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;

    const parsed = JSON.parse(raw) as Partial<StudentProfile>;
    return {
      name:
        typeof parsed.name === "string" && parsed.name.trim()
          ? parsed.name.trim()
          : DEFAULT_PROFILE.name,
      target:
        typeof parsed.target === "string" && parsed.target.trim()
          ? parsed.target.trim()
          : DEFAULT_PROFILE.target,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  const syncFromStorage = useCallback(() => {
    setProfile(readStoredProfile());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    syncFromStorage();

    const handleCustomUpdate = () => {
      syncFromStorage();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PROFILE_STORAGE_KEY || e.key === null) {
        syncFromStorage();
      }
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, handleCustomUpdate);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleCustomUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [syncFromStorage]);

  const updateProfile = useCallback((name: string, target: string) => {
    const nextProfile: StudentProfile = {
      name: name.trim() || DEFAULT_PROFILE.name,
      target: target.trim() || DEFAULT_PROFILE.target,
    };

    setProfile(nextProfile);

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          PROFILE_STORAGE_KEY,
          JSON.stringify(nextProfile)
        );
        window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
      } catch {
        // Ignore storage quota or private mode errors
      }
    }

    return nextProfile;
  }, []);

  const avatarInitial = profile.name.trim().charAt(0).toUpperCase() || "E";

  return {
    name: profile.name,
    target: profile.target,
    avatarInitial,
    updateProfile,
    isLoaded,
  };
}
