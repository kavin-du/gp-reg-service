import { Button, ErrorText, FormGroup, GridCol, GridRow, H1, Input, InputField, Label, LabelText, LoadingBox, Paragraph } from 'govuk-react'
import React, { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function Login() {

  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const { nhs, pwd } = document.forms[0];
    const nhsNumber = nhs.value;
    const password = pwd.value;

    if (!nhsNumber || !password) {
      setError('Login details cannot be empty!');
      return;
    }
    authService.login(nhsNumber, password)
      .then(res => {
        const access_token = res.data.access_token;
        localStorage.setItem('access_token', access_token);
        setError('');
        setIsLoading(false);
        navigate('/appointments');
      })
      .catch(e => {
        setIsLoading(false);
        setError(e.message);
      });
  }
  return (
    <>
    <LoadingBox loading={isLoading}>
      <GridRow>
        <GridCol setWidth="one-half">
          <H1>Login</H1>
          <Paragraph>Please login using your NHS details.</Paragraph>

          <form onSubmit={handleSubmit}>
            <InputField
              input={{
                name: 'nhs',
                mb: 4,
                onChange: handleChange
              }}
            >
              NHS Number
            </InputField>
            <InputField
              input={{
                name: 'pwd',
                mb: 4,
                onChange: handleChange,
                type: 'password'
              }}
            >
              Password
            </InputField>
            <Button type='submit' >Login</Button>
          </form>

          {error && <ErrorText>{error}</ErrorText>}

          <Paragraph mb={1}>
            Don't have an account?
          </Paragraph>
          <Link to={'/signup'}>Sign up</Link>

        </GridCol>
      </GridRow>
      </LoadingBox>
    </>
  )
}
