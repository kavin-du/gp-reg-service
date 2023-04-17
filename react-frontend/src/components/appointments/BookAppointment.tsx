import { GridRow, GridCol, H1, Paragraph, InputField, Button, TextArea } from 'govuk-react'
import React from 'react'

export default function BookAppointment() {
  return (
    <>
      <GridRow>
        <GridCol setWidth="one-third">
          <Paragraph>Book a new appointment</Paragraph>
          <TextArea
          mb={2}
            input={{
              name: 'group1',
            }}
          > </TextArea>
          
          <Button>Book</Button>
        </GridCol>
      </GridRow>
    </>
  )
}
