import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ruleService } from '../api/campaign_rules/campaign_rules';
import type { CreateRulePayload, UpdateRulePayload,UpdateLeadsNumber,UpdateSalaryPayload,UpdateDerivedIncomePayload,UpdateAgePayload,AssignRuleToCampaignPayload } from '../api/campaign_rules/types';
import { toast } from 'react-toastify';

export const useRules = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['rules', page, pageSize],
    queryFn: () => ruleService.getRules(page, pageSize),
  });
};

export const useSearchRules = (rule_name: string, page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['rules', 'search', rule_name, page, pageSize],
    queryFn: () => ruleService.searchRules(rule_name, page, pageSize),
    enabled: rule_name.length > 0,
  });
};

export const useRuleByName = (ruleName: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['rule', ruleName],
    queryFn: () => ruleService.getRuleByName(ruleName),
    enabled,
  });
};

export const useCreateRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      campaignCode,
      payload,
    }: {
      campaignCode: string;
      payload: CreateRulePayload;
    }) => ruleService.createRule(campaignCode, payload),
    onSuccess: (data:any) => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      toast.success(`rule ${data?.rule_name} created successfully with rule code:${data?.rule_code}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Failed to create rule');
    },
  });
};


export const useUpdateLeadsNumber = () => {

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
    }: {
      payload: UpdateLeadsNumber;
    }) => ruleService.updateLeadsNumber(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      toast.success('leads number successfully updated');
    },
    onError: (error: any) => {
      toast.error(error?.response?.detail || 'Failed to update total leads');
      console.log(error)
    },
  });
};

export const useAssignRuleToCampaign=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:({payload}:{payload:AssignRuleToCampaignPayload})=>ruleService.assignRuleToCampaign(payload),
    onSuccess:(data):any=>{
      queryClient.invalidateQueries({queryKey:['rules']})
      toast.success(`message:${data.message}`)
    },
    onError:(error:any)=>{
      toast.error(error?.response?.data?.detail || 'Failed to assign campaign rule to campaign')
    }
  })
}

export const useUpdateSalary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
    }: {
      payload: UpdateSalaryPayload;
    }) => ruleService.updateSalary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      toast.success('salary successfully updated');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Failed to update salary');
    },
  });
};

export const useUpdateDerivedIncome=()=>{
  const queryClient=useQueryClient()
  return useMutation({
  mutationFn:({payload}:{payload:UpdateDerivedIncomePayload})=>ruleService.updateDerivedIncome(payload),
  onSuccess:()=>{
    queryClient.invalidateQueries({queryKey:['rules']})
    toast.success("Derived income updated successfully")
  },
  onError:(error:any)=>{
    toast.error(error?.response?.data?.detail || 'Failed to update derived income')
  }
 })
};

export const useUpdateAge=()=>{
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn:({payload}:{payload:UpdateAgePayload})=>ruleService.updateAge(payload),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['rules']})
      toast.success("Age updated successfully")
    },
    onError:(error:any)=>{
      toast.error(error?.response?.data?.detail ||'Failed to update age')
    }
  })
}

export const useUpdateRule = () => {
  
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ruleCode, payload }: { ruleCode: number; payload: UpdateRulePayload }) =>
      ruleService.updateRule(ruleCode, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      toast.success('Rule updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Failed to update rule');
    },
  });
};


export const useActivateRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ruleCode: number) => ruleService.activateRule(ruleCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      toast.success('Rule activated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Failed to activate rule');
    },
  });
};

export const useDeactivateRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ruleCode: number) => ruleService.deactivateRule(ruleCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
      toast.success('Rule deactivated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Failed to deactivate rule');
    },
  });
};

export const useDeleteCampaignRule=()=>{
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn:(rule_code:number)=>ruleService.deleteCampaignRule(rule_code),
    onSuccess:(data)=>{
      queryClient.invalidateQueries({queryKey:['rules']})
      toast.success(`${data.message}`)
    },
    onError:(error:any)=>{
      toast.error(error?.response?.data?.detail || 'Failed to delete campaign rule from the system')
    }
  })
}



export const useTotalCampaignRules=()=>{
       return useQuery({
          queryKey:['rules'],
          queryFn: ()=>ruleService.totalCampaignRules()
      })
  }
  
