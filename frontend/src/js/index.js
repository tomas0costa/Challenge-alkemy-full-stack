const API_URL = "http://localhost:3000/movements"
let records = [];

window.addEventListener('DOMContentLoaded', () => {
    getRecords();
    

})

//GET

const getRecords = () => {
    fetch(API_URL)
    .then(res => res.json())
    .catch(e => {
        alertManager("error","Se ha producido un error");
    })

    .then(data => {
        records = data.data; 
        renderResults(records,openModal);
        monto();
    })    
}    

//POST IN

const createRecordIn = () => {
    const formData = new FormData(document.querySelector('#formIn'));
    const concept = document.getElementById('conceptIn').value; 

    if(concept === 1 || !formData.get("montoIn") || !formData.get("timeIn")){
        document.querySelector('.msg-error').innerHTML = "*Completá todos los campos"
        setTimeout(() => {
            document.querySelector('.msg-error').innerHTML = ""
            
        }, 5000);
        
    }
    
    const record = {
        concepto : concept,
        monto : formData.get("montoIn"),
        fecha : converterTime(formData.get("timeIn")),
    }
    

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(record),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .catch(e => {
        alertManager("error","Se ha producido un error");
        document.querySelector('.formIn').reset();
    })
    .then(response => {
        alertManager("success",response.message);
        getRecords();
        document.querySelector('.formIn').reset();
    })
}

//POST OUT
const createRecordOut = () => {
    const formData = new FormData(document.querySelector('#formOut'));
    const concept = document.getElementById('concept').value; 

    if(concept === 1 || !formData.get("monto") || !formData.get("time")){
        document.querySelector('.msg-error-out').innerHTML = "*Completá todos los campos"
        setTimeout(() => {
            document.querySelector('.msg-error-out').innerHTML = ""
            
        }, 5000);
        
    }

    const record = {
        concepto : concept,
        monto : "-" + formData.get("monto"),
        fecha : converterTime(formData.get("time")),
    }
    
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(record),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .catch(e => {
        alertManager("error","Se ha producido un error");
        document.querySelector('#formOut').reset();
    })
    .then(response => {
        alertManager("success",response.message);
        
        document.querySelector('#formOut').reset();
        
        location.reload();
    })
}
//PUT

const editRecord = (id) => {
    let record = {};
    records.filter(rec => {
        if(rec.id_ingresos === id){
            record = rec;
        }
    })

    document.querySelector("#IdOut").value = record.id_ingresos
    document.querySelector("#conceptEditOut").value = record.concepto
    document.querySelector("#montoEdit").value = Math.abs(record.monto)
    document.querySelector("#dateEdit").value = converterTime2(record.fecha)
    
}

const updateRecord = () => {
    let formData = new FormData(document.querySelector("#formEdit"))
    
    let record = {
        concepto: document.querySelector("#conceptEditOut").value,
        monto: formData.get("montoEdit"),
        fecha: formData.get("dateEdit"),
        id_ingresos: document.querySelector("#IdOut").value
    }
    
    const list = ["Ventas","Mesada","Ahorros","Salario","Vueltos"]
    if (list.indexOf(record.concepto) === -1 ) {
        record.monto = "-" + formData.get("montoEdit")
    }
    console.log(record);
    
    
    
    if(!record.monto || !record.fecha || !record.id_ingresos){
        document.querySelector('#msg-edit-out').innerHTML = "*Completá todos los campos"
        
        setTimeout(() => {
            document.querySelector('#msg-edit-out').innerHTML = ""
            
        }, 5000);
        return;
    }

    fetch(API_URL, {
        method: 'PUT',
        body : JSON.stringify(record),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .catch(e => {
        alertManager("error",e)
    })
    .then(response => {
        alertManager("success",response.message);
        getRecords();
    })
}

//DELETE

const deleteRecord = (id) => {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    } )
    .then(res => res.json)
    .catch(e => {
        alertManager("error",e)
    })
    .then(response => {
        alertManager("success",response.message);
        getRecords();
    })
}

const confirmDelete =() => {
    let id = document.querySelector("#IdOut").value;
    deleteRecord(id);
}
//Lista de ingresos egresos 

const recordsOut = document.querySelector('.records__out-table'); 
const recordsIn = document.querySelector('.records__in-table'); 

function renderResults(records,callback) {
    let listHTML1 = `<caption class="title">Ingresos</caption>
    <tr>
        <th>Fecha</th>
        <th>Horario</th>
        <th>Concepto</th>
        <th>Monto</th>
    </tr>    
    `;
    let listHTML2 = `<caption class="title">Egresos</caption>
    <tr>
        <th>Fecha</th>
        <th>Horario</th>
        <th>Concepto</th>
        <th>Monto</th>
    </tr>    
    `;
    records.forEach(record => {
        if(record.monto < 0) {
            listHTML2 += `
            <tr class="btnModal" onclick ="editRecord(${record.id_ingresos})">
            <td>${Date(record.fecha)}</td>
            <td>${TimeN(record.fecha)}</td>
                    <td>${record.concepto}</td>
                    <td>-$${Math.abs(record.monto)}</td>
            </tr>`        
            
            recordsOut.innerHTML = listHTML2;
        } else {
            listHTML1 += `
            <tr class="btnModal" onclick ="editRecord(${record.id_ingresos})">
            <td>${Date(record.fecha)}</td>
            <td>${TimeN(record.fecha)}</td>
                    <td>${record.concepto}</td>
                    <td>$${record.monto}</td>
            </tr>`        
            
            recordsIn.innerHTML = listHTML1;
        }    
                
    })    
        
    callback();
   
    

}    
// MODAL

const modalEdit = document.querySelector('.modalEdit')
const btnClose = document.querySelector(".button-close");

function openModal() {

    const btnModal = document.querySelectorAll('.btnModal')
    if(btnClose) {
        for(let i of btnModal){
            i.addEventListener('click', () => {
                modalEdit.style.display = 'block';
            }, false);
        }
        
        
        btnClose.addEventListener("click",() => {
            modalEdit.style.display = 'none';
        },false )

    }


}





//  ALERT

const alertManager = (typeMsg, message) => {
    const alert = document.querySelector('.alert')

    alert.innerHTML = message || "Se produjeron cambios";
    alert.classList.add(typeMsg);
    alert.style.display = 'inline';

    setTimeout(() => {
        alert.style.display = 'none';
        alert.classList.remove(typeMsg);
    }, 20000);

}
//Fecha y hora
function Date(date) {
    
    let dateNew = date.split("T",10);

    let definitiveDate = dateNew[0].replace(/-/g,'/') ;
    return definitiveDate;
}

function TimeN(timeN) {
    
    let time = timeN.split("T",10);
    let timeNew = time[1].substring(0,5)

    let definitiveTime =  timeNew;
    return definitiveTime;
}

//Concertir la hora de js a mysql

function converterTime(date) {
    let fecha_hora = date.split("T" ,2);
    return fecha_hora[0] + " " + fecha_hora[1] + ":00";
}
function converterTime2(date) {
    // let fecha_hora = date.split("T" ,2);
    return date.slice(0,-1) ;
}

