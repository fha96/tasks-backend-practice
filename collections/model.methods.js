'use strict';



class Collections {
    constructor(model) {
        this.model = model;
    }

   async read(id) {
    try {
        
        if(id){
            return await this.model.findOne({where:{id}});
        } else {
            return await this.model.findAll();
        }
    } catch (error) {
        console.error(`Error while reading ${error.message}`);
    }
    }

    async add(obj) {
        try {  
            return await this.model.create(obj);
        } catch (error) {
        console.error(`Error while adding ${error.message}`);
        }
    }

    async delete(id){
        try {
            return await this.model.destroy({where:{id}});
        } catch (error) {
        console.error(`Error while deleting ${error.message}`);  
        }
    }

    async update(obj, id) {
        try {
            return await this.model.update(obj, {where:{id}});
        } catch (error) {
        console.error(`Error while updating ${error.message}`);
            
        }
    }
    async readTasksWithStatus(Model) {
        try {
            let tasks = await this.model.findAll({include:[Model]});
            return tasks; 
        } catch (error) {
            console.error(`Error while read with status  ${error.message}`);

        }

    }

    async createAndReadAllStatus(Model, obj, id){
        try {
            await this.model.create(obj);
            return this.model.findAll({include:[Model], where:{taskID:id}});
        } catch (error) {
            console.error(`Error while read and create status  ${error.message}`);
        }

    }
}


module.exports = Collections;