import { Navigate } from "react-router-dom";

import { useStateValue } from "../../store/reducer";

interface Props {
  redirectPath: string;
  children: JSX.Element;
}

const PrivateRoute = ({ redirectPath, children }: Props) => {
  const { state } = useStateValue();
  if (!state.username) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
