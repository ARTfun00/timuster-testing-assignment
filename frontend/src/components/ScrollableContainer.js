import { Box } from '@mui/material';

export default function ScrollableContainer({ headerActionsSection, children }) {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexShrink: 0, p: 2 }}>
        {headerActionsSection}
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};