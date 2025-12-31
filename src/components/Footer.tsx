const Footer = () => {
  return (
    <footer className="border-t border-vermeer-softBlue/30 bg-vermeer-white py-6 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-vermeer-softBlue">
          <span>© {new Date().getFullYear()} EchoMap by</span>
          <a
            href="https://www.linkedin.com/in/rawat-priyanshu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-vermeer-deepBlue hover:text-vermeer-ochre transition-colors font-medium"
          >
            Priyanshu Rawat.
          </a>
          <span> All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

