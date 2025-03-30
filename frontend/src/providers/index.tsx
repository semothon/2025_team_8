"use client";

import React from "react";

import GoogleOauthProvider from "./GoogleOauthProvider";
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <ReactQueryProvider>
      <GoogleOauthProvider>
        {children}
      </GoogleOauthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
