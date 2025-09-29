import { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const refs = {
    hero: useRef(null),
    services: useRef(null),
    contact: useRef(null),
    faq: useRef(null),
  };

  const scrollToSection = (sectionKey) => {
    refs[sectionKey]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollContext.Provider value={{ refs, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within ScrollProvider');
  }
  return context;
};