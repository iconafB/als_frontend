import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query";
import type { create_campaign,create_campaign_response,LoadCampaign,LoadCampaignResponse} from "../api/campaigns/types";
import { toast } from "react-toastify";
import { campaigns_api } from "../api/campaigns/campaigns";

export const useFetchCampaigns=(page:number,page_size:number)=>{
    return useQuery({
        queryKey:['campaigns',page,page_size],
        queryFn: ()=>campaigns_api.get_all_campaigns(page,page_size)
    })
}

export const useCreateCampaign=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:({data}:{data:create_campaign})=>campaigns_api.create_campaign(data),
        onSuccess:(data:create_campaign_response)=>{
            queryClient.invalidateQueries({queryKey:['campaigns']});
            toast.success(`campaign:${data.campaign_name} with campaign code:${data.camp_code} created for branch:${data.branch}`)
        },
        onError:(error:any)=>{
           if(error?.response && error?.response?.data){
            const message=error?.response?.data?.detail || error?.response?.data?.message
            toast.error(`Error:${message}`)
           }else{
            toast.error("An unexpected error occurred")
           }
        }

    })
}


export const useLoadCampaign=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:({data}:{data:LoadCampaign})=>campaigns_api.load_campaigns(data),
        onSuccess:(data:LoadCampaignResponse)=>{
            queryClient.invalidateQueries()
            toast.success(`campaign:${data.camp_code},branch:${data.branch},list name:${data.list_name} and records:${data?.records_processed} sent for dma`)
        },
        onError:(error:any)=>{
           if(error?.response && error?.response?.data){
            const message=error?.response?.data?.detail || error?.response?.data?.message
            toast.error(`Error:${message}`)
           }else{
            toast.error("An unexpected error occurred")
           }
        }
    })
}


export const useFetchTotalCampaigns=()=>{
     return useQuery({
        queryKey:['campaigns'],
        queryFn: ()=>campaigns_api.get_total_number_of_campaigns()
    })
}



