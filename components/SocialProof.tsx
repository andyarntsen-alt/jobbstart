"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2000+", label: "SØKNADER GENERERT" },
  { value: "<2 min", label: "GJENNOMSNITTLIG TID" },
  { value: "5", label: "PROFESJONELLE CV-MALER" },
  { value: "98%", label: "FORNØYDE BRUKERE" },
];

export default function SocialProof() {
  return (
    <section className="bg-secondary px-5 md:px-8 lg:px-10 py-16 md:py-20 lg:py-28 border-y border-foreground/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16">
          <span className="industrial-label mb-4 block">/ TALLENE SNAKKER</span>
          <h2 className="sr-only">Statistikk og sosiale bevis</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l border-foreground/10 first:border-l-0 px-4 md:px-6 lg:px-8 py-4"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-2">
                {stat.value}
              </div>
              <div className="industrial-label !opacity-40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
