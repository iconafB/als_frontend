import {Container,Title,Grid,Card,Text,Progress,Paper,Badge,Group,ActionIcon,Stack,Avatar,Button,SimpleGrid,} from '@mantine/core';


import {IconBriefcase,IconClock,IconCircleCheck,IconAlertCircle,IconUsers,IconTrendingUp,IconCalendar,IconDots,IconFiles} from '@tabler/icons-react';

import { ClipboardPlus, Filter, Settings, Target } from 'lucide-react';


const HomePage = () => {
  
  const stats = [
    { title: 'Campaigns', value: '12', icon: IconBriefcase, color: 'blue' },
    { title: 'dedupe campaigns', value: '148', icon: IconCircleCheck, color: 'green' },
    { title: 'campaigns rules', value: '24', icon: IconUsers, color: 'orange' },
    { title: 'DMA records', value: '7', icon: IconFiles, color: 'red' },
  ];

   const features = [
    {
      title: 'Campaign Management',
      description: 'Create, monitor, and optimize campaigns with advanced targeting and performance analytics.',
      icon: Target,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      actions: ['Create Campaigns', 'Load Campaigns', 'View Loaded And Created Campaigns'],
    },
    {
      title: 'Campaign Rules Engine',
      description: 'Create campaign rules, assign them to campaigns and change campaigns. View assigned and unassigned campaign rules',
      icon: Settings,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      actions: ['Create Rules', 'Change Rules', 'Assign Rules'],
    },
    {
      title: 'DMA Management',
      description: 'Upload DMA records, monitor status of submitted dma records and DMA credits remaining',
      icon: ClipboardPlus,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      actions: ['Add DMA Records', 'Monitor Added DMA Records', 'Download DMA records'],
    },
    {
      title: 'Dedupe Campaigns',
      description: 'Eliminate duplicate entries and optimize campaign reach with intelligent deduplication.',
      icon: Filter,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      actions: ['Manual Dedupe', 'View Reports', 'Configure Rules'],
    },
  ];
  

  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg">
            <Title order={2} c="dark">
              ALS DASHBOARD
            </Title>
           
          </Group>
          <Text c="dimmed" size="sm">
            Manage campaigns, set campaign rules and track dma records 
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
        <section className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h3 className='text-3xl font-bold text-gray-900 mb-4'>
                Comprehensive ALS Campaigns Tool
              </h3>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Create Campaigns,Campaign Rules,Load Campaigns, and Monitor DMA Records
              </p>

            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {features.map((feature,index)=>(
                <div key={index} className={`rounded-2xl border-2 p-8 hover:shadow-lg transition-all duration-300 ${feature.color}`}>
                  <div className='flex items-center space-x-4'>
                    <div className={`p-3 rounded-xl bg-white shadow-sm ${feature.iconColor}`}>
                      <feature.icon className='h-8 w-8'/>

                    </div>
                    <div className='flex-1'>
                      <h4 className='text-xl font-bold text-gray-900 mb-2'>
                        {feature.title}
                      </h4>
                      <p className='text-gray-600 mb-6 leading-relaxed'>
                        {feature.description}
                      </p>
                      <div className='space-y-2'>
                        {feature.actions.map((action,actionIndex)=>(
                          <div key={actionIndex} className='flex items-center space-x-2'>
                            <div className='w-1.5 h-1.5 bg-current rounded-full opacity-60'>
                            </div>
                            <span className='text-sm font-medium text-gray-700'>
                              {action}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Stack>
    </Container>
  );
};

export default HomePage;