import { Modal, Button, TextInput, Select, NumberInput, Group, Stack } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import type { LogicalOperator, NumericField, UpdateRulePayload } from '../../api/campaign_rules/types';
import { useUpdateRule } from '../../hooks/useRules';

import { useEffect } from 'react';

interface UpdateRuleModalProps {
  opened: boolean;
  onClose: () => void;
  ruleCode: number;
  initialData?: {
    rule_name: string;
    salary: NumericField;
    derived_income: NumericField;
    age: NumericField;
  };
}

const operatorOptions: { value: LogicalOperator; label: string }[] = [
  { value: 'equal', label: 'Equal' },
  { value: 'not_equal', label: 'Not Equal' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than_equal', label: 'Less Than or Equal' },
  { value: 'greater_than_equal', label: 'Greater Than or Equal' },
  { value: 'between', label: 'Between' },
];

export const UpdateRuleModal = ({ opened, onClose, ruleCode, initialData }: UpdateRuleModalProps) => {
  
  const updateRule = useUpdateRule();

  const { control, handleSubmit, watch, reset } = useForm<UpdateRulePayload & { rule_name: string }>({
    defaultValues: {
      rule_name: '',
      salary: {
        operator: 'equal',
        value: 0,
        lower: 0,
        upper: 0,
      },
      age: {
        operator: 'equal',
        value: 0,
        lower: 0,
        upper: 0,
      },
      derived_income: {
        operator: 'equal',
        value: 0,
        lower: 0,
        upper: 0,
      },
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const salaryOperator = watch('salary.operator');
  const ageOperator = watch('age.operator');
  const derivedIncomeOperator = watch('derived_income.operator');

  const onSubmit = (data: UpdateRulePayload & { rule_name: string }) => {
    updateRule.mutate(
      { ruleCode, payload: data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (

    <Modal opened={opened} onClose={onClose} title="Update Rule" size="xl">

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Controller
            name="rule_name"
            control={control}
            render={({ field }) => <TextInput label="Rule Name" {...field} />}
          />

          <div>
            <h3 className="text-lg font-semibold mb-2">Salary</h3>
            <Group grow>
              <Controller
                name="salary.operator"
                control={control}
                render={({ field }) => (
                  <Select label="Operator" data={operatorOptions} {...field} />
                )}
              />
              {salaryOperator === 'between' ? (
                <>
                  <Controller
                    name="salary.lower"
                    control={control}
                    render={({ field }) => <NumberInput label="Lower Bound" {...field} />}
                  />
                  <Controller
                    name="salary.upper"
                    control={control}
                    render={({ field }) => <NumberInput label="Upper Bound" {...field} />}
                  />
                </>
              ) : (
                <Controller
                  name="salary.value"
                  control={control}
                  render={({ field }) => <NumberInput label="Value" {...field} />}
                />
              )}
            </Group>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Age</h3>
            <Group grow>
              <Controller
                name="age.operator"
                control={control}
                render={({ field }) => (
                  <Select label="Operator" data={operatorOptions} {...field} />
                )}
              />
              {ageOperator === 'between' ? (
                <>
                  <Controller
                    name="age.lower"
                    control={control}
                    render={({ field }) => <NumberInput label="Lower Bound" {...field} />}
                  />
                  <Controller
                    name="age.upper"
                    control={control}
                    render={({ field }) => <NumberInput label="Upper Bound" {...field} />}
                  />
                </>
              ) : (
                <Controller
                  name="age.value"
                  control={control}
                  render={({ field }) => <NumberInput label="Value" {...field} />}
                />
              )}
            </Group>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Derived Income</h3>
            <Group grow>
              <Controller
                name="derived_income.operator"
                control={control}
                render={({ field }) => (
                  <Select label="Operator" data={operatorOptions} {...field} />
                )}
              />
              {derivedIncomeOperator === 'between' ? (
                <>
                  <Controller
                    name="derived_income.lower"
                    control={control}
                    render={({ field }) => <NumberInput label="Lower Bound" {...field} />}
                  />
                  <Controller
                    name="derived_income.upper"
                    control={control}
                    render={({ field }) => <NumberInput label="Upper Bound" {...field} />}
                  />
                </>
              ) : (
                <Controller
                  name="derived_income.value"
                  control={control}
                  render={({ field }) => <NumberInput label="Value" {...field} />}
                />
              )}
            </Group>
          </div>

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={updateRule.isPending}>
              Update Rule
            </Button>
          </Group>
        </Stack>
                
      </form>
    </Modal>
  );
};
