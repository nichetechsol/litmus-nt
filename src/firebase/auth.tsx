
import { Outlet } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";
import { Fragment, useEffect } from "react";

const Auth = () => {
    useEffect(() => {
		import("preline");

	}, []);
  return (
    <Fragment>
            <Provider store={store}>
              <Outlet/>      
            </Provider>
    </Fragment>
  );
};

export default Auth;
