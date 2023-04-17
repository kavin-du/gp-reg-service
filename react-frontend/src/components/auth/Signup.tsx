import { GridRow, GridCol, H1, Paragraph, InputField, Button } from 'govuk-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <>
    <GridRow>
      <GridCol setWidth="one-half">
        <H1>Create an account</H1>
        <Paragraph>Please provide the following details.</Paragraph>
        <InputField
          input={{
            name: 'group1',
            mb: 4,
          }}
        >
          NHS Number
        </InputField>
        <InputField
          input={{
            name: 'group1',
            mb: 4,
            type: 'password'
          }}
        >
          Password
        </InputField>
        <InputField
          input={{
            name: 'group1',
            mb: 4,
            type: 'password'
          }}
        >
          Confirm password
        </InputField>
        <Button>Sign up</Button>

        <Paragraph mb={1}>
          Already have an account?
          </Paragraph>
          <Link to={'/login'}>Login</Link>

      </GridCol>
    </GridRow>
  </>
  )
}
