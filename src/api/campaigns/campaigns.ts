import { Search } from "lucide-react"
import { campaigns_client } from "../campaigns_client"
import type { create_campaign,create_campaign_response,get_all_campaigns,PaginatedInfiniteResponse,LoadCampaign,LoadCampaignResponse } from "./types"
import axios from "axios"

//create a campaign
//check the campaign spec level
//load a campaign
export const campaigns_api={
    //create a campaign
    create_campaign:async(data:create_campaign):Promise<create_campaign_response>=>{
        try {
            const campaign=await campaigns_client.post<create_campaign_response>('/campaigns/create-campaign',data)
            console.log(campaign.data)
            return campaign.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error?.message)
                console.log(error?.response?.data)
                //Needs attention
             
            }

            throw new Error(`error:${error}`)
           
        }
    },

    get_all_campaigns:async(page:number=1,page_size:number=10):Promise<get_all_campaigns>=>{
        try{
            const response=await campaigns_client.get('/campaigns',{params:{
                page,page_size
            }})
            console.log(response.data)
            return response.data
        }
        catch(error){
            console.log(error)
            throw new Error(`${error}`)
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
            console.log("load campaign")
            console.log(load)
            const response=await campaigns_client.post("/campaigns/load-campaign",load)
            return response.data

        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error(error?.response?.data)
                console.error(error?.response?.status)
            }
            throw new Error(`An internal server error occurred while loading for:${load.camp_code}`)
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
    }
}