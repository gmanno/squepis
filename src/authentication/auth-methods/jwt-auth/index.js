import { useEffect, useState } from "react";
import { httpClient } from "../../../util/Api";

import { useHistory } from "react-router-dom";
export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const fetchStart = () => {
    setLoading(true);
    setError("");
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError("");
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("login", user)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          localStorage.setItem("token", data.token.access_token);
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/register", user)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          localStorage.setItem("token", data.token.access_token);
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    fetchStart();
    httpClient
      .post("logout")
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          setAuthUser(false);
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .post("me")
      .then(({ data }) => {
        if (data.user) {
          fetchSuccess();
          setAuthUser(data.user);
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common["Authorization"] = "";
        fetchError(error.message);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    httpClient.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          httpClient.defaults.headers.common["Authorization"] = "";
          history.push("/signin");
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    httpClient
      .post("me")
      .then(({ data }) => {
        if (data.user) {
          setAuthUser(data.user);
        }
        setLoadingUser(false);
      })
      .catch(function (data) {
        localStorage.removeItem("token");
        httpClient.defaults.headers.common["Authorization"] = "";
        setLoadingUser(false);
      });
  }, [history]);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
