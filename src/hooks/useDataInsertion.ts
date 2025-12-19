import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { data_insertion_service } from "../api/data_insertion/data_insertion";
import type {InsertEnrichedDataResponse,InsertStatusDataResponse} from "../api/data_insertion/types"



export const useInsertStatusData=()=>{

   return useMutation({
        mutationFn:(filename:string)=>data_insertion_service.insert_status_data(filename),
        onSuccess:(data:InsertStatusDataResponse)=>{
        toast.success(`number of table inserts:${data?.number_of_leads},time taken:${data?.time_taken},car table:${data?.car_table},info table ${data?.information_table}`)
    },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.detail || 'Failed to insert status data to the system')
        }
   })
}

export const useInsertEnrichedData=()=>{
    return useMutation({
            mutationFn:(filename:string)=>data_insertion_service.insert_enriched_data(filename),
            onSuccess:(data:InsertEnrichedDataResponse)=>{
            toast.success(`number of table inserts:${data?.number_of_leads},time taken:${data?.time_taken},car table:${data?.car_table},info table ${data?.information_table}`)
        },
        onError:(error:any)=>{
               toast.error(error?.response?.data?.detail || 'Failed to insert status data to the system')
           }
    })
}

