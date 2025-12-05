import { Table, ActionIcon, Menu, Badge, Loader, Text,Button } from '@mantine/core';
import { ChevronDown, Eye, Edit, Power, PowerOff,DollarSignIcon,User2Icon,PenIcon,Trash } from 'lucide-react';
import type { NumericField, Rule } from '../../api/campaign_rules/types';
import { useActivateRule, useDeactivateRule,useDeleteCampaignRule } from '../../hooks/useRules';

interface RulesTableProps {
  rules: Rule[];
  isLoading: boolean;
  onViewRule: (rule: Rule) => void;
  onUpdateRule: (rule: Rule) => void;
  onUpdateAge:(rule:Rule)=>void;
  onUpdateLeads:(rule:Rule)=>void;
  onUpdateDerivedIncome:(rule:Rule)=>void;
  onUpdateSalary:(rule:Rule)=>void;
  onAssignRuleToCampaign:(rule:Rule)=>void;
}

export const RulesTable = ({ rules, isLoading, onUpdateRule,onUpdateAge,onUpdateLeads,onUpdateDerivedIncome,onUpdateSalary,onAssignRuleToCampaign }: RulesTableProps) => {
  
    const activateRule = useActivateRule();
    const deactivateRule = useDeactivateRule();

    const deleteRule=useDeleteCampaignRule();

    const formatNumericField = (field: NumericField) => {
    const value=field.value??0;
    const lower=field.lower??0
    const upper=field.upper??0
    if (field.operator ==="between"){
      return {lower,upper}
    }
    return {lower:value,upper:0}
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (!rules || rules.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <Text c="dimmed">NO RULES FOUND</Text>
      </div>
    );
  }



  return (
    <div className="overflow-x-auto">
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>RULE CODE</Table.Th>
            <Table.Th>CAMPAIGN CODE</Table.Th>
            <Table.Th>ACTIVE</Table.Th>
            <Table.Th>GENDER</Table.Th>
            <Table.Th>DATA USED</Table.Th>
            <Table.Th>SALARY RANGE</Table.Th>
            <Table.Th>AGE RANGE</Table.Th>
            <Table.Th>DERIVED INCOME</Table.Th>
            <Table.Th>DAYS LAST USED</Table.Th>
            <Table.Th>LEADS</Table.Th>
            <Table.Th>ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rules.map((rule) => { 
            return (
              <Table.Tr key={rule.rule_code}>
                <Table.Td>
                  <Badge size='lg'>
                     {rule.rule_code}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge size='sm'>
                     {rule.rule_name}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={rule.is_active ? 'green' : 'red'} size="sm">
                    {rule.is_active ? 'Yes' : 'No'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge>
                     {rule.gender??"None"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge>
                    {rule.typedata}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge>
                    {rule.salary?.operator=="between"?`R${rule.salary.lower} - R${rule.salary.upper}`:`R${rule.salary.value}`}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge>
                    {rule?.age?.operator=="between"?`${rule.age.lower} - ${rule.age.upper}`:rule.age.value}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge>
                    {rule?.derived_income?.operator=="between"?`R${rule?.derived_income?.lower}-R${rule?.derived_income?.upper}`:`R${rule?.derived_income?.value}`}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge> 
                    {rule.last_used} days
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge>
                    {rule.records_loaded}
                  </Badge>
                  </Table.Td>
                  
                <Table.Td>
                  <Button variant='outline'>Actions
                    <Menu shadow="md" width={300} transitionProps={{transition:'pop-top-right',duration:400,timingFunction:'ease'}} trigger='hover'>
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <ChevronDown size={22} color='green'/>
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<Eye size={16} color='orange'/>}
                          onClick={() => onAssignRuleToCampaign(rule)}
                        >
                          <Text fw={500} size='sm'>ASSIGN RULE TO CAMPAIGN</Text>
                        </Menu.Item> 
                        <Menu.Item leftSection={<PenIcon size={16} color='indigo'/>} onClick={()=>onUpdateLeads(rule)}>
                          <Text size='sm' fw={500}>UPDATE NUMBER OF LEADS</Text>
                        </Menu.Item>
                        <Menu.Item leftSection={<DollarSignIcon size={16} color='green'/>} onClick={()=>onUpdateSalary(rule)}>
                          <Text fw={500} size='sm'>UPDATE SALARY</Text>
                        </Menu.Item>
                        <Menu.Item leftSection={<User2Icon size={16} color='purple'/>} onClick={()=>onUpdateAge(rule)}>
                          <Text fw={500} size='sm'>UPDATE AGE RANGE</Text>
                        </Menu.Item>
                        <Menu.Item leftSection={<DollarSignIcon size={16} color='green'/>} onClick={()=>onUpdateDerivedIncome(rule)}>
                          <Text fw={500} size='sm'>UPDATE DERIVED INCOME</Text>
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<Edit size={16} color='green'/>}
                          onClick={() => onUpdateRule(rule)}
                        >
                          <Text fw={500} size='sm'>UPDATE RULE</Text>
                        </Menu.Item>
                      <Menu.Divider />
                      {rule.is_active ? (
                        <Menu.Item
                          leftSection={<PowerOff size={16} />}
                          color="red"
                          onClick={() => deactivateRule.mutate(rule.rule_code)}
                        >
                          DEACTIVATE RULE
                        </Menu.Item>
                      ) : (
                        <Menu.Item
                          leftSection={<Power size={16} />}
                          color="green"
                          onClick={() => activateRule.mutate(rule.rule_code)}
                        >
                          ACTIVATE RULE
                        </Menu.Item>
                      )}
                      <Menu.Item leftSection={<Trash size={16} color='red'/>} onClick={()=>deleteRule.mutate(rule.rule_code)} color='red'>
                        DELETE RULE
                      </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Button>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );

};
