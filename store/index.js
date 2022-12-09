export const state = newFunction()
function newFunction() {
  return () => ({
    Theme: 
      {
        color1: '#492293', //purple
        color2: 'rgba(255, 183, 77, 1)', // gold
        color3: 'rgba(86, 86, 86, 1)',  // grey
        color4:' #F8F8F8', //Grey BG color
        titleFontSize: '38px',
        subTitleFontSize: '24px',
        paragraphFontSize: '20px',
      }
  })
}