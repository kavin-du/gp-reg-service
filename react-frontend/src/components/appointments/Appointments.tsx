import { GridCol, GridRow, LoadingBox } from "govuk-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { APICallStatus } from "../../utils/constants";
import AvailableAppointments from "./AvailableAppointments";
import BookAppointment from "./BookAppointment";

export default function Appointments() {
  const [isLoading, setIsLoading] = useState(false);

  const appointmentsStatus = useSelector((state: RootState) => state.appointments.status);

  return (
    <LoadingBox loading={appointmentsStatus === APICallStatus.LOADING}>
      <GridRow>
        <GridCol setWidth={'two-third'}>
          <AvailableAppointments setIsLoading={setIsLoading} />
        </GridCol>
        <GridCol setWidth={'one-third'}>
          <BookAppointment setIsLoading={setIsLoading} />
        </GridCol>
      </GridRow>
    </LoadingBox>
  )
}
