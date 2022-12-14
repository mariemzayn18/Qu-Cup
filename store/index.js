export const state = newFunction();
function newFunction() {
  return () => ({
    Theme: {
      color1: "#EB6440", //orange --> text
      color2: "#497174", // turqouise --> borders
      color3: "#D6E4E5", // baby blue --> (hovering/ underlining/ styling purposes)
      color4: "#EFF5F5", //light blue --> BG
      titleFontSize: "38px",
      subTitleFontSize: "24px",
      paragraphFontSize: "20px",
    },
  });
}
