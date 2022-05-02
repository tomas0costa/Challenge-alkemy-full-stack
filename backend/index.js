const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/connection')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


//GET
app.get('/movements',(req,res) => {
    const sql = "SELECT * FROM ingresos_egresos"
    
    db.query(sql,(err,data) => {
        if(err) {
            console.log(err);
        } else {
            res.json({
                message : "Results",
                data
            })
        }
    })
})

app.get('/movements/:id' , (req,res) => {
    const sql = "SELECT * FROM ingresos_egresos WHERE Id = ?"
    const ID = req.params.id;

    db.query(sql,ID, (err,data) => {
        if(err) {
            console.log(err);
        } else{
            res.json({
                message : "Results",
                data
            })
        }
    })
})

//POST 

app.post('/movements',(req,res) => {
    const values = Object.values(req.body); // Me devuelve un array con los valores correspondientes a las propiedades enumerables de un objeto
    console.log(values);
    const sql = "INSERT INTO ingresos_egresos (concepto, monto, fecha) VALUES (?, ?, ?)"

    db.query(sql,values, (err,result) => {
        if(err) {
            console.log(err);
            return err
        } else {
            res.json({
                message: "Registro exitoso",
                result
            })
        }
    })

})

//PUT

app.put('/movements',(req,res) => {
    const values = Object.values(req.body);
    console.log(values);

    const sql = "UPDATE ingresos_egresos SET concepto=? , monto=? , fecha=? WHERE id_ingresos=?"

    db.query(sql,values, (err,result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            res.json({
                message: "Registro modificado",
                result
            })
        }
    })
})

//DELETE 

app.delete('/movements/:id', (req,res) => {
    const ID = req.params.id;
    const sql ="DELETE FROM ingresos_egresos WHERE id_ingresos=?"

    db.query(sql,ID, (err,result) => {
        if (err) {
            console.log(err);
            return err;
        }else {
            res.json({
                message:"Registro eliminado"
            })
        }
    })
})

//Listen 

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
})

