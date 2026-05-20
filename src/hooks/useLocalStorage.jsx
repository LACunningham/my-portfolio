import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Buscamos si ya existe la clave en localStorage, si no, usamos el valor inicial
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error leyendo localStorage", error);
      return initialValue;
    }
  });

  // Cada vez que 'storedValue' cambie, lo guardamos en localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error guardando en localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};