const element = document.getElementById('typewriter');

const texts = [
    "hello, my name is Joe...",
    "Welcome"
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 150; // Speed of typing in milliseconds
const deletingSpeed = 175; // Speed of deleting in milliseconds

function getCommonPrefix(text1, text2) {
    let commonPrefixLength = 0;
    while (commonPrefixLength < text1.length &&
           commonPrefixLength < text2.length &&
           text1[commonPrefixLength] === text2[commonPrefixLength]) {
        commonPrefixLength++;
    }
    return commonPrefixLength;
}

function type() {
    const currentText = texts[currentTextIndex];
    const nextText = texts[(currentTextIndex + 1) % texts.length];
    const commonPrefixLength = getCommonPrefix(currentText, nextText);

    if (isDeleting) {
        const deleteUntil = Math.max(commonPrefixLength, currentCharIndex);
        element.textContent = currentText.substring(0, deleteUntil);

        if (currentCharIndex <= commonPrefixLength) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            setTimeout(type, 500); // Pause before typing the next text
        } else {
            currentCharIndex--;
            setTimeout(type, deletingSpeed);
        }
    } else {
        if (currentCharIndex < nextText.length) {
            element.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Start deleting after reaching the end of the text
            isDeleting = true;
            setTimeout(type, 2000); // Pause before deleting
        }
    }
}

// Start the typing effect
type();

document.addEventListener('DOMContentLoaded', function() {
    var accordions = document.querySelectorAll('.accordion');

    accordions.forEach(function(accordion) {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
});