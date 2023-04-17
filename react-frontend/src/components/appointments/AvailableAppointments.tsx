import { Table } from 'govuk-react';
import { appointmentType } from '../../utils/types';

export default function AvailableAppointments() {
  const apps = [
    {
      "id": 1,
      "reason": "back pain",
      "createdAt": "2023-04-16T18:01:29.000Z"
    },
    {
      "id": 2,
      "reason": "neck pain",
      "createdAt": "2023-04-16T18:01:58.000Z"
    },
    {
      "id": 3,
      "reason": "diarrhea",
      "createdAt": "2023-04-16T18:02:14.000Z"
    },
    {
      "id": 4,
      "reason": "insomnia",
      "createdAt": "2023-04-16T18:02:51.000Z"
    }
  ];
  return (
    <Table
      caption="List of available appointments"
      head={<Table.Row><Table.Cell>ID</Table.Cell><Table.Cell>Reason</Table.Cell><Table.Cell>Date</Table.Cell></Table.Row>}
    >
      {apps.map((item: appointmentType) =>
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
        </Table.Row>)}
    </Table>
  )
}
