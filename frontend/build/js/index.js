const API_URL="http://localhost:3000/movements";let records=[];window.addEventListener("DOMContentLoaded",()=>{getRecords()});const getRecords=()=>{fetch(API_URL).then(e=>e.json()).catch(e=>{alertManager("error","Se ha producido un error")}).then(e=>{records=e.data,renderResults(records,openModal),monto()})},createRecordIn=()=>{const e=new FormData(document.querySelector("#formIn")),t=document.getElementById("conceptIn").value;1!==t&&e.get("montoIn")&&e.get("timeIn")||(document.querySelector(".msg-error").innerHTML="*Completá todos los campos",setTimeout(()=>{document.querySelector(".msg-error").innerHTML=""},5e3));const o={concepto:t,monto:e.get("montoIn"),fecha:converterTime(e.get("timeIn"))};fetch(API_URL,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).catch(e=>{alertManager("error","Se ha producido un error"),document.querySelector(".formIn").reset()}).then(e=>{alertManager("success",e.message),getRecords(),document.querySelector(".formIn").reset()})},createRecordOut=()=>{const e=new FormData(document.querySelector("#formOut")),t=document.getElementById("concept").value;1!==t&&e.get("monto")&&e.get("time")||(document.querySelector(".msg-error-out").innerHTML="*Completá todos los campos",setTimeout(()=>{document.querySelector(".msg-error-out").innerHTML=""},5e3));const o={concepto:t,monto:"-"+e.get("monto"),fecha:converterTime(e.get("time"))};fetch(API_URL,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).catch(e=>{alertManager("error","Se ha producido un error"),document.querySelector("#formOut").reset()}).then(e=>{alertManager("success",e.message),document.querySelector("#formOut").reset(),location.reload()})},editRecord=e=>{let t={};records.filter(o=>{o.id_ingresos===e&&(t=o)}),document.querySelector("#IdOut").value=t.id_ingresos,document.querySelector("#conceptEditOut").value=t.concepto,document.querySelector("#montoEdit").value=Math.abs(t.monto),document.querySelector("#dateEdit").value=converterTime2(t.fecha)},updateRecord=()=>{let e=new FormData(document.querySelector("#formEdit")),t={concepto:document.querySelector("#conceptEditOut").value,monto:e.get("montoEdit"),fecha:e.get("dateEdit"),id_ingresos:document.querySelector("#IdOut").value};if(-1===["Ventas","Mesada","Ahorros","Salario","Vueltos"].indexOf(t.concepto)&&(t.monto="-"+e.get("montoEdit")),console.log(t),!t.monto||!t.fecha||!t.id_ingresos)return document.querySelector("#msg-edit-out").innerHTML="*Completá todos los campos",void setTimeout(()=>{document.querySelector("#msg-edit-out").innerHTML=""},5e3);fetch(API_URL,{method:"PUT",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).catch(e=>{alertManager("error",e)}).then(e=>{alertManager("success",e.message),getRecords()})},deleteRecord=e=>{fetch(`${API_URL}/${e}`,{method:"DELETE"}).then(e=>e.json).catch(e=>{alertManager("error",e)}).then(e=>{alertManager("success",e.message),getRecords()})},confirmDelete=()=>{let e=document.querySelector("#IdOut").value;deleteRecord(e)},recordsOut=document.querySelector(".records__out-table"),recordsIn=document.querySelector(".records__in-table");function renderResults(e,t){let o='<caption class="title">Ingresos</caption>\n    <tr>\n        <th>Fecha</th>\n        <th>Horario</th>\n        <th>Concepto</th>\n        <th>Monto</th>\n    </tr>    \n    ',n='<caption class="title">Egresos</caption>\n    <tr>\n        <th>Fecha</th>\n        <th>Horario</th>\n        <th>Concepto</th>\n        <th>Monto</th>\n    </tr>    \n    ';e.forEach(e=>{e.monto<0?(n+=`\n            <tr class="btnModal" onclick ="editRecord(${e.id_ingresos})">\n            <td>${Date(e.fecha)}</td>\n            <td>${TimeN(e.fecha)}</td>\n                    <td>${e.concepto}</td>\n                    <td>-$${Math.abs(e.monto)}</td>\n            </tr>`,recordsOut.innerHTML=n):(o+=`\n            <tr class="btnModal" onclick ="editRecord(${e.id_ingresos})">\n            <td>${Date(e.fecha)}</td>\n            <td>${TimeN(e.fecha)}</td>\n                    <td>${e.concepto}</td>\n                    <td>$${e.monto}</td>\n            </tr>`,recordsIn.innerHTML=o)}),t()}const modalEdit=document.querySelector(".modalEdit"),btnClose=document.querySelector(".button-close");function openModal(){const e=document.querySelectorAll(".btnModal");if(btnClose){for(let t of e)t.addEventListener("click",()=>{modalEdit.style.display="block"},!1);btnClose.addEventListener("click",()=>{modalEdit.style.display="none"},!1)}}const alertManager=(e,t)=>{const o=document.querySelector(".alert");o.innerHTML=t||"Se produjeron cambios",o.classList.add(e),o.style.display="inline",setTimeout(()=>{o.style.display="none",o.classList.remove(e)},2e4)};function Date(e){return e.split("T",10)[0].replace(/-/g,"/")}function TimeN(e){return e.split("T",10)[1].substring(0,5)}function converterTime(e){let t=e.split("T",2);return t[0]+" "+t[1]+":00"}function converterTime2(e){return e.slice(0,-1)}