import { H1, Page, TopNav } from "govuk-react";

export default function NotFoundPage() {
  return (
    <Page header={<TopNav serviceTitle={<TopNav.NavLink>GP Registration Service</TopNav.NavLink>}></TopNav>}>
      <H1>Page Not Found!</H1>
    </Page>
  )
}
