export interface create_campaign{
    campaign_name:string;
    camp_code:string;
    branch:string;
}

export interface create_campaign_response{
    id:number;
    branch:string;
    campaign_code:string;
    campaign_name:string;

}


export interface get_all_campaigns{
    total:number;
    page:number;
    page_size:number;
    results:create_campaign[]
}


export interface InfiniteResponseSchema{
    camp_code:string;
    campaign_name:string;
}
export interface PaginatedInfiniteResponse{
    total:number;
    page:number;
    page_size:number;
    results:InfiniteResponseSchema[]
}

export interface LoadCampaign{
    branch:string|null;
    camp_code:string|null;
}

export interface LoadCampaignResponse{
    camp_code:string;
    branch:string;
    list_name:string;
    audit_id:string;
    records_processed:number;
}