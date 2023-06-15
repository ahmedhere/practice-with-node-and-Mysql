const express = require('express');
const DBHandle = require('../Controllers/testingwithnodeHandle');
const Router = express.Router();

const handleDAL = new DBHandle("localhost", "root", "","test",  "testingwithnode");



Router.get('/', (req, res) => {
   
    handleDAL.getData().then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
    
   
})

Router.get('/:id', (req, res) => {
    
    handleDAL.getSpecificData(req.params.id).then((data) => {
        res.json(data);
    }).catch(err => {
        throw err;
    })

})

Router.post('/', (req, res) => {
    const data = req.body;
    
    handleDAL.registerData(data).then((data) => {
        res.json(data);
    }).catch(err => {
        throw err;
     })

})

Router.delete('/:id', (req, res) => {
    // const sql = `DELETE FROM testingwithnode WHERE id = ${req.params.id}`;
    // db.query(sql, (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     res.send(`The request data has been deleted with the ${req.params.id} number`)
    // })
    handleDAL.DeleteUser(req.params.id).then((data) => {
        res.json(data);
    }).catch(err => {
        throw err;
    })
})

Router.put('/:id', (req, res) => {
    // const { name, email } = req.body;
    // const id = req.params.id;
    // const sql = `UPDATE testingwithnode SET name = '${name}', email = '${email}' WHERE id=${id}`;
    // db.query(sql, (err, result) => {
    //     if (err) throw err;
    //     res.send(result);
    // })

    handleDAL.updateUser(req.params.id, req.body).then((data) => {
        res.json(data);
    }).catch(err => {
        throw err;
    })
})

module.exports = Router;