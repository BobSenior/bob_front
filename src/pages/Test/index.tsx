import { motion, useMotionValue, useTransform } from "framer-motion";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const height = 70;
const padding = 10;
const size = 150;

const getHeight = (items: number[]): number => {
  const totalHeight = items.length * height;
  const totalPadding = (items.length - 1) * padding;
  return totalHeight + totalPadding;
};

const Test = () => {
  const scrollY = useMotionValue(0);
  const scale = useTransform(scrollY, [0, 100], [0, 1]);
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <>
      <motion.div
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#fff",
          position: "absolute",
          top: "50%",
          marginTop: -85,
          left: "50%",
          marginLeft: -20,
          scale: scale,
          opacity: opacity,
        }}
      />
      <motion.div
        style={{
          width: 150,
          height: 150,
          borderRadius: 30,
          overflow: "hidden",
          position: "relative",
          transform: "translateZ(0)",
          cursor: "grab",
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          style={{
            width: 150,
            height: getHeight(items),
            y: scrollY,
          }}
          drag="y"
          dragConstraints={{
            top: -getHeight(items) + size,
            bottom: 0,
          }}
        >
          {items.map((index) => {
            return (
              <motion.div
                style={{
                  width: 150,
                  height: height,
                  borderRadius: 20,
                  backgroundColor: "#fff",
                  marginBottom: index !== items.length - 1 ? 10 : 0,
                }}
                key={index}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};
export default Test;
