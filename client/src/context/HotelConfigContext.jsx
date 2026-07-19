import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "../api/settings";
import staticDefaults from "../config/hotelConfig";

const HotelConfigContext = createContext(null);

function deepMerge(base, override) {
  if (!override) return base;
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const value = override[key];
    if (value && typeof value === "object" && !Array.isArray(value) && base[key]) {
      result[key] = deepMerge(base[key], value);
    } else if (value !== undefined && value !== null) {
      result[key] = value;
    }
  }
  return result;
}

export function HotelConfigProvider({ children }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    retry: 1,
  });

  const config = useMemo(() => deepMerge(staticDefaults, data), [data]);

  return (
    <HotelConfigContext.Provider value={{ config, isLoading, isError }}>
      {children}
    </HotelConfigContext.Provider>
  );
}

export function useHotelConfig() {
  const ctx = useContext(HotelConfigContext);
  if (!ctx) throw new Error("useHotelConfig must be used within HotelConfigProvider");
  return ctx;
}
