import { useState, useEffect } from 'react';
import { Button, TextInput, Container, Title, Group, Pagination, Stack } from '@mantine/core';
import { Plus, Search } from 'lucide-react';
import { useDisclosure, useDebouncedValue } from '@mantine/hooks';
import { RulesTable } from '../Tables/RulesTable';
import { CreateRuleModal } from '../Modals/CreateRuleModal';
import { UpdateRuleModal } from '../Modals/UpdateRuleModal';
import { ViewRuleModal } from '../Modals/ViewRuleModal';
import { AssignRuleToCampaignModal } from '../Modals/AssignRuleModal';
import { UpdateLeadsModal } from '../Modals/UpdateLeadsModal';
import { UpdateSalaryModal } from '../Modals/UpdateSalaryModal';
import { UpdateDerivedIncomeModal } from '../Modals/UpdateDerivedIncomeModal';
import { useRules, useSearchRules } from '../../hooks/useRules';
import type { Rule } from '../../api/campaign_rules/types';
import { UpdateAgeModal } from '../Modals/UpdateAgeModal';


export const RulesPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchQuery, 500);
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [updateModalOpened, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
  
  const [assignModalOpened, { open: openAssignModal, close: closeAssignModal }] = useDisclosure(false);
  //const [changeModalOpened, { open: openChangeModal, close: closeChangeModal }] = useDisclosure(false);
  const [updateLeadsOpened,{open:openUpdateLeadsModal,close:closeUpdateLeadsModal}]=useDisclosure(false);
  const [updateSalaryOpened,{open:openUpdateSalaryModal,close:closeUpdateSalaryModal}]=useDisclosure(false)
  const [updateDerivedIncomeOpened,{open:openDerivedIncomeModal,close:closeDerivedIncomeModal}]=useDisclosure(false)
  
  const [updateAgeOpened,{open:openAgeModal,close:closeAgeModal}]=useDisclosure(false)
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  const { data: rulesData, isLoading: isLoadingRules } = useRules(page, pageSize);
  const { data: searchData, isLoading: isSearching } = useSearchRules(
    debouncedSearch,
    page,
    pageSize
  );


  const isSearching_ = debouncedSearch.length > 0;
  const data = isSearching_ ? searchData : rulesData;
  const isLoading = isSearching_ ? isSearching : isLoadingRules;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleViewRule = (rule: Rule) => {
    setSelectedRule(rule);
    openViewModal();
  };

  const handleAgeUpdate=(rule:Rule)=>{
    setSelectedRule(rule);
    openAgeModal();
  }

  const handleViewUpdateSalary=(rule:Rule)=>{
    setSelectedRule(rule);
    openUpdateSalaryModal()
  }
  const handleUpdateLeads=(rule:Rule)=>{
    setSelectedRule(rule);
    openUpdateLeadsModal();
  }

  const handleUpdateRule = (rule: Rule) => {
    setSelectedRule(rule);
    openUpdateModal();
  };

  const handleDerivedIncome=(rule:Rule)=>{
    setSelectedRule(rule);
    openDerivedIncomeModal();
  };

  const handleAssignRuleToCampaign=(rule:Rule)=>{
    setSelectedRule(rule);
    openAssignModal();
  };

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  return (

    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Rules Management</Title>
          <Group gap="sm">
            <Button leftSection={<Plus size={16} />} onClick={openCreateModal} variant='outline'>
              Create Rule
            </Button>
            {/* <Button variant="default" onClick={openAssignModal}>
              Assign Rule
            </Button>
            <Button variant="default" onClick={openChangeModal}>
              Change Rule
            </Button> */}

          </Group>
        </Group>

        <TextInput
          placeholder="Search by rule name, salary, or derived income..."
          leftSection={<Search size={16} />}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          size="md"
        />

        <RulesTable
          rules={data?.rules || []}
          isLoading={isLoading}
          onViewRule={handleViewRule}
          onUpdateRule={handleUpdateRule}
          onUpdateLeads={handleUpdateLeads}
          onUpdateSalary={handleViewUpdateSalary}
          onUpdateDerivedIncome={handleDerivedIncome}
          onUpdateAge={handleAgeUpdate}
          onAssignRuleToCampaign={handleAssignRuleToCampaign}

        />

        {totalPages > 1 && (
          <Group justify="center">
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Group>
        )}
      </Stack>
      <CreateRuleModal opened={createModalOpened} onClose={closeCreateModal} />
      {selectedRule && (
        <>
          <UpdateRuleModal
            opened={updateModalOpened}
            onClose={closeUpdateModal}
            ruleCode={selectedRule.rule_code}
            initialData={{
              rule_name: selectedRule.rule_name,
              salary: selectedRule.salary,
              derived_income: selectedRule.derived_income,
              age: selectedRule.age,
            }}
          />
          <ViewRuleModal opened={viewModalOpened} onClose={closeViewModal} rule={selectedRule} />
          <UpdateLeadsModal opened={updateLeadsOpened} onClose={closeUpdateLeadsModal} rule={selectedRule}/>
          <UpdateSalaryModal opened={updateSalaryOpened} onClose={closeUpdateSalaryModal} rule={selectedRule}/>
          <UpdateDerivedIncomeModal opened={updateDerivedIncomeOpened} onClose={closeDerivedIncomeModal} rule={selectedRule}/>
          <UpdateAgeModal opened={updateAgeOpened} onClose={closeAgeModal} rule={selectedRule}/>
          <AssignRuleToCampaignModal opened={assignModalOpened} onClose={closeAssignModal} rule={selectedRule}/>
        </>
      )}
    </Container>
  );

  
};




