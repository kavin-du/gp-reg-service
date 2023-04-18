import { GridCol, GridRow, LoadingBox } from "govuk-react";
import { useState } from "react";
import AvailableAppointments from "./AvailableAppointments";
import BookAppointment from "./BookAppointment";

export default function Appointments() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingBox loading={isLoading}>
      <GridRow>
        <GridCol setWidth={'two-third'}>
          <AvailableAppointments setIsLoading={setIsLoading} />
        </GridCol>
        <GridCol setWidth={'one-third'}>
          <BookAppointment />
        </GridCol>
      </GridRow>
    </LoadingBox>
  )
}
