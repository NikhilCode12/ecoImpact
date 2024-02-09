import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero relative h-full">
      <video
        loop
        autoPlay
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-[-2]"
      >
        <source src={"/videos/before.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-10 rounded-lg bg-black opacity-80 z-[-1]"></div>
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-6xl font-bold text-white drop-shadow-[2px_2px_4px_black]">
          Track your Environmental <span className="text-[yellow]">Impact</span>
        </span>
        <p className="mt-4 text-[1.25rem] font-semibold text-white">
          Bring an impactful change for a{" "}
          <span className="text-green-300">greener</span> tomorrow.
        </p>
        <div className="flex items-center gap-8 my-12 filter:brightness(1.2)">
          <a
            href="https://github.com/NikhilCode12/ecoImpact"
            className="styled_btn"
            target="_blank"
          >
            Github Repo
          </a>
          <Link href="/register" className="styled_btn">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
