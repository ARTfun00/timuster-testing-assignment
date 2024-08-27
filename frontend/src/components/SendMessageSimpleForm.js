"use client"

import {
  Button,
  Grid,
  TextField
} from '@mui/material';

import { useRef } from 'react';
import { useRouter } from 'next/router';

// TODO: move constants to the separate folder and file with constants
const token = "pochynok_ar@icloud.com";
const API_FULL_URL = `http://localhost:3001/emails/new`;

export default function SendMessageSimpleForm({ onFinish }) {
  const router = useRouter();

  const toRef = useRef();
  const ccRef = useRef();
  const bccRef = useRef();
  const subjectRef = useRef();
  const bodyRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const textFieldNames = [
      'email_to',
      'cc_emails',
      'bcc_emails',
      'subject',
      'body'
    ]
    const textFieldValues =
      [toRef, ccRef, bccRef, subjectRef, bodyRef]
        .map(el => el?.current?.value)

    const formData = Object.fromEntries(
      textFieldNames.map((key, index) => [key, textFieldValues[index]])
    );
    // TO DO: add input validation + sanitization

    try {
      // Sending POST request to the API endpoint
      const response = await fetch(API_FULL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      // trigger redirect to update the list of emails
      router.push({
        pathname: router.pathname,
        query: { ...router.query, lastMessageId: responseData?.data },
      });

      // success toast or smth.

      //hiding of paper + form cleanup
      onFinish?.()
      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: '100%' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <TextField
            inputRef={toRef}
            required
            fullWidth
            size="small"
            id="to"
            label="Email to"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={ccRef}
            fullWidth
            size="small"
            id="cc"
            label="CC"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={bccRef}
            fullWidth
            size="small"
            id="bcc"
            label="BCC"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={subjectRef}
            fullWidth
            size="small"
            id="subject"
            label="Subject"
            defaultValue="Hello from ..."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={bodyRef}
            required
            fullWidth
            id="body"
            label="Email message"
            multiline
            rows={5}
            defaultValue=""
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Send</Button>
        </Grid>
      </Grid>
    </form>
  );
}
