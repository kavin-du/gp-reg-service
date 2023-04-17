import { GridCol, GridRow } from "govuk-react";
import AvailableAppointments from "./AvailableAppointments";
import BookAppointment from "./BookAppointment";

export default function Appointments() {
  return (
    <GridRow>
      <GridCol setWidth={'two-third'}>
        <AvailableAppointments />
      </GridCol>
      <GridCol setWidth={'one-third'}>
        <BookAppointment />
      </GridCol>
    </GridRow>
  )
}
