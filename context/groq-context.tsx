import Groq from "groq-sdk";
import React, { createContext, useContext, useState, ReactNode } from "react";

type GroqContextType = {
  groq: Groq;
};

const GroqContext = createContext<GroqContextType | null>(null);

export function GroqProvider({
  children,
  apiKey,
}: {
  children: ReactNode;
  apiKey: string;
}) {
  const [groq] = useState(
    new Groq({
      apiKey,
    })
  );

  return (
    <GroqContext.Provider value={{ groq }}>{children}</GroqContext.Provider>
  );
}

export function useGroqContext() {
  const context = useContext(GroqContext);

  if (!context) {
    throw new Error("useGroqContext must be used within a GroqProvider");
  }

  return context.groq;
}
