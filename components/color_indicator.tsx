import Box, { BoxProps } from "@mui/material/Box";

  const ColorIndicator = ({ color , BoxProps }: { color: string , BoxProps?:BoxProps }) => (
    <Box
      sx={{
        width: 24,
        height: 24,
        backgroundColor: color,
        borderRadius: '50%',
     
        }}
        {...BoxProps}
    />

  );
  export default ColorIndicator