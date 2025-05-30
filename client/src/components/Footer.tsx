import { Twitter, Instagram, Github, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center">
          <div className="text-center items-center">
            © 2025 Developed with{" "}
            <span className="animate-pulse text-white">❤️</span> by{" "}
            <a
              href="https://www.virendrapatil.xyz/"
              target="_blank"
              className="font-bold text-white/80 hover:text-white"
            >
              Virendra Patil
            </a>
          </div>
          <ul className="flex gap-4 mt-2 sm:mt-0">
            <li>
              <a href="https://github.com/virendrapatil24" target="_blank">
                <Github />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/virendrapatil_4/"
                target="_blank"
              >
                <Instagram />
              </a>
            </li>
            <li>
              <a href="https://x.com/virendrapatil24" target="_blank">
                <Twitter />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/virendrapatil24/"
                target="_blank"
              >
                <Linkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
