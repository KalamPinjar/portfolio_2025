"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { RippleButton } from "../ripple-button";
const socialLinks = [
  { icon: Github, href: "https://github.com/KalamPinjar", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/kalam-pinjar-100178207/",
    label: "LinkedIn",
  },
];

export function ContactSection() {
  return (
    <section className="px-4 py-18">
      <div className="flex flex-col items-center mx-auto w-full max-w-4xl text-center">
        <motion.h2
          className="mb-4 font-bold text-4xl md:text-6xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-black dark:text-white">Let&apos;s Connect</span>
        </motion.h2>

        <motion.p
          className="mb-4 text-gray-400 text-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to bring your ideas to life? Let&apos;s create something amazing
          together.
        </motion.p>

        <motion.div
          className="flex justify-center gap-6 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="bg-gray-800/50 p-4 border border-white/10 hover:border-purple-500/50 rounded-full transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
              target="_blank"
            >
              <link.icon size={24} className="text-white" />
            </motion.a>
          ))}
            <motion.div
            className="flex gap-2 bg-gray-800/50 p-4 border border-white/10 hover:border-purple-500/50 rounded-full transition-colors"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <Mail />:  owaiskal57@gmail.com
          </motion.div>
        </motion.div>

        <RippleButton
          className="hover:bg-white hover:text-black transition-all duration-300"
          variant="primary"
          rippleColor="red"
          size="lg"
          data-cursor="pointer"
        >
          Get In Touch
        </RippleButton>

        {/* Map Section */}
        <motion.div
          className="mt-6 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="-bottom-10 relative shadow-lg border border-gray-700 rounded-lg w-full overflow-hidden">
            <iframe
              title="Taloja Phase 2 Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.315385107105!2d73.15236027475793!3d19.136110482084728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e99ec369c601%3A0x3282b527b96f7cb7!2sTaloja%20Phase%202%2C%20Navi%20Mumbai%2C%20Maharashtra%20410208!5e0!3m2!1sen!2sin!4v1717686600552!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
