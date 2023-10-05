const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  // Generate a color and keep generating until it's not white
  do {
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (color === '#FFFFFF'); // Check if the color is white

  return color;
};

export default getRandomColor;
