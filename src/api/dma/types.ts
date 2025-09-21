
export interface CreditsResponse{
     credits:string;
    message:string;
}

export interface UploadDMARecordsResponse{
    id:number;
    audit_id:string;
    number_of_records:string;
    notification_email:string;
    is_processed:boolean;
    created_at:string;
}