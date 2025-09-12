import React,{useState} from 'react';
import { Button, Text, Group, Avatar, Stack,AppShell, ActionIcon,Tabs,Tooltip,Menu, rem,Badge, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {notifications} from '@mantine/notifications'

// import { LogOut, User, Mail, Divide } from 'lucide-react';

import {IconBell,IconDownload,IconRefresh,IconFilter,IconSearch,IconPlus ,IconBriefcase, IconCalendar, IconCalendarEvent, IconLogout, IconMenu2, IconSchool, IconSettings, IconUser} from '@tabler/icons-react'

import EducationPage from '../pages/EducationPage';
import EventsPage from '../pages/EventsPage';
import ProfilesPage from '../pages/ProfilesPage';
import WorkPage from '../pages/WorkPage';



type PageType='work'|'events'|'education'|'profiles'

export const Dashboard: React.FC = () => {

  const [opened,{toggle}]=useDisclosure(false)

  const [activePage, setActivePage] = useState<PageType>('work')


  const handleLogout=()=>{

    notifications.show({
      title:'Logged Out',
      message:'You have been logged out',
      color: 'blue'
    })

  }

   const handleSidebarAction = (action: string, page: PageType) => {
    notifications.show({
      title: `${action} - ${page.charAt(0).toUpperCase() + page.slice(1)}`,
      message: `${action} action triggered for ${page} page`,
      color: 'green',
    });
  };


    const sidebarActions = [
    { icon: IconPlus, label: 'Create New', color: 'blue' },
    { icon: IconSearch, label: 'Search', color: 'green' },
    { icon: IconFilter, label: 'Filter', color: 'orange' },
    { icon: IconDownload, label: 'Export', color: 'purple' },
    { icon: IconRefresh, label: 'Refresh', color: 'teal' },
  ];


    const renderPage = () => {
    switch (activePage) {
      case 'work':
        return <WorkPage />;
      case 'events':
        return <EventsPage />;
      case 'education':
        return <EducationPage />;
      case 'profiles':
        return <ProfilesPage />;
      default:
        return <WorkPage />;
    }
    };

  return (
  
        <AppShell
          header={{height:70}}
          navbar={{
            width:280,
            breakpoint:'sm',
            collapsed:{mobile:!opened}
          }}
          padding="md"
        >
          <div className='p-40'>
            <AppShell.Header>
              <Group h="100%" justify='space-between'>
                <Group>
                  <ActionIcon variant='subtle' color='gray' onClick={toggle} hiddenFrom='sm'>
                    <IconMenu2 size={18}/>
                  </ActionIcon>
                    <Text size="xl" fw={700} c="blue">
                      ALS Dashboard
                    </Text>
                </Group>
              <Tabs
                value={activePage}
                onChange={(value)=>setActivePage(value as PageType)}
                variant='pills'
                visibleFrom='xs'

              >
                <Tabs.List>
                  <Tabs.Tab value='work' leftSection={<IconBriefcase size={16}/>}>
                    Campaigns
                  </Tabs.Tab>
                  <Tabs.Tab value='events' leftSection={<IconCalendar size={16}/>}>
                    Campaign Rules
                  </Tabs.Tab>
                  <Tabs.Tab value='education' leftSection={<IconSchool size={16}/>}>
                    DMA
                  </Tabs.Tab>
                  <Tabs.Tab value='profiles' leftSection={<IconUser size={16}/>}>
                    Profiles
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
              <Group gap="sm">
                <Tooltip label="Notifications">
                  <ActionIcon  variant='subtle' color='gray'>
                    <IconBell size={18}/>
                  </ActionIcon>
                </Tooltip>
                <Menu shadow='md' width={200}>
                  <Menu.Target>
                     <Avatar
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
                        alt="User Avatar"
                        size="sm"
                        style={{ cursor: 'pointer' }}
                      />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>
                      Application
                    </Menu.Label>
                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                        Settings
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item
                      color="red"
                      leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                      onClick={handleLogout}
                      >
                        Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <Stack gap="lg">
              <div>
                <Text size='sm' fw={500} c="dimmed" mb="xs">
                  NAVIGATION
                </Text>
                <Stack gap="xs">
                  <Button 
                     variant={activePage === 'work' ? 'filled' : 'subtle'}
                      leftSection={<IconBriefcase size={16} />}
                      justify="flex-start"
                      onClick={() => setActivePage('work')}
                      fullWidth
                  >
                    Campaigns
                  </Button>
                  <Button
                    variant={activePage === 'events' ? 'filled' : 'subtle'}
                    leftSection={<IconCalendarEvent size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('events')}
                    fullWidth
                    >
                    Events
                    <Badge size="xs" ml="auto">
                      3
                    </Badge>
                  </Button>
                  <Button
                    variant={activePage === 'education' ? 'filled' : 'subtle'}
                    leftSection={<IconSchool size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('education')}
                    fullWidth
                  >
                    Education
                  </Button>
                  <Button
                    variant={activePage === 'profiles' ? 'filled' : 'subtle'}
                    leftSection={<IconUser size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('profiles')}
                    fullWidth
                    >
                    Profiles
                  </Button>
                </Stack>
              </div>
              <Divider/>
              <div>
                <Text size='sm' fw={500} c="dimmed" mb="xs">
                  QUCIK ACTIONS
                </Text>
                <Stack gap="xs">
                  {
                    sidebarActions.map((action)=>(
                      <Button key={action.label} variant='subtle' color={action.color} leftSection={<action.icon size={16}/>} justify='flex-start' onClick={() => handleSidebarAction(action.label, activePage)} fullWidth size="sm">
                        {action.label}
                      </Button>
                    ))
                  }
                </Stack>
              </div>
              <Divider/>
              <div>
                <Text size="sm" fw={500} c="dimmed" mb="xs">
                  Recent Activity
                </Text>
                <Stack gap="xs">
                  <Text size='xs' c="dimmed">
                    Project Alpha Updated
                  </Text>
                   <Text size='xs' c="dimmed">
                    Meeting Scheduled
                  </Text>
                   <Text size='xs' c="dimmed">
                    Course Completed
                  </Text>
                </Stack>
              </div>
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main>
            {renderPage()}
          </AppShell.Main>
        </div>
          


      {/*     <AppShell.Header variant='subtle' color='gray' onClick={toggle} hiddenFrom='sm'>
            <Group h="100%" px="md" justify='space-between'>
              
              <Group>
                <ActionIcon variant='subtle' color='gray' onClick={toggle} hiddenFrom='sm'>
                  <IconMenu2 size={18}/>
                </ActionIcon>
                <Text size='xl' fw={700} c="blue">
                  Dashboard
                </Text>
              </Group>

              <Tabs
                value={activePage}
                onChange={(value)=>setActivePage(value as PageType)}
                variant='pills'
                visibleFrom='xs'
              >
                <Tabs.List>
                  <Tabs.Tab value='work' leftSection={<IconBriefcase size={18}/>}>
                    Work
                  </Tabs.Tab>
                  <Tabs.Tab value='events' leftSection={<IconCalendarEvent size={18}/>}>
                    Events
                  </Tabs.Tab>
                  <Tabs.Tab value='education' leftSection={<IconSchool size={18}/>}>
                    Education
                  </Tabs.Tab>
                  <Tabs.Tab value='Profile' leftSection={<IconUser size={18}/>}>
                    Profile
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <Group gap="sm">
                <Tooltip label="notification">
                  <ActionIcon variant='subtle' color='gray'>
                    <IconBell size={18}/>
                  </ActionIcon>
                </Tooltip>
                <Menu shadow='md' width={200}>
                  <Menu.Target>
                     <Avatar
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
                        alt="User Avatar"
                        size="sm"
                        style={{ cursor: 'pointer' }}
                      />

                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>
                      Application
                    </Menu.Label>
                    <Menu.Item leftSection={<IconSettings style={{width:rem(14),height:rem(14)}}/>}>Settings</Menu.Item>
                    
                    <Menu.Divider/>
                    <Menu.Item color='red' leftSection={<IconLogout style={{width:rem(14),height:rem(14)}}/>} onClick={handleLogout}>Logout</Menu.Item>
                  </Menu.Dropdown>
                
                </Menu>
              </Group>
            </Group>

          </AppShell.Header> */}


{/* 
          <AppShell.Navbar p="md">
            <Stack gap="lg">
              <div>
                <Text size='sm' fw={500} c="dimmed" mb="xs">
                  NAVIGATION
                </Text>
                <Stack gap="xs">
                  <Button variant={activePage==='work' ?'filled':'subtle'} leftSection={<IconBriefcase size={16}/>} justify='flex-start' fullWidth onClick={()=>setActivePage('work')}>
                    Work
                  </Button>
                  <Button variant={activePage==='events'?'filled':'subtle'} leftSection={<IconCalendarEvent size={16}/>} justify='flex-start' fullWidth onClick={()=>setActivePage('events')}>
                    Events <Badge size="xs" ml="auto">3</Badge>
                  </Button>
                   <Button variant={activePage==='education' ?'filled':'subtle'} leftSection={<IconSchool size={16}/>} justify='flex-start' fullWidth onClick={()=>setActivePage('education')}>
                    Education
                  </Button>
                   <Button variant={activePage==='profiles' ?'filled':'subtle'} leftSection={<IconUser size={16}/>} justify='flex-start' fullWidth onClick={()=>setActivePage('profiles')}>
                    Profiles
                  </Button>

                </Stack>
              </div>
              <Divide/>
              <div>
                <Text size='sm' fw={500} c="dimmed" mb="xs">
                  Quick Actions
                </Text>
                <Stack gap="xs">
                  {
                    sidebarActions.map((action)=>(
                      <Button
                        key={action.label}
                        variant='subtle'
                        color={action.color}
                        leftSection={<action.icon size={16}/>}
                        justify='flex-start'
                        onClick={() => handleSidebarAction(action.label, activePage)}
                      >
                        {action.label}
                      </Button>
                    ))
                  }
                </Stack>
              </div>
              <Divider/>
                <div>
                   <Text size="sm" fw={500} c="dimmed" mb="xs">
              RECENT ACTIVITY
                   </Text>
                    <Stack gap="xs">
              <Text size="xs" c="dimmed">
                • Project Alpha updated
              </Text>
              <Text size="xs" c="dimmed">
                • Meeting scheduled
              </Text>
              <Text size="xs" c="dimmed">
                • Course completed
              </Text>
                    </Stack>
                 </div>
            </Stack>
          </AppShell.Navbar>

          <AppShell.Main>
            {renderPage()}
          </AppShell.Main>
 */}
        </AppShell>
  );
};