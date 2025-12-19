import { campaigns_client } from "../campaigns_client"
import axios from "axios";
import type { CreateRulePayload, PaginatedRulesResponse, Rule, UpdateRulePayload,ChangeRuleResponse,UpdateLeadsNumber, UpdateLeadsNumberResponse,UpdateSalaryPayload, UpdateDerivedIncomePayload,UpdateAgePayload,ChangeRulePayload,DeleteCampaignRuleResponse,AssignRuleToCampaignResponse, TotalNumberOfCampaignRulesResponse } from './types';


export const ruleService = {
  createRule: async (campaignCode: string,payload: CreateRulePayload): Promise<Rule> => {
    const response = await campaigns_client.post('/campaign_rules', payload, {
      params: {
        campaign_code: campaignCode
      },
    });
    return response.data;
  },

  getRules: async (page: number = 1, pageSize: number = 10): Promise<PaginatedRulesResponse> => {
    const response = await campaigns_client.get('/campaign_rules', {
      params: {
        page,
        page_size: pageSize,
      },
    });
    return response.data;

  },

  searchRules: async (
    query: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedRulesResponse> => {
    const response = await campaigns_client.get('/campaign_rules/search', {
      params: {
        rule_name: query,
        page,
        page_size: pageSize,
      },
    });
    return response.data;
  },

  getRuleByName: async (rule_name: string): Promise<Rule> => {
    const response = await campaigns_client.get(`/campaign_rules/${rule_name}`);
    return response.data;
  },

  updateRule: async (rule_code: number, payload: UpdateRulePayload): Promise<Rule> => {
    const response = await campaigns_client.patch(`/campaign_rules/${rule_code}`, payload);
    return response.data;
  },

  activateRule: async (rule_code: number): Promise<Rule> => {
    const response = await campaigns_client.patch(`/campaign_rules/${rule_code}/activate`);
    return response.data;
  },

  deactivateRule: async (rule_code: number): Promise<Rule> => {
    const response = await campaigns_client.patch(`/campaign_rules/${rule_code}/deactivate`);
    return response.data;
  },
  assignRule:async(rule_code:number,camp_code:string):Promise<ChangeRuleResponse>=>{

    const response = await campaigns_client.put(`/campaign_rules/change_rule`,{
      params:{
        rule_code:rule_code,
        camp_code:camp_code
      }
    })

    return response.data
  },

  updateLeadsNumber:async(payload:UpdateLeadsNumber):Promise<UpdateLeadsNumberResponse>=>{
    try {
        const response=await campaigns_client.patch(`/campaign_rules/update-leads/${payload.rule_code}`,payload)
        return response.data
    } catch (error) {
      console.log(error)
      if(axios.isAxiosError(error)){
        const err_message=error?.response?.data
        console.log(err_message)

      }
      throw new Error('Error')
    }
  },

  updateSalary:async(payload:UpdateSalaryPayload):Promise<any>=>{
    try{
      const {rule_code,...rest_of_payload}=payload
      const response=await campaigns_client.patch(`/campaign_rules/salary/${rule_code}`,rest_of_payload)
      return response.data

    }
    catch(error){
      if(axios.isAxiosError(error)){
        console.log(error?.response?.data)
        console.log(error?.response?.status)
        console.log(error?.response?.statusText)
      }
      throw new Error('An internal server error occurred while updating the salary')
    }
  },

  updateDerivedIncome:async(payload:UpdateDerivedIncomePayload):Promise<any>=>{
    try {
      const {rule_code,...rest_of_payload}=payload
      const response=await campaigns_client.patch(`/campaign_rules/derived_income/${rule_code}`,rest_of_payload)
      return response.data

      
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.error(error?.response?.data)
        console.error(error?.response?.request)
      }
      throw new Error('An error occurred while updating the derived income')
    }
  },

  updateAge:async(payload:UpdateAgePayload):Promise<any>=>{
    try {
      const {rule_code,...rest_of_payload}=payload
      const response=await campaigns_client.patch(`/campaign_rules/update-age/${rule_code}`,rest_of_payload)
      return response.data
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error?.response?.data)
        console.log(error?.response?.status)
      }
    }
  },

  assignRuleToCampaign:async(payload:ChangeRulePayload):Promise<AssignRuleToCampaignResponse>=>{
    try {
        const response=await campaigns_client.put('campaign_rules/als/change_rule',undefined,{params:{
        rule_code:payload.rule_code,
        camp_code:payload.camp_code
      }})
      return response.data
    } catch (error) {
      if(axios.isAxiosError(error)){
        throw error
      }
      throw error
    }
  },
  
  deleteCampaignRule:async(rule_code:number):Promise<DeleteCampaignRuleResponse>=>{
    try {
      const response=await campaigns_client.delete(`/campaign_rules/delete/${rule_code}`)
      return response.data
    } catch (error) {
      if(axios.isAxiosError(error)){
        throw error
      }
      throw error
    }
  },

  totalCampaignRules:async():Promise<TotalNumberOfCampaignRulesResponse>=>{
    try {
      const response=await campaigns_client.get<TotalNumberOfCampaignRulesResponse>("/campaign_rules/total")
      return response?.data
    } catch (error) {
      if(axios.isAxiosError(error)){
        throw error
      }
      throw error
    }
  }

};



