

import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import type { AddDedupeListResponse,UploadPayloadSubmitDedupeReturn,SubmitDedupeReturnResponse,AddManualDedupeList,AddManualDedupeListResponse} from "../api/dedupe_campaigns/types";

import { toast } from "react-toastify";
import { dedupe_service } from "../api/dedupe_campaigns/dedupe_campaigns";
import type { UploadDedupeCampaignRecords,UploadDedupeCampaignRecordsResponse,AddManualDedupeList2Response } from "../api/dedupe_campaigns/types";


export const useAddDedupeList=()=>{
    
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({camp_code}:{camp_code:string})=>dedupe_service.add_dedupe_list(camp_code),
        onSuccess:(data:AddDedupeListResponse)=>{
            queryClient.invalidateQueries({queryKey:['add-dedupe-list']})

            toast.success(`File Name produced:${data?.FileName},total records inserted:${data?.TotalRecordsInserted}, total batches:${data?.TotalBatches},total time taken:${data?.TotalTimeTaken} and dedupe key:${data?.DedupeKey}`)
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.detail || 'Failed to a dedupe list on the system')
        }
    })
}

export const useSubmitDedupeReturn=()=>{

    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:({payload}:{payload:UploadPayloadSubmitDedupeReturn})=>dedupe_service.submit_dedupe_return(payload),
        onSuccess:(data:SubmitDedupeReturnResponse)=>{
            queryClient.invalidateQueries({queryKey:['add-dedupe-list']})
            toast.success(`success:${data.success},deleted pending ids on campaign_dedupe table:${data?.deleted_pending_ids_from_campaign_dedupe_table} and updated ids on the main table:${data?.updated_ids_from_info_tbl}`)
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.detail || 'Failed to a dedupe list on the system')
        }
    })
}

export const useAddManualDedupeList=()=>{
    return useMutation({
        mutationFn:({camp_code,payload}:{camp_code:string,payload:AddManualDedupeList})=>dedupe_service.add_manual_dedupe_list(camp_code,payload),
        onSuccess:(data:AddManualDedupeListResponse)=>{
            toast.success(`success:${data?.success}, campaign dedupe records:${data?.campaign_dedupe_records} and dedupe key:${data?.key}`)
        },
        onError:(error:any)=>{
             toast.error(error?.response?.data?.detail || 'Failed to add manual dedupe list to the system')
        }
    })
}

export const useUploadDedupeCampaignRecords=()=>{

    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:({campaign_name,camp_code,file_upload}:{campaign_name:string,camp_code:string,file_upload:UploadDedupeCampaignRecords})=>dedupe_service.upload_dedupe_campaign_file(campaign_name,camp_code,file_upload),
        onSuccess:(data:UploadDedupeCampaignRecordsResponse)=>{
            queryClient.invalidateQueries({queryKey:["dedupes"]})
            toast.success(`${data?.message} in batches:${data?.number_of_batches} with a total records:${data?.number_of_records}`)
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.detail || 'Failed to a dedupe list on the system')
        }
    })
}

export const useGetDedupeAggregatedCount=(page:number,page_size:number)=>{
    return useQuery({
        queryKey:['dedupe',page,page_size],
        queryFn:()=>dedupe_service.get_aggregated_count(page,page_size)
    })
}



export const useAddManualDedupeList2=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:({camp_code,upload_file}:{camp_code:string,upload_file:File})=>dedupe_service.add_manual_dedupe_list2(camp_code,upload_file),
        onSuccess:(data:AddManualDedupeList2Response)=>{
            
            queryClient.invalidateQueries({queryKey:["dedupes"]})
            toast.success(`upload status:${data?.success},info table records:${data?.info_table_records},key:${data?.key}, and campaign dedupe records:${data?.campaign_dedupe_records}`)
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.detail || 'Failed to add a manual dedupe')
        }
    })
}