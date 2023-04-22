import { Page, TopNav } from 'govuk-react'
import{ PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { logOut } from '../utils/helpers';

const NavBar = () => {
  return (
    <TopNav serviceTitle={<TopNav.NavLink>GP Registration Service</TopNav.NavLink>}>
      <Link to={ROUTES.APPOINTMENTS} style={linkStyle}>
        Appointments
      </Link>
      <Link to={ROUTES.MEDICAL} style={linkStyle}>
        Medical Records
      </Link>
      <Link to={ROUTES.LOGIN} style={linkStyle} onClick={logOut} replace>
        Logout
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