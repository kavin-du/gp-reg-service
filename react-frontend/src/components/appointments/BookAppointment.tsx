import { error } from 'console';
import { Paragraph, Button, TextArea, ErrorText, Input } from 'govuk-react'
import { Dispatch, SetStateAction, useState } from 'react';
import appointmentService from '../../services/appointment.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { createAppointment } from '../../redux/appointmentsSlice';

export default function BookAppointment() {
  const dispatch = useDispatch<AppDispatch>();

  const [reason, setReason] = useState<string>('');
  const [error, setError] = useState<string>();

  const handleReasonChange = (e: any) => {
    setReason(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!reason) {
      setError('Reason is empty!');
      return;
    }
    dispatch(createAppointment(reason));
    setReason('');
  }
  return (
    <>
      <Paragraph>Book a new appointment</Paragraph>
      <Input
        mb={2}
        value={reason}
        onChange={handleReasonChange}
      />

      <Button type='submit' onClick={handleSubmit} >Book</Button>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  )
}
