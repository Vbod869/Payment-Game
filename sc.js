let cart = [];
let total = 0;
let timerInterval;
let currentRiddle; // Store the current riddle object

// Array of fun messages
const funMessages = [
    "Sayang Pinter! 🥰💪",
    "Uuuu I Love You Babe! 🥰❤︎"
];

// Array of riddles
const riddles = [
    { question: "Apa yang bisa terbang tanpa sayap?", answer: "waktu" },
    { question: "Aku lebih ringan dari udara, tapi bahkan kamu tidak bisa memegangnya. Apa aku?", answer: "napas" },
    { question: "Aku memiliki kunci, tetapi tidak ada pintu. Apa aku?", answer: "piano" }
];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    updateTotal();
    document.getElementById("checkout").classList.remove("hidden");  // Show checkout button
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

function updateTotal() {
    total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total").textContent = total.toFixed(2);
    displayCartItems();
}

function displayCartItems() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
}

function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("hidden");
}

function clearCart() {
    cart = [];
    updateCartCount();
    updateTotal();
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("checkout").classList.add("hidden");  // Hide checkout button if cart is empty
}

function checkout() {
    const paymentModal = document.getElementById("payment-modal");
    paymentModal.classList.remove("hidden");
    startGame(); // Start the riddle game when checking out
}

// Start a new riddle game
function startGame() {
    // Randomly select a riddle
    const riddleIndex = Math.floor(Math.random() * riddles.length);
    currentRiddle = riddles[riddleIndex];
    document.getElementById("riddle-question").textContent = currentRiddle.question; // Display the riddle

    // Reset the timer
    resetTimer(10);
    document.getElementById("game-message").textContent = ""; // Clear game message
}

// Reset the timer for the game
function resetTimer(duration) {
    clearInterval(timerInterval); // Clear existing timer
    document.getElementById("timer").textContent = duration; // Set initial time
    let timeLeft = duration;

    // Start countdown timer
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu habis! Semangat Sayang 🤗");
            clearCart(); // Clear the cart if time runs out
            const paymentModal = document.getElementById("payment-modal");
            paymentModal.classList.add("hidden"); // Hide payment modal
        }
    }, 1000); // Update every second
}

// Check the user's riddle answer
function checkRiddleAnswer() {
    const userAnswer = document.getElementById("riddle-input").value.toLowerCase().trim();
    
    if (userAnswer === currentRiddle.answer) {
        document.getElementById("game-message").textContent = funMessages[2]; // Correct answer message
        alert("Congratulations! You've answered correctly! 🎉");
        clearCart(); // Clear the cart after a successful answer
        const paymentModal = document.getElementById("payment-modal");
        paymentModal.classList.add("hidden"); // Hide payment modal after success
    } else {
        document.getElementById("game-message").textContent = funMessages[3]; // Incorrect answer message
        alert("Yah salah sayang, Ayo coba lagi🤗 !");
        document.getElementById("riddle-input").value = ""; // Clear input field
        resetTimer(10); // Reset timer for the next guess
    }
}
