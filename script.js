let mario = document.getElementById('mario');
let bricks = document.querySelectorAll('.brick');
let dialogs = document.querySelectorAll('.brick-dialog');
let marioContainer = document.getElementById('marioContainer');

let marioHorizontalPosition = 0;
let lastDialogShown = null;
let lastScrollPosition = window.scrollY;
let maxMarioMovement = window.innerWidth - 70;

let activatedBricks = Array.from(bricks).map(() => false);

let jumped = false;

window.addEventListener('scroll', function() {
    let scrollableHeight = document.body.scrollHeight - window.innerHeight;
    let marioPosition = (-70 + (window.scrollY / scrollableHeight) * maxMarioMovement);
    
    marioContainer.style.transform = `translateX(${marioPosition}px)`;

    bricks.forEach((brick, index) => {
        if (isMarioUnderBrick(marioContainer, brick) && !activatedBricks[index]) {
            dialogs[index].style.display = 'block';
            lastDialogShown = dialogs[index];
            lastScrollPosition = window.scrollY;

            mario.style.width = '85px';
            mario.style.backgroundImage = "url('jump.png')";
            mario.style.animation = 'jump 0.5s';

            setTimeout(function() {
            }, 2000);
            if (jumped == false) {
                
                jumped = true;
            }

            activatedBricks[index] = true;
            
        }
    });
    
   

    if (lastDialogShown && Math.abs(window.scrollY - lastScrollPosition) > 50) {
        lastDialogShown.style.display = 'none';
        lastDialogShown = null;
    }
    if (marioPosition >= maxMarioMovement - 100) { 
        window.location.href = "";
    }
});

mario.addEventListener('animationend', function() {
    mario.style.animation = '';
});

dialogs.forEach(dialog => {
    dialog.addEventListener('click', function() {
        dialog.style.display = 'none';
    });
});


let title = document.querySelector('.title');


title.addEventListener('click', function() {
    title.style.transition = 'transform 1s, opacity 1s';
    title.style.transform = 'translate(-50%, -50%) scale(1.5)';
    title.style.opacity = '0';

    setTimeout(() => {
        title.style.display = 'none';
        gameContent.style.display = 'block';
    }, 1000);  // 1000ms is the css animation too baby

    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflow = 'auto';
});


function isMarioUnderBrick(mario, brick) {
    let marioRect = mario.getBoundingClientRect();
    let brickRect = brick.getBoundingClientRect();

    let isHorizontallyAligned = marioRect.left <= brickRect.right && marioRect.right >= brickRect.left;

    let isBelowBrick = marioRect.top >= brickRect.bottom;
    

    return isHorizontallyAligned && isBelowBrick;
}

mario.addEventListener('animationend', function() {
    mario.style.width = '60px';
    mario.style.animation = '';
    console.log('Animation ended');
    mario.classList.remove('mario-jump');
    mario.style.backgroundImage = "url('mario.png')";
});


let previousScrollPosition = 0;


