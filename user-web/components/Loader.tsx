import React from "react";

type Props = {
  loading: boolean;
};

const Loader = ({ loading }: Props) => {
  return (
    loading && (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
        <div className="lds-roller text-primary">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  );
};

export default Loader;
