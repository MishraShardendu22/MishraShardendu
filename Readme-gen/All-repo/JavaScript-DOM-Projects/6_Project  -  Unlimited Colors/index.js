// generate color
function color(){
    const hex = "0123456789ABCDEF";
    let clr = '#';  
    for(let i = 0; i < 6; i++){
        let num = Math.floor((Math.random() * 16));
        clr += hex[num]; 
    }
    return clr;
}

let ChngClr;  

function StartChangingColor(){
    if(!ChngClr){
        document.body.style.transition = "background-color 1s";
        ChngClr = setInterval(ColorChange, 500);
    }
    function ColorChange(){
        document.body.style.backgroundColor = color();  
    }
}

const StopChangingColor = function(){
    clearInterval(ChngClr);
    ChngClr = null;
}

document.querySelector('.start').addEventListener('click', StartChangingColor);
document.querySelector('.stop').addEventListener('click', StopChangingColor);
