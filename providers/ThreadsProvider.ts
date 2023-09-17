"use client";

import { createContext, useCallback } from "react";

// const deleteThread = useCallback((thread) => {
//   thread.isDeleted = true;
// }, []);

export const ThreadsContext = createContext({
  deleteThread: () => {},
});
