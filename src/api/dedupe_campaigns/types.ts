export interface AddDedupeListResponse{
    FileName:string;
    TotalRecordsInserted:number;
    TotalBatches:number;
    TotalBatchedTime:number;
    TotalTimeTaken:number;
    DedupeKey:string;
}



export interface SubmitDedupeReturn{
    camp_name:string;
    camp_code:string;
    code:string
}


export interface UploadPayloadSubmitDedupeReturn extends SubmitDedupeReturn{
    file:File;
}

export  interface SubmitDedupeReturnResponse{
    success:boolean;
    updated_ids_with_return_status:number;
    retrieved_pending_ids_from_campaign_dedupe_table:number;
    deleted_pending_ids_from_campaign_dedupe_table:number;
    updated_ids_from_info_tbl:number;
    deleted_pending_ids_with_status_code_u:number;
}

export interface AddManualDedupeList{
    file:File;
}


export interface AddManualDedupeListResponse{
    success:boolean;
    campaign_dedupe_records:number;
    key:number
}

export interface UploadDedupeCampaignRecords{
    dedupe_file:File;
}

export interface UploadDedupeCampaignRecordsResponse{
    message:string;
    number_of_batches:number;
    number_of_records:number;
}

export interface AddManualDedupeList2Response{
    success:boolean;
    campaign_dedupe_records:number;
    info_table_records:number;
    key:number;
}


export interface AggregatedCountRecords{
    campaign_name:string;
    record_count:number
}

export interface PaginatedAggegatedCountResponse{
    page:number;
    page_size:number;
    total:number;
    total_pages:number;
    records:AggregatedCountRecords[]
}

