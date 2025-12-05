export type LogicalOperator =
  | 'equal'
  | 'not_equal'
  | 'less_than'
  | 'greater_than'
  | 'less_than_equal'
  | 'greater_than_equal'
  | 'between';

export interface NumericField {
  operator: LogicalOperator;
  value?: number;
  lower?: number;
  upper?: number;
}

export interface GenderField {
  operator: 'equal';
  value: 'MALE' | 'FEMALE' | 'BOTH';
}

export interface TypeDataField {
  operator: 'equal';
  value: string;
}

export interface IsActiveField {
  operator: 'equal';
  value: boolean;
}

export interface LastUsedField {
  operator: LogicalOperator;
  value: number;
}

export interface NumberOfRecordsField {
  Operator: LogicalOperator;
  value: number;
}

export interface CreateRulePayload {
  salary: NumericField;
  gender: GenderField;
  typedata: TypeDataField;
  is_active: IsActiveField;
  age: NumericField;
  derived_income: NumericField;
  is_deduped: boolean;
  last_used: LastUsedField;
  number_of_records: NumberOfRecordsField;
}

export interface Rule {
  rule_code: number;
  rule_name: string;
  salary: NumericField;
  derived_income: NumericField;
  age: NumericField;
  gender: string;
  typedata: string;
  is_active: boolean;
  last_used: number;
  records_loaded: number;
}

export interface PaginatedRulesResponse {
  total: number;
  page: number;
  page_size: number;
  rules: Rule[];
}

export interface UpdateRulePayload {
  rule_name?: string;
  salary?: NumericField;
  derived_income?: NumericField;
  age?: NumericField;
}


export interface ChangeRuleResponse{
  success:string;
  message:string;
}

export interface UpdateLeadsNumber{
  rule_code:number;
  number_of_leads:number;
}

export interface UpdateLeadsNumberResponse{
  number_of_leads:number;

}

export interface UpdateSalaryPayload{
  rule_code:number;
  salary?:number;
  lower_limit_salary?:number;
  upper_limit_salary?:number;
}


export interface UpdateAge{
  age_value:number;
  age_lower_limit:number;
  age_upper_limit:number;
}

export interface UpdateDerivedIncomePayload{
  rule_code:number;
  derived_income_value?:number;
  lower_limit_derived_income?:number;
  upper_limit_derived_income?:number;
}


export interface UpdateAgePayload{
  rule_code:number;
  age_value:number;
  age_lower_limit:number;
  age_upper_limit:number;
}


export interface ChangeRulePayload{
  rule_code:number;
  camp_code:string;
}


export interface ChangeRuleResponse{
  message:string;
}


export interface AssignRuleToCampaignPayload{
  rule_code:number;
  camp_code:string;
}


export interface DeleteCampaignRuleResponse{
  message:string;
  succes:boolean;
}