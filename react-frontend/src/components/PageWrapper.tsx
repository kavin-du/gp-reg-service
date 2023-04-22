import { Button, H2, Page, TopNav } from 'govuk-react'
import{ PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';
import { Role, ROUTES } from '../utils/constants';
import { getUser, logOut } from '../utils/helpers';

const NavBar = () => {
  const { name, roles } = getUser();
  return (
    <TopNav serviceTitle={<TopNav.NavLink> {`Welcome ${name} (${roles[0]})`} </TopNav.NavLink>}>
      <Link to={ROUTES.APPOINTMENTS} style={linkStyle}>
        Appointments
      </Link>
      {!roles.includes(Role.RECEPTIONIST) && <Link to={ROUTES.MEDICAL} style={linkStyle}>
        Medical Records
      </Link>}
      <Link to={ROUTES.LOGIN} style={linkStyle} onClick={logOut} replace>
        <span style={{ color: 'green', fontWeight: 'bold' }}>Logout</span>
      </Link>
    </TopNav>
  );
}

export default function PageWrapper(props: PropsWithChildren) {
  return (
    <Page header={<NavBar />}>{props.children}</Page>
  )
}

const linkStyle = { color: 'inherit', textDecoration: 'inherit' };