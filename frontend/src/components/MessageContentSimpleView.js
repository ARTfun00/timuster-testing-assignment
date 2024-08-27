import { Grid, Typography } from '@mui/material';

// TO DO: move constants to the separate folder and file with constants
const token = "pochynok_ar@icloud.com"

export default function MessageContentSimpleView({ messageData = {} }) {
  const { email_to, email_from, cc_email, bcc_email, subject, body } = messageData;

  const subjectTextComputed = subject ? `Subject: ${subject}` : 'No subject';
  const emailToTextComputed = "To: " + (email_to !== token ? email_to : 'You')
  const emailFromTextComputed = "From: " + (email_from !== token ? email_from : 'You')

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ p: 2 }}
    >
      <Grid item xs={12}>
        <Typography variant="h6" component="div">
          {emailFromTextComputed}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="div">
          {emailToTextComputed}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" component="div">
          {subjectTextComputed}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" component="div">
          {cc_email || 'No CC'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" component="div">
          {bcc_email || 'No BCC'}
        </Typography>
      </Grid>
      {/* // TO DO: Add the attachment preview and body parser as it can be HTML */}
      <Grid item xs={12}>
        <Typography variant="body1" component="div">
          {`Email text: ${body}`}
        </Typography>
      </Grid>
    </Grid>
  );
}