import { campaigns_client } from "../campaigns_client"
import type { InsertEnrichedDataResponse,InsertStatusDataResponse } from "./types"
import axios from "axios"



export const data_insertion_service={

    insert_status_data:async(filename:string):Promise<InsertStatusDataResponse>=>{
        try {
            const response=await campaigns_client.post<InsertEnrichedDataResponse>("/insert-data/status-data",{},{params:{filename:filename}})
            return response?.data

        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    },
    insert_enriched_data:async(filename:string):Promise<InsertEnrichedDataResponse>=>{
        try {
            const response=await campaigns_client.post<InsertEnrichedDataResponse>("/insert-data/enriched_data",{},{params:{filename:filename}})

            return response?.data
            
        } catch (error) {
            if(axios?.isAxiosError(error)){
                throw error
            }
            throw error
        }
    }


}