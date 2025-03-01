import { BrowserRouter, Route, Routes } from "react-router-dom";

import Form from "./components/register";
import Users from "./components/user";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Form />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
