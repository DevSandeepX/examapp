function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // Generate a random index
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at index i and j
        [arr[i], arr[j]] = [arr[j], arr[i]]; // ES6 destructuring swap
    }
    return arr;
}


export default shuffleArray