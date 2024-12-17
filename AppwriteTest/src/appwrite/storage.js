import config from "../config/config.js"
import { Client, Databases, Storage, ID } from "appwrite";


export class Service {
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setProject(config.appwriteProjectID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
                
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileId
        ).href
    }
}


const service = new Service()
export default service;
