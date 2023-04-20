import { Page, TopNav } from 'govuk-react'
import{ PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <TopNav>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/appointments" style={linkStyle}>
        Appointments
      </Link>
      <Link to="/medical-records" style={linkStyle}>
        Medical Records
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