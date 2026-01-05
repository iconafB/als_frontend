import { campaigns_client } from "../campaigns_client"
import type { create_campaign,create_campaign_response,get_all_campaigns,PaginatedInfiniteResponse,LoadCampaign,LoadCampaignResponse,TotalNumberOfCampaignsResponse,SearchCampaignParams } from "./types"
import axios from "axios"

//create a campaign
//check the campaign spec level
//load a campaign

export const campaigns_api={
    //create a campaign
    create_campaign:async(data:create_campaign):Promise<create_campaign_response>=>{
        try {
            const campaign=await campaigns_client.post<create_campaign_response>('/campaigns/create-campaign',data)
            return campaign.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    },
    get_all_campaigns:async(page:number=1,page_size:number=10):Promise<get_all_campaigns>=>{
        try{
            const response=await campaigns_client.get('/campaigns',{params:{
                page,page_size
            }})
            return response.data
        }
        catch(error){
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    }
    ,
    get_all_campaigns_infinite_scroll:async(page:number,page_size:number, debouncedSearch?:string):Promise<PaginatedInfiniteResponse>=>{
        try{
            const response=await campaigns_client.get("/campaigns/infinite",{params:{
                page,
                page_size,
                ...(debouncedSearch ? {searchTerm:debouncedSearch}:{})
            }})
            return response.data

        }catch(error){
           if(axios.isAxiosError(error)){
            console.error(error?.response?.data)
            console.error(error?.message)
           }
        throw new Error(`${error}`)
        }
    }
    ,
    check_campaign_spec_levels:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
        }
    },
    load_campaigns:async(load:LoadCampaign):Promise<LoadCampaignResponse>=>{
        try {
            const response=await campaigns_client.post("/campaigns/load-campaign",load)

            return response.data

        } catch (error) {
            if(axios.isAxiosError(error)){
               throw error
            }
            throw error
        }
    },
    add_dedupes_manually:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
        }
    },
    submit_dedupe_return:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
        }
    },
    get_leads_count:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
        }
    },
    get_total_number_of_campaigns:async():Promise<TotalNumberOfCampaignsResponse>=>{
        try {
            const response=await campaigns_client.get<TotalNumberOfCampaignsResponse>("/campaigns/total")
            return response?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    },
    search_campaigns: async (params: SearchCampaignParams = {}): Promise<get_all_campaigns> => {
        try {
          const campaigns = await campaigns_client.get<get_all_campaigns>(
            "/campaigns/search-campaigns",
            {
              params: {
                page: params.page ?? 1,
                page_size: params.page_size ?? 10,

                ...(params.campaign_name?.trim()
                  ? { campaign_name: params.campaign_name.trim() }
                  : {}),
                ...(params.branch?.trim()
                  ? { branch: params.branch.trim() }
                  : {}),
                ...(params.camp_code?.trim()
                  ? { camp_code: params.camp_code.trim() }
                  : {}),
              },
            }
          );

          return campaigns.data;

        } catch (error) {
          if (axios.isAxiosError(error)) throw error;
          throw error;
        }
    },
    
}