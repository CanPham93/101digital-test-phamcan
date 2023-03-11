import TableContainer from "@mui/material/TableContainer";
import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiUser from "../request/user";


const StyledErroInput = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
  color: "red",
}));

export const CreateInvoicePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onCreateInvoice = async (data: any) => {
    console.log(data)

    const res = await apiUser.postInvoice(data);
    if (res) {
      console.log(res);
      toast.success("Create Invoice success!");
      navigate("/dashboard/invoices")
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer>
          <Typography gutterBottom variant="h5" component="div">
            Create Invoice
          </Typography>

          <form onSubmit={handleSubmit(onCreateInvoice)}>
            <TextField
              type="text"
              placeholder="Reference"
              {...register("reference", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              aria-invalid={errors.reference ? "true" : "false"}
            />
            {errors.reference?.type === "required" && (
              <StyledErroInput role="alert">Reference is required</StyledErroInput>
            )}

            <TextField
              type="datetime-local"
              placeholder="Date"
              {...register("date", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              aria-invalid={errors.date ? "true" : "false"}
            />
            {errors.date?.type === "required" && (
              <StyledErroInput role="alert">Date is required</StyledErroInput>
            )}

            <TextField
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              aria-invalid={errors.amount ? "true" : "false"}
            />
            {errors.amount?.type === "required" && (
              <StyledErroInput role="alert">Amount is required</StyledErroInput>
            )}

            <TextField
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description?.type === "required" && (
              <StyledErroInput role="alert">Description is required</StyledErroInput>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </form>
        </TableContainer>
      </Box>
    </Container>
  );
};
