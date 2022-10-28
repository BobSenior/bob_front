/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { SerializedStyles } from "@emotion/react";

interface props {
  isVisible: boolean;
  children: ReactNode;
  styleCSS: SerializedStyles;
}

const ListMenu = ({ isVisible, children, styleCSS }: props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          css={styleCSS}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ListMenu;
