import { campaigns_client } from "../campaigns_client"
import type { AddDedupeListResponse,UploadPayloadSubmitDedupeReturn,SubmitDedupeReturnResponse,AddManualDedupeList,AddManualDedupeListResponse,UploadDedupeCampaignRecords,UploadDedupeCampaignRecordsResponse,PaginatedAggegatedCountResponse} from "./types"
import axios from 'axios'

export const dedupe_service={
    
    add_dedupe_list:async(camp_code:string):Promise<AddDedupeListResponse>=>{

        try {
            const response=await campaigns_client.post("/dedupes/add-dedupe-list",{
                params:{
                    camp_code:camp_code
                }
            })
            return response?.data

        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }

    },

    submit_dedupe_return:async(payload:UploadPayloadSubmitDedupeReturn):Promise<SubmitDedupeReturnResponse>=>{
        try {
            const formData=new FormData();
            formData.append("file",payload.file)
            formData.append("camp_name",payload.camp_name);
            formData.append("camp_code",payload.camp_code);
            formData.append("code",payload.code)
            const response=await campaigns_client.post("/dedupes/submit-dedupe-return",formData,{headers:{
                "Content-Type":"multipart/form-data"
            }})
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    },
    add_manual_dedupe_list:async(camp_code:string,payload:AddManualDedupeList):Promise<AddManualDedupeListResponse>=>{
        try {
            const response=await campaigns_client.post<AddManualDedupeListResponse>("/dedupes/add_manual_dedupe_list2",{filename:payload},{params:{camp_code:camp_code}})
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }

    },

    upload_dedupe_campaign_file:async(campaign_name:string,camp_code:string,file_upload:UploadDedupeCampaignRecords):Promise<UploadDedupeCampaignRecordsResponse>=>{
        try {
            const formData=new FormData()
            formData.append("dedupe_file",file_upload.dedupe_file)
            const response=await campaigns_client.post<UploadDedupeCampaignRecordsResponse>("/dedupes/load_dedupe_tracker",formData,{params:{campaign_name,camp_code},headers:{"Content-Type":"multipart/form-data"}})

            return response?.data
        } catch (error) {

            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    },
    get_aggregated_count:async(page:number=1,page_size:number=10):Promise<PaginatedAggegatedCountResponse>=>{
        try {
            const response=await campaigns_client.get<PaginatedAggegatedCountResponse>("/dedupes/campaigns/aggregated-count",{params:{page:page,page_size:page_size}})
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    },

    add_manual_dedupe_list2:async(camp_code:string,upload_file:File):Promise<any>=>{
        try {

            const formData=new FormData();

            formData.append("filename",upload_file)

            const response=await campaigns_client.post<any>("/dedupes/add-manual-dedupe-list2",formData,{params:{camp_code}})

            return response?.data

        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    }
}