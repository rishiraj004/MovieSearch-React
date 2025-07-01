import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin, Github, Heart } from 'lucide-react'

export function Footer() {
  return (
    <motion.footer
      className="bg-gray-950 border-t border-gray-800 text-white py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Creator Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">MovieSearch</h3>
            <p className="text-gray-400 text-sm">
              Created with <Heart className="w-4 h-4 text-red-400 inline mx-1" /> by{' '}
              <span className="text-purple-400 font-semibold">Rishi Raj</span>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            <motion.a
              href="https://www.instagram.com/rishi.raj04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://twitter.com/rishi_raj1808"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/rishi-raj-23631727a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://github.com/rishiraj004"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </motion.a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MovieSearch. All rights reserved.</p>
            <p className="mt-1">
              Powered by{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                The Movie Database (TMDb)
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
