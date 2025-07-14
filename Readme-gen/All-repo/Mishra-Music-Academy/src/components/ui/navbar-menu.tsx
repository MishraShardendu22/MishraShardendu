"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="font-bold duration-500 relative px-4">
      <motion.p
        transition={{ duration: 0.3 }}
        className="hover:text-yellow-500 duration-500 font-bold cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="font-bold duration-500 absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="font-bold duration-500 bg-white dark:bg-orange-900 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="font-bold duration-500 w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="font-bold min-w-[150%] duration-500 relative rounded-full border border-transparent dark:bg-slate-700 dark:border-white/[0.4] bg-white shadow-input flex justify-center space-x-8 py-6 left-1/2 transform -translate-x-1/2"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="font-bold duration-500 flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="font-bold duration-500 flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="font-bold duration-500 text-xl mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="font-bold duration-500 text-neutral-500 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="font-bold duration-500 text-neutral-500 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
