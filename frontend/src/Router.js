import { Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import MyFiles from "./components/MyFiles";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/myfiles"
        element={
          <PrivateRoute redirectPath={"/login"}>
            <MyFiles />
          </PrivateRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <PrivateRoute redirectPath={"/login"}>
            <Upload />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;
