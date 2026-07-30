import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main id="main-content" className="flex-1" tabIndex={-1}> {/* route outlet wrapper */}
      <Outlet /> {/* nested route content */}
    </main>
  );
};

export default Main;
