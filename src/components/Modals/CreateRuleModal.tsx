import { Modal, Button, TextInput, Select, Checkbox, NumberInput, Group, Stack,Flex } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import type { CreateRulePayload, LogicalOperator, NumericField } from '../../api/campaign_rules/types';
import { useCreateRule } from '../../hooks/useRules';

interface CreateRuleModalProps {
  opened: boolean;
  onClose: () => void;
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

export const CreateRuleModal = ({ opened, onClose }: CreateRuleModalProps) => {

  const createRule = useCreateRule();

  const { control, handleSubmit, watch, reset } = useForm<CreateRulePayload & { campaign_code: string; status: string }>({
    defaultValues: {
      campaign_code: '',
      is_deduped: false,
      salary: {
        operator: 'equal',
        value: 0,
        lower: 0,
        upper: 0,
      },
      gender: {
        operator: 'equal',
        value: 'MALE',
      },
      typedata: {
        operator: 'equal',
        value: 'Status',
      },
      is_active: {
        operator: 'equal',
        value: true,
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
      last_used: {
        operator: 'less_than',
        value: 0,
      },
      number_of_records: {
        Operator: 'equal',
        value: 0,
      },
    },
  });




  const salaryOperator = watch('salary.operator');
  const ageOperator = watch('age.operator');
  const derivedIncomeOperator = watch('derived_income.operator');

  const onSubmit = (data: CreateRulePayload & { campaign_code: string}) => {
    const { campaign_code, ...payload } = data;

    const sanitizeNumericFields=(field:NumericField)=>{
      if (field.operator==="between"){

        return {
          operator:field.operator,
          value:0,
          lower:field.lower??0,
          upper:field.upper??0
        }

      }
      return field;
    }



    const sanitizedPayload={
      ...payload,
      salary: sanitizeNumericFields(payload.salary),
      age: sanitizeNumericFields(payload.age),
      derived_income: sanitizeNumericFields(payload.derived_income)
    }

    createRule.mutate(
      { campaignCode: campaign_code, payload:sanitizedPayload },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );

  };
  

  return (
    <Modal opened={opened} onClose={onClose} title={<Flex justify="center" w="100%"> CREATE NEW CAMPAIGN RULE</Flex>} size="xl">

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Controller
            name="campaign_code"
            control={control}
            render={({ field }) => <TextInput label="Campaign Code" required {...field} />}
          />
          
          <Controller
            name="is_deduped"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Is this a dedupe campaign?"
                checked={field.value}
                onChange={(event) => field.onChange(event.currentTarget.checked)}
              />
            )}
          />

          <div>
            <h3 className="text-lg font-semibold mb-2">SALARY</h3>
            <Group grow>
              <Controller
                name="salary.operator"
                control={control}
                render={({ field }) => (
                  <Select label="RANGE" data={operatorOptions} {...field} />
                )}
              />
              {salaryOperator === 'between' ? (
                <>
                  <Controller
                    name="salary.lower"
                    control={control}
                    render={({ field }) => <NumberInput label="Minimum Salary" {...field} />}
                  />
                  <Controller
                    name="salary.upper"
                    control={control}
                    render={({ field }) => <NumberInput label="Maximum Salary" {...field} />}
                  />
                </>
              ) : (
                <Controller
                  name="salary.value"
                  control={control}
                  render={({ field }) => <NumberInput label="Salary" {...field} />}
                />
              )}
            </Group>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">AGE</h3>
            <Group grow>
              <Controller
                name="age.operator"
                control={control}
                render={({ field }) => (
                  <Select label="RANGE" data={operatorOptions} {...field} />
                )}
              />
              {ageOperator === 'between' ? (
                <>
                  <Controller
                    name="age.lower"
                    control={control}
                    render={({ field }) => <NumberInput label="Minimum Age" {...field} />}
                  />
                  <Controller
                    name="age.upper"
                    control={control}
                    render={({ field }) => <NumberInput label="Maximum Age" {...field} />}
                  />
                </>
              ) : (
                <Controller
                  name="age.value"
                  control={control}
                  render={({ field }) => <NumberInput label="Age" {...field} />}
                />
              )}
            </Group>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">DERIVED INCOME</h3>
            <Group grow>
              <Controller
                name="derived_income.operator"
                control={control}
                render={({ field }) => (
                  <Select label="RANGE" data={operatorOptions} {...field} />
                )}
              />
              {derivedIncomeOperator === 'between' ? (
                <>
                  <Controller
                    name="derived_income.lower"
                    control={control}
                    render={({ field }) => <NumberInput label="Minimum Derived Income" {...field} />}
                  />
                  <Controller
                    name="derived_income.upper"
                    control={control}
                    render={({ field }) => <NumberInput label="Maximum Derived Income" {...field} />}
                  />
                </>
              ) : (
                <Controller
                  name="derived_income.value"
                  control={control}
                  render={({ field }) => <NumberInput label="Derived Income" {...field} />}
                />
              )}
            </Group>
          </div>

          <Controller
            name="gender.value"
            control={control}
            render={({ field }) => (
              <Select
                label="GENDER"
                data={[
                  { value: 'MALE', label: 'Male' },
                  { value: 'FEMALE', label: 'Female' },
                  {value:'BOTH',label: 'BOTH'}
                ]}
                {...field}
              />
            )}
          />
          
          <Controller
            name="typedata.value"
            control={control}
            render={({ field }) => (
              <Select
                label="TYPEDATA"
                data={[
                  { value: 'STATUS', label: 'STATUS' },
                  { value: 'ENRICHED', label: 'ENRICHED' }
                ]}
                {...field}
              />
            )}
          />

          <Controller
            name="is_active.value"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Is Active"
                checked={field.value}
                onChange={(event) => field.onChange(event.currentTarget.checked)}
              />
            )}
          />

          <Controller
            name="last_used.value"
            control={control}
            render={({ field }) => <NumberInput label="LAST USED" {...field} />}
          />

          <Controller
            name="number_of_records.value"
            control={control}
            render={({ field }) => <NumberInput label="RECORDS TO SEND FOR DMA" {...field} />}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose} color='red'>
              CANCEL
            </Button>
            <Button type="submit" loading={createRule.isPending} variant='outline'>
              CREATE RULE
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
