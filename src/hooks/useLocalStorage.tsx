"use client";
import React, { useEffect, useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const res = localStorage.getItem(key);

      return res ? JSON.parse(res) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData] as const;
};

export default useLocalStorage;
