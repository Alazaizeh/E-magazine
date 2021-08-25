'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  async get(id) {
    try{
    if (id) {
      return  await this.model.findOne({ id });
    }
  else {
      return await this.model.findAll({});
    }
  }catch(error){
    console.error(
      "can not read the record on ",this.model.name,`where id=${id}`
    )
  }}

  async create(record) {
    try{
      console.log(record,"----------------------------------")
    return await this.model.create(record);}
    catch(error){console.error("can not create a new record on",this.model.name)}
  }

  async update(id, data) {
    try{
    let record=await this.model.findOne({where:{id}});
    let updateRecord=await record.update(data);
    return updateRecord;
    }catch(error){}
  }

  async delete(id) {
    if(!id){
      throw new Error("no id provided !")
    }
    try{
      let deletedRecod=await this.model.destroy({where:{id}});
      return deletedRecod;
    }catch(error){
      console.error(
        "can not delet this recode on ",this.model.name,`where is ${id}`
      )
    }
    }
  

}

module.exports = DataCollection;