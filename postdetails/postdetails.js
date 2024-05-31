// TODO: add function that creates the blurry layer in the background
// TODO: create unique ids for each post

let textarea = document.querySelector('.commentInputContainer textarea');
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    let linesCount = this.value.split('\n').length;
    this.style.height = 'auto';
    this.style.height = linesCount + 'lh'; // lh stands for line height
}