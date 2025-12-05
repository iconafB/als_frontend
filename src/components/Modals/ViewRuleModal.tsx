import { Modal, Stack, Text, Badge, Group,Container } from '@mantine/core';
import type { Rule } from '../../api/campaign_rules/types';

interface ViewRuleModalProps {
  opened: boolean;
  onClose: () => void;
  rule: Rule | null;
}

export const ViewRuleModal = ({ opened, onClose, rule }: ViewRuleModalProps) => {
  if (!rule) return null;

  const formatNumericField = (field: { operator: string; value: number; lower: number; upper: number }) => {
    if (field.operator === 'between') {
      return `${field.lower} - ${field.upper}`;
    }
    return `${field.operator}: ${field.value}`;
  };

  

  return (
    <Modal opened={opened} onClose={onClose} title="Rule Details" size="lg" centered>
      <Container>
      <Stack gap="md">

        <Group justify="center">
          <Text fw={500}>Rule Code :</Text>
          <Text>{rule.rule_code}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Rule Name:</Text>
          <Text>{rule.rule_name}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Active:</Text>
          <Badge color={rule.is_active ? 'green' : 'red'}>
            {rule.is_active ? 'Yes' : 'No'}
          </Badge>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Gender:</Text>
          <Text>{rule.gender}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Type Data:</Text>
          <Text>{rule.typedata}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Salary:</Text>
          <Text>{formatNumericField(rule.salary)}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Age:</Text>
          <Text>{formatNumericField(rule.age)}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Derived Income:</Text>
          <Text>{formatNumericField(rule.derived_income)}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Last Used:</Text>
          <Text>{rule.last_used}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Records Loaded:</Text>
          <Text>{rule.records_loaded}</Text>
        </Group>

      </Stack>
      </Container>
    </Modal>
  );
};
