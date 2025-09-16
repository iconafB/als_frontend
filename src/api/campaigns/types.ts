export interface create_campaign{
    campaign_name:string;
    campaign_code:string;
    branch:string;
}

export interface create_campaign_response{
    id:number;
    branch:string;
    campaign_code:string;
    campaign_name:string;
    created_at:string;
}