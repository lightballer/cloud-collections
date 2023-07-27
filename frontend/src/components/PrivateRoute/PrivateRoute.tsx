import { Navigate } from "react-router-dom";

import { username } from "store/username";
import { observer } from "mobx-react-lite";

interface Props {
  redirectPath: string;
  children: JSX.Element;
}

const PrivateRoute = observer(({ redirectPath, children }: Props) => {
  if (!username.username) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
});

export default PrivateRoute;
