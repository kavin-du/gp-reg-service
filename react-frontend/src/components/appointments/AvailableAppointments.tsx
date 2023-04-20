import { Paragraph, Table } from 'govuk-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import appointmentService from '../../services/appointment.service';
import { AppointmentType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, saveAppointments } from '../../redux/appointmentsSlice';
import { AppDispatch, RootState } from '../../redux/store';

export default function AvailableAppointments(
  { setIsLoading }: {setIsLoading: Dispatch<SetStateAction<boolean>>}
  ) {
  
  const dispatch = useDispatch<AppDispatch>();
  // const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  const { entities: appointments, status: appointmentStatus, error } = useSelector((state: RootState) => state.appointments);

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    // only fetch if idle
    dispatch(fetchAppointments());
  }, [dispatch]);
  

  return appointments!.length > 0 ? (
    <Table
      caption="List of available appointments"
      head={<Table.Row><Table.Cell>ID</Table.Cell><Table.Cell>Reason</Table.Cell><Table.Cell>Date</Table.Cell></Table.Row>}
    >
      {appointments?.map((item: AppointmentType) =>
        <Table.Row key={item.id}>
          <Table.Cell numeric>
            {item.id}
          </Table.Cell>
          <Table.Cell>
            {item.reason}
          </Table.Cell>
          <Table.Cell>
            {new Date(item.createdAt).toDateString()}
          </Table.Cell>
          <Table.Cell>
            <a href='#' onClick={handleClick}>Cancel</a>
          </Table.Cell>
        </Table.Row>)}
    </Table>
  ) : <Paragraph>No appointments available.</Paragraph>
}
