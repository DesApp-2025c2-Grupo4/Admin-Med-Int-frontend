import { HomeIcon } from '@assets/icons/navBarIcons/HomeIcon.jsx'
import { PeopleIcon } from '@assets/icons/navBarIcons/PeopleIcon.jsx'
import { CalendarIcon } from '@assets/icons/navBarIcons/CalendarIcon.jsx'
import { StethoscopeIcon } from '@assets/icons/navBarIcons/StethoscopeIcon.jsx'
export const navBarItems = [
  {
    name: 'Dashboard',
    path:'/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Afiliados',
    path:'/afiliados',
    icon: PeopleIcon
  },
  {
    name: 'Prestadores',
    path:'/prestadores',
    icon: StethoscopeIcon
  },
  {
    name: 'Agenda',
    path:'/agenda',
    icon: CalendarIcon
  },
  
]