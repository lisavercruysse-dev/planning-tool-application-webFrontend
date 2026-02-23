import { Navigate, Outlet, useLocation } from "react-router";

export default function PrivateRoute({ role = "" }) {
  //const { ready, isAuthed, hasRole } = useAuth();
  (ready, (isAuthed = (true, true)));
  // verander wanneer useAuth kan gebruikt worden

  const { pathname } = useLocation();

  if (!ready) {
    return (
      <div>
        <h1>Loading...</h1>
        <p>
          Please wait while we are checking your credentials and loading the
          application.
        </p>
      </div>
    );
  }

  if (isAuthed /*&& hasRole(role)*/) {
    return <Outlet />;
  }

  return <Navigate replace to={`/login?redirect=${pathname}`} />;
}
