import { error } from 'console';
import {Paragraph, Button, TextArea, ErrorText } from 'govuk-react'
import { Dispatch, SetStateAction, useState } from 'react';
import appointmentService from '../../services/appointment.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function BookAppointment(
  { setIsLoading }: {setIsLoading: Dispatch<SetStateAction<boolean>>}
  
) {
  const [reason, setReason] = useState<string>();
  const [error, setError] = useState<string>();

  // const temp = useSelector((store: RootState) => store.appointments.entities);

  const handleReasonChange = (e: any) => {
    setReason(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!reason) {
      setError('Reason is empty!');
      return;
    }
    setIsLoading(true);

    appointmentService.create(reason)
      .then(res => {
        console.log(res.data);
        setIsLoading(false);
      }).catch(e => {
        setIsLoading(false);
        setError(e.message);
      })

  }
  return (
    <>
      <Paragraph>Book a new appointment</Paragraph>
      <TextArea
        mb={2}
        input={{
          name: 'reason',
          onChange: handleReasonChange
        }}
      > </TextArea>

      <Button type='submit' onClick={handleSubmit} >Book</Button>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  )
}
