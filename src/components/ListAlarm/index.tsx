/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence } from "framer-motion";
import { css } from "@emotion/react";

const AlarmMenu = css`
  position: absolute;
  z-index: 1025;
  top: 39px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--basic-back-color);
`;

const ListAlarm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -70 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, y: -70 }}
      css={AlarmMenu}
    >
      123
    </motion.div>
  );
};

export default ListAlarm;
