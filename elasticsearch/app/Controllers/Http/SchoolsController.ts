import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';


export default class SchoolsController {

    public async read(request:HttpContextContract) {    
        let data = await axios.get('http://127.0.0.1:9200/del_school_index/_search')
        return data.data
    }

    public async readIndividual({request}:HttpContextContract){
        let inputId = request.params().id 
        let inputData = {
            "query":{
                "match":{
                    "_id":`${inputId}`
                }
            }
        }
        let data = await axios.post('http://127.0.0.1:9200/del_school_index/_search', inputData)
        return data.data
    }

    public async create({request}:HttpContextContract) {
        let inputId  = request.input('id')
        let inputData = {"name":request.input('name'), 
        "location":request.input('location')}
        console.log(inputId)
        console.log(inputData)
        let data = await axios.post(`http://127.0.0.1:9200/del_school_index/_doc/${inputId}`, inputData)
        return data.data
    }

    public async update({request}:HttpContextContract){
        let inputId = request.input('id')
        let inputNewName = request.input('name')
        let inputNewLocation = request.input('location')
        let inputData = {
            "doc":{
                "name": inputNewName, 
                "location":inputNewLocation
            }
        }
        let data = await axios.post(`http://127.0.0.1:9200/del_school_index/_update/${inputId}`, inputData)
        return data.data
    }

    public async delete({request}:HttpContextContract){
        let inputId = request.params().id 
        console.log(inputId)
        let inputData = {
            "query":{
                "match":{
                    "_id":inputId
                }
            }
        }
        let data = await axios.post(`http://127.0.0.1:9200/del_school_index/_delete_by_query`, inputData)
        return data.data
    }
}
