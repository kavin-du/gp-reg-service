import { Page, TopNav } from 'govuk-react'
import{ PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom';
import { Role, ROUTES } from '../utils/constants';
import { getUser, logOut } from '../utils/helpers';

const NavBar = () => {
  const { name, roles } = getUser();
  return (
    <TopNav serviceTitle={<TopNav.NavLink> {`Welcome ${name} (${roles[0]})`} </TopNav.NavLink>}>
      <NavLink to={ROUTES.APPOINTMENTS} style={activeStyle} >
        Appointments
      </NavLink>
      {!roles.includes(Role.RECEPTIONIST) && <NavLink to={ROUTES.MEDICAL} style={activeStyle} >
        Medical Records
      </NavLink>}
      <NavLink to={ROUTES.LOGIN} onClick={logOut} style={linkStyle} replace>
        <span style={{ color: 'green', fontWeight: 'bold' }}>Logout</span>
      </NavLink>
    </TopNav>
  );
}

export default function PageWrapper(props: PropsWithChildren) {
  return (
    <Page header={<NavBar />}>{props.children}</Page>
  )
}

const linkStyle = { color: 'inherit', textDecoration: 'inherit' };

const activeStyle = (props: any) => (
  {
    color: props.isActive ? 'yellow' : 'inherit',
    textDecoration: 'inherit'
  }
)