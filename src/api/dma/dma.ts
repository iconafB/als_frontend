//submit data for dma
//check credits for dma
//read dma 
import axios from "axios";
import { dma_client } from "../dma_client"
import { campaigns_client } from "../campaigns_client"

import type { CreditsResponse, UploadDMARecordsResponse,PaginatedDMARecordInterface,TotalNumberOfDMARecords,DMARecordBaseInterface,DeleteRecordResponse,SearchDMAOverviewRecords } from "./types"

export const dma_api={
    //check credits
    check_credits:async():Promise<CreditsResponse>=>{
        try {
           const credits=await campaigns_client.get<CreditsResponse>('/dma-records/credits');     
           return credits.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
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
    },

    get_all_dma_records:async(page:number=1,page_size:number=10):Promise<PaginatedDMARecordInterface>=>{
       try {
        const response=await campaigns_client.get<PaginatedDMARecordInterface>("/dma-records/all",{params:{page:page,page_size:page_size}});
        console.log("print the dma data")
        console.log(response?.data)
        return response?.data;
       } catch (error) {
        if(axios.isAxiosError(error)){
            throw error
        }
        throw error
       }
    },
    get_total_dma_records:async():Promise<TotalNumberOfDMARecords>=>{
        try {
            const response=await campaigns_client.get<TotalNumberOfDMARecords>("/dma-records/total")
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error;
            }
            throw error;
        }
    },
    get_record_by_campaign_code:async(page:number=1,page_size:number=10,camp_code:string):Promise<PaginatedDMARecordInterface>=>{
        try {
            const response=await campaigns_client.get<PaginatedDMARecordInterface>(`/dma-records/${camp_code}`,{params:{page:page,page_size}})
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error;
            }
            throw error
        }
    },
    get_record_by_id:async(id:number):Promise<DMARecordBaseInterface>=>{
        try {
            const response=await campaigns_client.get<DMARecordBaseInterface>(`/dma-records/${id}`);
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error;
            }
            throw error
        }
    },
    delete_record_by_id:async(id:number):Promise<DeleteRecordResponse>=>{
        try {
            const response=await campaigns_client.delete<DeleteRecordResponse>(`/dma-records/${id}`)
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error;
            }
            throw error;
        }
    },
    delete_records_by_audit_id:async(audit_id:string):Promise<DeleteRecordResponse>=>{
        try {
            const response=await campaigns_client.delete<DeleteRecordResponse>(`/dma-records/${audit_id}`);
            return response?.data

        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error;
            }
            throw error;
        }
    },

    search_dma_records:async({page,page_size,audit_id,campaign_code}:SearchDMAOverviewRecords):Promise<PaginatedDMARecordInterface>=>{
        
        try {
            const response=await campaigns_client.get<PaginatedDMARecordInterface>('/dma-records/search-dma-records',{
              params: {
                page: page ?? 1,
                page_size: page_size ?? 10,
                ...(audit_id?.trim()
                  ? { audit_id: audit_id.trim() }
                  : {}),
                ...(campaign_code?.trim()
                  ? { campaign_code: campaign_code.trim() }
                  : {}),
              },
            })

            return response?.data

        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error;
            }
            throw error;
        }
    }
}