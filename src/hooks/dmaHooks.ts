import { useMutation, useQueryClient,useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { dma_api } from "../api/dma/dma";
import { useDebouncedValue } from "@mantine/hooks";
import type { SearchOptions } from "../api/campaigns/types";
import type { SearchDMAOverviewRecords, PaginatedDMARecordInterface } from "../api/dma/types";

export const useGetDMARecords=(page:number,page_size:number)=>{
    return useQuery({
        queryKey:['dma-records',page,page_size],
        queryFn: ()=>dma_api.get_all_dma_records(page,page_size),
        placeholderData:keepPreviousData
    })
};

export const useGetTotalNumberOfDMARecords=()=>{
    return useQuery({
        queryKey:['dma-records'],
        queryFn:()=>dma_api.get_total_dma_records()
    })
};

export const useGetDMARecordsByCampaignCode=(page:number,page_size:number,camp_code:string)=>{
    return useQuery({
        queryKey:['dma-records',page,page_size,camp_code],
        queryFn:()=>dma_api.get_record_by_campaign_code(page,page_size,camp_code)
    })
};

export const useGetRecordById=(id:number)=>{
    return useQuery({
        queryKey:['dma-records',id],
        queryFn:()=>dma_api.get_record_by_id(id)
    })
};

export const useDeleteRecordByID=()=>{

    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(id:number)=>dma_api.delete_record_by_id(id),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['dma-records']})
            toast.success(`${data?.message}`)
        },
        onError:(error:any)=>{
            toast?.error(error?.response?.data?.detail || 'Failed to delete dma record by id')
        }
    })
};

export const useDeleteRecordByAuditId=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(audit_id:string)=>dma_api.delete_records_by_audit_id(audit_id),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['dma_records']});
            toast.success(`${data?.message}`)
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.detail||'Failed to delete dma record by audit id')
        }
    })
};

export const useSearchDMARecords = (params:  SearchDMAOverviewRecords,options:SearchOptions={debouncedMs:500,minLength:1}) => {
    const debounceMs=options?.debouncedMs??500;
    const minLength=options?.minLength??1;

    const {page=1,page_size=10,audit_id="",campaign_code=""}=params;
    const [debAuditId] = useDebouncedValue(audit_id, debounceMs);
    const [debCampaignCode] = useDebouncedValue(campaign_code, debounceMs);
    
    const da = debAuditId.trim();
    const dc = debCampaignCode.trim();

    const shouldSearch = dc.length >= minLength || dc.length >= minLength;
    
    return {
        shouldSearch,
        debounced: { audit_id: da, campaign_code: dc },
        query: useQuery<PaginatedDMARecordInterface>({

        queryKey: ["campaigns-search", page, page_size, da, dc],
        queryFn: () =>
          dma_api.search_dma_records({
            page,
            page_size,
            audit_id: da || undefined,
            campaign_code: dc || undefined,
          }),
        enabled: shouldSearch,
        placeholderData: keepPreviousData,
    }),
    }
};

