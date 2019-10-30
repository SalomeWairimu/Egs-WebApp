var curr = "#login";
var fadeInstyles = {"#login":'fadeInRight', "#signup": 'fadeInLeft'};
var fadeOutstyles = {"#login":'fadeOutRight', "#signup": 'fadeOutLeft'};

const handleAnimationEnd_pt2 = (elem) => {
    elem = elem.target;
    elem.classList.remove('animated', fadeInstyles[curr], 'faster');
    elem.removeEventListener('animationend', handleAnimationEnd_pt2);

};
const handleAnimationEnd_pt1 = (elem) => {
    elem = elem.target;
    elem.style.display = "none";
    // console.log(curr);
    // console.log(fadestyles[curr])
    elem.classList.remove('animated', fadeOutstyles[curr], 'faster');
    elem.removeEventListener('animationend', handleAnimationEnd_pt1);
    if (curr == '#login'){
        curr = "#signup";
    }
    else{
        curr = '#login';
    }
    elem = document.querySelector(curr);
    elem.style.display = "block";
    elem.classList.add('animated', fadeInstyles[curr], 'faster');
    elem.addEventListener('animationend', handleAnimationEnd_pt2);
};

const loadPage = (e) =>{
    var elem = document.querySelector(curr);
    // console.log(curr);
    // console.log(fadestyles[curr])
    elem.classList.add('animated', fadeOutstyles[curr], 'faster');
    elem.addEventListener('animationend', handleAnimationEnd_pt1);
};
