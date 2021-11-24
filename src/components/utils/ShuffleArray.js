const ShuffleArray = (arr) => {
  let currentIndex = arr.length,
    randomIndex;
  if (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
};

export default ShuffleArray;
