import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-graphite mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pulsePurple rounded-xl flex items-center justify-center shadow-neon">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-bold text-white font-satoshi">
                EventHub
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate platform for discovering and booking college events. 
              Connect, participate, and make memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Browse Events
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Club Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-steelGray hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-pulsePurple" />
                <span className="text-steelGray">support@eventhub.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-pulsePurple" />
                <span className="text-steelGray">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-pulsePurple" />
                <span className="text-steelGray">College Campus, City</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-black border border-graphite hover:shadow-neon rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-black border border-graphite hover:shadow-neon rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-black border border-graphite hover:shadow-neon rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-black border border-graphite hover:shadow-neon rounded-full flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-graphite mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-steelGray text-sm">
              © 2024 EventHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-steelGray">
              <span>Made with ❤️ for college students</span>
              <span>•</span>
              <span>Version 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
