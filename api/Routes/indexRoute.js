import express from 'express';
import * as indexController from '../Controllers/indexController.js';

const router =  express.Router();

router.get("/", (req, res) => {
    res.send("Express Server Working");
});

router.post('/addtask', indexController.addTask );

router.get('/showtasks', indexController.showTasks );

// router.patch('/managestatus', indexController.manageStatus );

router.get('/managestatus/:status/:_id', indexController.manageStatus );

router.delete('/removetask/:_id', indexController.removeTask );

router.delete('/removetask', indexController.clearTodos );


export default router;