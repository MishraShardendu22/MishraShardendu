const btn  = document.querySelectorAll('.canvas');
const body = document.querySelector('body')
body.style.transition = 'background-color 0.5s ease';

btn.forEach( (val) => {
    val.addEventListener('click' , function(event){
        const arr = ['yellow','grey','violet','purple','white'];
        if(arr.includes(event.target.id)){
            body.style.backgroundColor = event.target.id;
        }
    });
});

// btn.forEach( (val) => {
//     val.addEventListener('click' , function(event){
//         if(event.target.id === 'yellow'){
//             body.style.backgroundColor = event.target.id;
//         }
//         if(event.target.id === 'grey'){
//             body.style.backgroundColor = event.target.id;
//         }
//         if(event.target.id === 'white'){
//             body.style.backgroundColor = event.target.id;
//         }
//         if(event.target.id === 'purple'){
//             body.style.backgroundColor = event.target.id;
//         }
//         if(event.target.id === 'violet'){
//             body.style.backgroundColor = event.target.id;
//         }
//     });
// });




//////////////////////////////////////////////////////////////////
//                        LEARNINGS                             //
//////////////////////////////////////////////////////////////////


// btn.forEach( (val) => {
    // console.log(val);  
    // this will return 
    // <div class="canvas">
    //   <h1>Color Scheme Switcher</h1>
    //   <span class="button" id="grey"></span>
    //   <span class="button" id="white"></span>
    //   <span class="button" id="violet"></span>
    //   <span class="button" id="yellow"></span>
    //   <span class="button" id="purple"></span>
    //   <h2>
    //       Try clicking on one of the colors above
    //       <span>
    //        to change the background color of this page!
    //       </span>
    //   </h2>
    // </div>
// });

