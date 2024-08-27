import { Grid, Typography } from '@mui/material';

export default function NoDataStub({ text = "No data" }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Typography variant="h5">{text}</Typography>
      </Grid>
    </Grid>
  )
}