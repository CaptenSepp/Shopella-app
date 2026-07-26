import type { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main id="main-content" className="flex-1" tabIndex={-1}>
      {children}
    </main>
  );
};

export default Main;
