import { Page, TopNav } from 'govuk-react'
import{ PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const NavBar = () => {
  return (
    <TopNav serviceTitle={<TopNav.NavLink>GP Registration Service</TopNav.NavLink>}>
      <Link to={ROUTES.LOGIN} style={linkStyle}>
        Login
      </Link>
      <Link to={ROUTES.APPOINTMENTS} style={linkStyle}>
        Appointments
      </Link>
      <Link to={ROUTES.USER_MEDICAL} style={linkStyle}>
        Medical Records
      </Link>
      <Link to={ROUTES.ALL_MEDICAL} style={linkStyle}>
        All Medical Records
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