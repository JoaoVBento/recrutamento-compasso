
class MongoService {

    constructor(model) {
      this.model = model
    }
  
    // Get all registers with or without a filter
    async getAll(where = {}) {
      return this.model.find({...where})
    }
  
    // Get register by id
    async getById(id) {
      return this.model.findById(id)
    }
  
    // Create register
    async create(data) {
      const doc = new this.model({...data})
  
      return doc.save()
    }
  
    // Update Function by id
    async updateById(newData, id) {
      return this.model.findByIdAndUpdate(id, { $set: {...newData}, $inc: {__v: 1} }, { runValidators: true, new: true })
    }
  
    // Update first Function that matches the filter
    async updateOne(newData, where) {
      return this.model.findOneAndUpdate({ ...where }, { $set: {...newData}, $inc: {__v: 1} }, { runValidators: true, new: true })
    }
  
    // Update Functions that match the filter
    async updateByQuery(newData, where) {
      return this.model.updateMany({ ...where }, { $set: {...newData}, $inc: {__v: 1} }, { runValidators: true, new: true })
    }
  
    // Delete function by id
    async deleteById(id) {
      return this.model.findByIdAndDelete(id)
    }
  
  }
  
  module.exports = MongoService