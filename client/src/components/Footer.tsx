import { Link } from "wouter";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-soft-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-baby-blue mb-4">
              Baby Sleep Whisperer
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Helping families achieve peaceful nights through gentle, evidence-based 
              sleep solutions. Every baby can learn to sleep well with the right approach and support.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-baby-blue rounded-full flex items-center justify-center hover:bg-soft-pink transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-baby-blue rounded-full flex items-center justify-center hover:bg-soft-pink transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-baby-blue transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-baby-blue transition-colors">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-baby-blue transition-colors">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-300 hover:text-baby-blue transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-baby-blue transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                (555) 123-4567
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                sarah@babysleepwhisperer.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕐</span>
                Mon-Fri, 9am-6pm EST
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Baby Sleep Whisperer. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
