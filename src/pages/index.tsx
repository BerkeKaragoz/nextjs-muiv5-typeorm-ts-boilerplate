import {
  Button,
  Container,
  NoSsr,
  Box,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
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
      }}
    >
      <Typography variant="h1" mt={8}>
        Next.js, Material-UI v5, TypeORM, Typescript
      </Typography>
      <Typography variant="h2" mt={4} mb={8}>
        Boilerplate
      </Typography>
      <Stack
        spacing={4}
        divider={<Divider sx={{ width: "100%" }} />}
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="contained" color="primary">
          Button
        </Button>
        <CoolerButton>Cooler Button</CoolerButton>
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
      </Stack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;
