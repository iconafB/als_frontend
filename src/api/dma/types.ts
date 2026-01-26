
export interface CreditsResponse{
    credits:string;
}

export interface UploadDMARecordsResponse{
    id:number;
    audit_id:string;
    number_of_records:string;
    notification_email:string;
    is_processed:boolean;
    created_at:string;
}


export interface DMARecordBaseInterface{
    pk:number;
    audit_id:string;
    number_of_records:number;
    notification_email:string;
    camp_code:string;
    dedupe_status:string;
    created_at:string;
    is_processed:boolean;
}

export interface PaginatedDMARecordInterface{
    page:number;
    page_size:number;
    total:number;
    results:DMARecordBaseInterface[];
}

export interface TotalNumberOfDMARecords{
    total_number_of_records:number
}

export interface DeleteRecordResponse{
    message:string;
    message_status:boolean;
}


export interface SearchDMAOverviewRecords{
    page?:number;
    page_size?:number;
    audit_id?:string;
    campaign_code?:string;
}
