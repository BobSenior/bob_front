const countColumns = (data: {
  totalWidth: number;
  divWidth?: number;
  maxDivs?: number;
}) => {
  let num = Math.floor(data.totalWidth / (data.divWidth ?? 380));
  if (num > (data.maxDivs ?? 3)) {
    num = data.maxDivs ?? 3;
  } else if (num < 1) {
    num = 1;
  }
  return num;
};
export default countColumns;
