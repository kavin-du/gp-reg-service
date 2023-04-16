import { Button, GridCol, GridRow, H1, Input, InputField, Label, LabelText, Paragraph } from 'govuk-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  const [value2, setValue] = useState<string>('');
  const handleChange = (e: any) => {
    // console.log(value2)
    // console.log(e)
  }
  return (
    <>
      <GridRow>
        <GridCol setWidth="one-half">
          <H1>Login</H1>
          <Paragraph>Please login using your NHS details.</Paragraph>
          <InputField
            input={{
              name: 'group1',
              mb: 4,
              value: value2,
              onChange: handleChange
            }}
          >
            NHS Number
          </InputField>
          <InputField
            input={{
              name: 'group1',
              mb: 4,
              value: value2,
              onChange: handleChange,
              type: 'password'
            }}
          >
            Password
          </InputField>
          <Button>Login</Button>

          <Paragraph mb={1}>
            Don't have an account?
            </Paragraph>
            <Link to={'/signup'}>Sign up</Link>

        </GridCol>
      </GridRow>
    </>
  )
}
