const form = document.querySelector('form');

form.addEventListener('submit', function(event){
    event.preventDefault(); 
    

    const height = parseFloat(document.querySelector('#height').value);
    const weight = parseFloat(document.querySelector('#weight').value);
    const result = document.querySelector('#results'); 

    if(height <= 0 || weight <= 0 || isNaN(height) || isNaN(weight)){
        result.innerHTML = "<span>This is an invalid input!</span>";
    } else {
        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
        if(bmi < 18.6){
            result.innerHTML = `<span>${bmi} is your BMI and you are underweight</span>`;
        }else if(bmi > 24.9){
            result.innerHTML = `<span>${bmi} is your BMI and you are overweight</span>`;
        }else{  
            result.innerHTML = `<span>${bmi} is your BMI and you are normal weight</span>`;
        }
    }
});