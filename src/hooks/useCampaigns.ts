import { useMutation, useQueryClient,useQuery,keepPreviousData } from "@tanstack/react-query";
import type { create_campaign,create_campaign_response,get_all_campaigns,LoadCampaign,LoadCampaignResponse,SearchCampaignParams,SearchOptions} from "../api/campaigns/types";
import { toast } from "react-toastify";
import { campaigns_api } from "../api/campaigns/campaigns";
import { useDebouncedValue } from "@mantine/hooks";

export const useFetchCampaigns=(page:number,page_size:number)=>{
    return useQuery({
        queryKey:['campaigns',page,page_size],
        queryFn: ()=>campaigns_api.get_all_campaigns(page,page_size)
    })
};

export const useCreateCampaign=()=>{

    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:({data}:{data:create_campaign})=>campaigns_api.create_campaign(data),
        onSuccess:(data:create_campaign_response)=>{
            queryClient.invalidateQueries({queryKey:['campaigns']});
            toast.success(`campaign:${data.campaign_name},campaign code:${data.camp_code},branch:${data.branch} created`)
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
};


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
};


export const useFetchTotalCampaigns=()=>{
     return useQuery({
        queryKey:['campaigns'],
        queryFn: ()=>campaigns_api.get_total_number_of_campaigns()
    })
};


export const useSearchCampaigns = (params: SearchCampaignParams,options:SearchOptions={debouncedMs:500,minLength:1}) => {
    const debounceMs=options?.debouncedMs??500;
    const minLength=options?.minLength??1;
    const {page=1,page_size=10,campaign_name="",camp_code="",branch=""}=params;
    const [debCampaignName] = useDebouncedValue(campaign_name, debounceMs);
    const [debBranch] = useDebouncedValue(branch, debounceMs);
    const [debCampCode] = useDebouncedValue(camp_code, debounceMs);
    const dc = debCampaignName.trim();
    const db = debBranch.trim();
    const dcc = debCampCode.trim();

    const shouldSearch = dc.length >= minLength || db.length >= minLength || dcc.length >= minLength;

    return {
        shouldSearch,
        debounced: { campaign_name: dc, branch: db, camp_code: dcc },
        query: useQuery<get_all_campaigns>({
        queryKey: ["campaigns-search", page, page_size, dc, db, dcc],
        queryFn: () =>
          campaigns_api.search_campaigns({
            page,
            page_size,
            campaign_name: dc || undefined,
            branch: db || undefined,
            camp_code: dcc || undefined,
          }),
        enabled: shouldSearch,
        placeholderData: keepPreviousData,
    }),
    }
};

