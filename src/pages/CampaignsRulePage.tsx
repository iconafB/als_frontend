import {Container,Title,Card,Text,Group,ActionIcon,Stack,Button,TextInput,NumberInput,Select,SimpleGrid,Modal,Textarea} from '@mantine/core';
import {IconUser,IconUserPlus,IconBriefcase} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import CampaignRulesTable from '../components/CampaignRulesTables';


const CampaignsRulesPage = () => {

  const [AssignOpened,{open:OpenAssign,close:CloseAssign}]=useDisclosure(false)

  const [changeRuleOpened,{open:ChangeRuleOpenAssign,close:ChangeRuleCloseAssign}]=useDisclosure(false)

  const [openedCreateCampaign, { open:openCreateCampaign, close:closeCreateCampaign }] = useDisclosure(false);
 
  const stats = [
    { title: 'TOTAL RULES', value: '156', icon: IconUser, color: 'blue' },
    { title: 'ASSIGNED RULES', value: '142', icon: IconUser, color: 'green' },
    { title: 'UNASSIGNED RULES', value: '12', icon: IconBriefcase, color: 'orange' },
    { title: 'CAMPAIGNS', value: '8', icon: IconUserPlus, color: 'purple' },
  ];


  const departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Analytics',
    'Sales',
    'HR',
  ];

  return (

    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>

          <Group justify="space-between" mb="lg">

            <Title order={2} c="dark">
              CAMPAIGN RULES SUMMARY
            </Title>

            <Button leftSection={<IconUserPlus size={16} />} onClick={openCreateCampaign}>
              CREATE CAMPAIGN RULE
            </Button>

             <Button leftSection={<IconUserPlus size={16} />} onClick={OpenAssign}>
              ASSIGN CAMPAIGN RULE
              </Button>

              <Button leftSection={<IconUserPlus size={16}/>} onClick={ChangeRuleOpenAssign}>
                CHANGE RULE
              </Button>
          </Group>

          <Text c="dimmed" size="sm">
            MANAGE CAMPAIGN RULES
          </Text>

        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          {stats.map((stat) => (
            <Card key={stat.title} padding="md" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                    {stat.title}
                  </Text>
                  <Text fw={700} size="xl">
                    {stat.value}
                  </Text>
                </div>

                <ActionIcon
                  color={stat.color}
                  variant="light"
                  radius="md"
                  size="xl"
                >
                  <stat.icon size={22} />
                </ActionIcon>
              </Group>

            </Card>
          ))}
        </SimpleGrid>

        <Modal opened={openedCreateCampaign} onClose={closeCreateCampaign} title="ADD NEW CAMPAIGN RULE" size="md">
          
          <form>
            <Stack gap="md">
                  <Group gap="md">
                    <Select
                      label="RULE CODE"
                      placeholder="ENTER RULE CODE"
                      flex={1}
                      required
                    />
                    <Select
                      label="CAMPAIGN CODE"
                      placeholder="CAMPAIGN CODE"
                      data={departments}
                      flex={1}
                      required
                    />
                  </Group>

                  <Group gap="md">

                  <div className='flex gap-2'>

                    <NumberInput
                      label="MINIMUM SALARY"
                      placeholder="MINIMUM SALARY"
                      step={1000}
                      required
                    />

                    <NumberInput
                      label="MAXIMUM SALARY"
                      placeholder="MAXIMUM SALARY"
                      step={1000}
                      required
                    />

                  </div>

                  </Group>
            
                  <Group gap="md">
                    <NumberInput
                      label="ENTER MINIMUM AGE"
                      placeholder="MINIMUM AGE"
                      flex={1}
                      required
                    />
                    <NumberInput
                      label="MAXIMUM AGE"
                      required
                      placeholder="ENTER MAXIMUM AGE"
                      flex={1}
                    />
                  </Group>

                  <Select
                    label="GENDER"
                    required
                    placeholder="Enter the city name"
                    data={['MALE','FEMALE']}
                  />
                  <TextInput
                    label="CITY"
                    required
                    placeholder="Enter the city name"
                  />

                  <Select
                     label="PROVINCE"
                      required
                      placeholder="Enter Province"
                      data={['KWAZULU-NATAL','GAUTENG','WESTERN CAPE','FREE STATE','LIMPOPO','EASTERN CAPE','NORTH WEST','NORTHERN CAPE']}
                  />
            
                  <Textarea
                    label="COMMENTS"
                    placeholder="COMMENTS"
                    rows={3}
                  />
            
                <Group justify="flex-end" mt="md">
                  <Button variant="subtle" color='red' onClick={closeCreateCampaign}>
                    CANCEL
                  </Button>
                  <Button onClick={()=>{console.log("Add rule")}} variant='subtle'>
                    ADD RULE
                  </Button>
                </Group>
            </Stack>
          </form>
        </Modal>

        <Modal opened={AssignOpened} onClose={CloseAssign} title="ASSIGN CAMPAIGN TO CAMPAIGN RULE" size="auto">
          {/**Assign form for campaign assignment */}
          <form>
            <Stack gap="md">
            
            <Group gap="md">

                <Select
                label="BRANCH"
                placeholder="ENTER CAMPAIGN NAME"
                data={departments}
                flex={1}
                required
                />
               <Select
                label="CAMPAIGN NAME"
                placeholder="ENTER CAMPAIGN NAME"
                data={departments}
                flex={1}
                required
                />
            </Group>
            
            <Group gap="md">
               <Select
                label="RULE CODE"
                placeholder="ENTER RULE CODE"
                data={['RULE1','RULE2','RULE3','RULE4','RULE5','RULE6','RULE7','RULE8']}
                flex={1}
                required
              />

              <Select
                label="CAMPAIGN CODE"
                placeholder="CAMPAIGN CODE"
                data={departments}
                flex={1}
                required
              />
              
            </Group>

            <Group justify='center'>
              <Button variant='subtle' color='red' onClick={CloseAssign}>
                CANCEL
              </Button>
              <Button variant='subtle' color='blue'>
                ASSIGN
              </Button>
            </Group>
            </Stack>
          </form>
        </Modal>


        <Modal opened={changeRuleOpened} onClose={ChangeRuleCloseAssign} title="CHANGE RULE FOR A CAMPAIGN" size="auto">
          <form>

            <Group>
            <Select
              label="Branch"
              placeholder='enter the branch name'
              data={['HQ','P3','INVNTDBN']}
              required
              flex={1}
            />
            <Select
              label="Campaing Name"
              placeholder='enter rule code'
              data={['CAMP1','CAMP2','CAMP3','CAMP4','CAMP5','CAMP6','CAMP7','CAMP8']}
              required
              flex={1}

            />
            </Group>
            <Group>
             
            <Select
              label="Campaign Code"
              placeholder='enter campaign code'
              data={['CAMP1','CAMP2','CAMP3','CAMP4','CAMP5','CAMP6','CAMP7','CAMP8']}
              required
              flex={1}
            />
             
            <Select
              label="Rule Code"
              placeholder='enter campaign code'
              data={['RULE1','RULE2','RULE3','RULE4','RULE5','RULE6','RULE7','RULE8']}
              required
              flex={1}
            />
            </Group>

            <div className='flex justify-center items-center mt-4'>

              <Button variant='subtle' color='red' onClick={ChangeRuleCloseAssign}>
                CANCEL
              </Button>
              <Button variant='subtle'>
                CHANGE RULE
              </Button>

            </div>

          </form>
          
        </Modal>
      </Stack>

      <Stack gap="xl">
        <CampaignRulesTable/>
      </Stack>
    </Container>

  );
};



export default CampaignsRulesPage;