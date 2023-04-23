import React, { lazy } from "react";
const PhotoPage = lazy(() => import("./pages/PhotoPage"));

function App() {
  return (
   
    <div>
      <PhotoPage />
    </div>
  );
}

export default App;
