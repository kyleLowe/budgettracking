import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
   <Stack direction="row" spacing={0} alignItems="flex-start">
      <Box
        sx={{
          py: 10,
          px: {
            xs: 10,
            md: 50,
            lg: 100,
          },
          height: '100vh',
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}