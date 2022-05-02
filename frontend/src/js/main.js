//Resultante 
const resultante = document.querySelector('.main__balance--result');
let montos = 0 ;

function monto() {
    
        for(let i = 0 ; i < records.length - 1; i++ ) {
            montos += records[i].monto
        }

        if(resultante){
            resultante.innerHTML = "$" + montos;
    
            if (montos < 0) {
                resultante.classList.add("red")
            } else {
                resultante.classList.add("green")
                
            }

        }
}



