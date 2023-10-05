const getRandomColor = () => {
  const letters = '23456789ABC';
  let color = '#';

  // Generate 6 random characters to create the color code
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 11)];
  }
  return color;
};

export default getRandomColor;
