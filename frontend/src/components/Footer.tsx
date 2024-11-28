import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-blue-800 absolute bottom-0 left-0 right-0 text-white py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
                </p>
                <a
                    href="https://github.com/SmarthVerma/full-outpass-management"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm font-medium hover:text-gray-300 transition-colors"
                    aria-label="Visit GitHub Repository"
                >
                    <FaGithub className="text-lg" />
                    <span>View on GitHub</span>
                </a>
            </div>
        </footer>
    );
}