import { campaigns_client } from "../campaigns_client"
import type { create_campaign,create_campaign_response } from "./types"

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
            console.log('print the error occurred')
            console.error(error)
            throw new Error(`error:${error}`)
        }
    },
    check_campaign_spec_levels:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
        }
    },
    load_campaigns:async(data:any):Promise<any>=>{
        try {
            
        } catch (error) {
            
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