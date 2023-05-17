import '../Models/connection.js';
import taskSchemaModel from '../Models/indexModel.js';

export var addTask = async (req, res, next) => {
    try{
        // console.log(req.body);
        var taskData = req.body;

        var taskList = await taskSchemaModel.find();
        var len = taskList.length;
        var _id = (len == 0) ? 1 : taskList[ len - 1 ]._id + 1;

        taskData = {...taskData, _id: _id, status : 0, info : Date()};

        var result = await taskSchemaModel.create(taskData);
    
        if ( result )
        {
            res.status(200).json({msg : "Task Added Successfully", taskData : result});
        }
    } catch (error) {
        res.status(500).json({msg : "error", errorData : error});
    }
}

export var showTasks = async (req, res, next) => {
    try{
        var result = await taskSchemaModel.find();
        
        if(result!=0)
        {
            res.status(200).json({msg : "Task Details Successfully Fetched", taskDetails : result});
        }
        else
        {
            res.status(404).json({msg : "Task Details Not Found", taskDetails : result});
        }
    } catch (error) {
        res.status(500).json({msg : "Internal Server Error", taskDetails : error});
    }

}

export var manageStatus = async (req, res, next) => {
    try{
        var conditions = req.params;
        console.log(conditions); 
        if (req.params.status === 'pending' )
        {
            var result =  await taskSchemaModel.updateOne({_id : req.params._id}, {$set : {status : 0}});
            if (result!=0)
            {
                res.status(200).json({msg : "Task Status Updated Successfully", taskDetails : result});
            }
        }
        if (req.params.status === 'completed' )
        {
            var result =  await taskSchemaModel.updateOne({_id : req.params._id}, {$set : {status : 1}});
            if(result!=0)
            {
                res.status(200).json({msg : "Task Status Updated Successfully", taskDetails : result});
            }
        }
    } catch (error) {
        res.status(500).json({msg : "Task Status Error", taskDetails : error});
    }
}

export var removeTask = async (req, res, next) => {
    try{
        var conditions = req.params;
        console.log(conditions); 
        var taskList = await taskSchemaModel.find(conditions);
        if(taskList.length != 0)
        {
            var result = await taskSchemaModel.deleteOne(conditions);
            if(result)
            {
                res.status(200).json({msg : "Task Removed Successfully", taskDetails : result});                
            }
            else
            {
                res.status(200).json({msg : "Task Removed Failed", taskDetails : result});                
            }
        }
        else
        {
            res.status(404).json({msg : "Task Not Found", taskDetails : taskList});
        }
    } catch (error) {
        res.status(500).json({msg : "Task Status Error", taskDetails : error});
    }
}