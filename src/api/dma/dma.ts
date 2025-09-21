//submit data for dma
//check credits for dma
//read dma 
import { dma_client } from "../dma_client"
import type { CreditsResponse, UploadDMARecordsResponse } from "./types"

export const dma_api={
    //check credits
    check_credits:async():Promise<CreditsResponse>=>{
        try {
           const credits=await dma_client.get<CreditsResponse>('/dma/check-credits');
           console.log("print credits")
           console.log(credits.data.credits)
           console.log("print message")
           console.log(credits.data.message)
           return credits.data
        } catch (error) {
            console.error(error)
            throw new Error(`${error}`)
        }
    },
    //upload dma data
    upload_dma_records:async(file:File):Promise<UploadDMARecordsResponse>=>{
        try {
            const formData=new FormData();
            formData.append('file',file);
            
            const response=await dma_client.post<UploadDMARecordsResponse>('/dma/upload-data',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })

            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            throw new Error(`message:${error}`)
        }
    },
    //check dedupe status
    check_dedupe_status:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
        }
    },
    read_dedupe_output:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
        }
    }
}