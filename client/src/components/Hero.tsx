const Hero = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24 bg-[linear-gradient(to_bottom,#000,#143d3b_40%,#3abab3_75%,#42e098_98%)]">
      <div className="container">
        <div className="flex justify-center">
          <a
            href="#"
            className="border border-green-300/30 px-2 py-1 rounded-lg"
          >
            <span className="bg-[linear-gradient(to_right,#82cfd6,#88b0dd)] text-transparent bg-clip-text animate-pulse">
              Version 1.0 coming soon!
            </span>
          </a>
        </div>
        <div className="flex justify-center mt-8">
          <h1 className="text-center text-6xl md:text-8xl lg:text-9xl font-bold">
            Your money
            <br />
            Your vibe
          </h1>
        </div>
        <div className="text-center text-xl mt-8 sm:mt-10 px-4 sm:max-w-[400px] mx-auto">
          <p>
            VibePay lets you log in and send money to anyone in just a few taps.
            <br />
            Fast. Secure. No fuss.
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-white/90 hover:bg-white text-black py-2 px-4 rounded-lg">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
