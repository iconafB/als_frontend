import { Modal, Button, Select, Group, Stack, Text } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { useRules } from '../../hooks/useRules';
import { useMemo, useState } from 'react';

interface ChangeRuleFormData {
  current_rule: string;
  new_rule: string;
}

interface ChangeRuleModalProps {
  opened: boolean;
  onClose: () => void;
}

export const ChangeRuleModal = ({ opened, onClose }: ChangeRuleModalProps) => {
  const { control, handleSubmit, reset } = useForm<ChangeRuleFormData>({
    defaultValues: {
      current_rule: '',
      new_rule: '',
    },
  });

  const { data: rulesData } = useRules(1, 100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ruleOptions = useMemo(() => {
    return (rulesData?.rules || []).map((rule) => ({
      value: rule.rule_code.toString(),
      label: `${rule.rule_name} (Code: ${rule.rule_code})`,
    }));
  }, [rulesData]);

  const onSubmit = (data: ChangeRuleFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Changing rule:', data);
      reset();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Change Rule" size="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <div>
            <Text size="sm" fw={500} mb="xs">
              Replace an existing rule assignment with a new one.
            </Text>
          </div>

          <Controller
            name="current_rule"
            control={control}
            render={({ field }) => (
              <Select
                label="Current Rule"
                placeholder="Choose current rule to replace"
                data={ruleOptions}
                searchable
                required
                {...field}
              />
            )}
          />

          <Controller
            name="new_rule"
            control={control}
            render={({ field }) => (
              <Select
                label="New Rule"
                placeholder="Choose new rule"
                data={ruleOptions}
                searchable
                required
                {...field}
              />
            )}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Change Rule
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
