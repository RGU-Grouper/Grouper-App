// Utility Functions

// Shuffles the order of elements in an array - changes original array
export const shuffle = (array) => {
	let currentIndex = array.length;

  while (currentIndex !== 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
};
