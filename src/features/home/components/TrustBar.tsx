"use client"

import { motion } from "framer-motion"
import { Leaf, RefreshCcw, ShieldCheck, Truck } from "lucide-react"; // trust icons

const items = [ // trust bar items
  { icon: motion.create(Truck), title: "Fast Shipping", text: "Free over $50", animation: { x: [0, -6, 7, 0] } },
  { icon: motion.create(ShieldCheck), title: "Secure Checkout", text: "Protected payments", animation: { rotate: [0, -45, 45, 0] } },
  { icon: motion.create(RefreshCcw), title: "Easy Returns", text: "30-day window", animation: { rotate: [0, -360] } },
  { icon: motion.create(Leaf), title: "Clean Choices", text: "Thoughtful picks", animation: { rotate: [0, 20, -20, 0] } },
];

const TrustBar = () => ( // USP strip
  <section className="trustbar"> {/* full-width strip */}
    <div className="trustbar__inner">
      {items.map((item) => { // render items
        const Icon = item.icon; // icon component
        return (
          <motion.div key={item.title} className="trustbar__item" whileHover="hover"> {/* single item */}
            <Icon
              className="trustbar__icon"
              aria-hidden="true"
              variants={{ hover: item.animation }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            /> {/* icon */}
            <div className="trustbar__text"> {/* text block */}
              <div className="trustbar__title">{item.title}</div> {/* bold title */}
              <div className="trustbar__sub">{item.text}</div> {/* small text */}
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default TrustBar;
