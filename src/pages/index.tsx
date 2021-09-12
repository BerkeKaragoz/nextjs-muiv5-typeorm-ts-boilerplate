import { Button, Container, NoSsr, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import type { GetServerSideProps, NextPage } from "next";

const CoolerButton = styled(Button)(
  ({ theme }) => `
  display: block;
  color: ${theme.palette.grey[100]};
  background-color: ${theme.palette.info.light};
  &:hover {
    color: ${theme.palette.text.secondary};
    background-color: ${theme.palette.warning.light};
  }
`,
);

const Home: NextPage = () => {
  return (
    <Container
      sx={{
        bgcolor: "grey.100",
        textAlign: "center",
        padding: 2,
        minHeight: "100vh",
        "> *": { mb: 2 },
      }}
    >
      <Typography variant="h1">
        Next.js, Material-UI v5, TypeORM, Typescript
      </Typography>
      <Button variant="contained" color="primary">
        Button
      </Button>
      <CoolerButton sx={{ mx: "auto" }}>Cooler Button</CoolerButton>
      <Box
        sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        Server and Client
      </Box>
      <NoSsr>
        <Box
          sx={{
            p: 2,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
          }}
        >
          Client only
        </Box>
      </NoSsr>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;
