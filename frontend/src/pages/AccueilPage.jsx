import React from "react";
import Layout from "../components/Layout/Layout";

function AccueilPage() {
  return (
    <Layout>
      <div className="w-[80vmin] h-[calc(100vh-4rem)] flex justify-center items-center flex-col">
        <div className="w-full flex-1/2 flex items-center justify-center">
          <img src="assets/image1.jpg" alt="img" />
        </div>
        <div className="w-full sm:w-auto flex flex-col items-center gap-2 flex-1/2">
          <h1 className="text-4xl lg:text-6xl font-semibold">E-Bank</h1>
          <h2 className="text-lg sm:text-xl font-medium">
            The best bank in Morocco
          </h2>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            corrupti repellendus et esse possimus in sapiente tempora
            dignissimos eos, eveniet maxime itaque quibusdam cupiditate
            consequatur assumenda repellat quidem vero reprehenderit.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default AccueilPage;
