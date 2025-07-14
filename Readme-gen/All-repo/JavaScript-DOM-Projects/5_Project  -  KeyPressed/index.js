const Change = document.querySelector('h1');

document.addEventListener('keyup', function(event) {
    Change.innerHTML = `The Key Pressed (Code): ${event.code}<br>The Key Pressed (Key): ${event.key === ' ' ? `SpaceBar` : `${event.key}`}`;
});
