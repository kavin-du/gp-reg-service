import {Paragraph, Button, TextArea } from 'govuk-react'

export default function BookAppointment() {
  return (
    <>
      <Paragraph>Book a new appointment</Paragraph>
      <TextArea
        mb={2}
        input={{
          name: 'group1',
        }}
      > </TextArea>

      <Button>Book</Button>
    </>
  )
}
