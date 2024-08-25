import { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createTaskSchema } from "@utils/Schema";
import { deleteTask, editTask, fetchTask } from "@api/tasks";

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });

  const loadTaskData = useCallback(async () => {
    try {
      const taskData = await fetchTask(taskId);
      const fields = ["title", "description", "priority", "dueDate", "status"];
      fields.forEach((field) => setValue(field, taskData[field]));
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      navigate("/");
    }
  }, [navigate, taskId]);

  useEffect(() => {
    loadTaskData();
  }, [loadTaskData]);

  const onSubmit = useCallback(
    async (formData) => {
      try {
        await editTask(taskId, formData);
        toast.success("Task updated successfully");
        navigate("/todos");
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("An error occurred while updating the task.");
      }
    },
    [taskId, navigate]
  );

  const handleDelete = useCallback(async () => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      navigate("/todos");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occurred while deleting the task.");
    }
  }, [taskId, navigate]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mb: 3 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" component="h2">
          Edit Task
        </Typography>

        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Title"
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ mt: 2 }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{ mt: 2 }}
            />
          )}
        />

        <Controller
          name="priority"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.priority}>
              <InputLabel>Priority</InputLabel>
              <Select {...field} label="Priority">
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
              <FormHelperText>{errors.priority?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!error}
              helperText={error ? error.message : null}
              fullWidth
              sx={{ mt: 2 }}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                  onBlur={onBlur}
                  name={name}
                  ref={ref}
                />
              }
              label="Completed"
            />
          )}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2, mr: 1 }}>
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          sx={{ mt: 2 }}
        >
          Delete Task
        </Button>
      </Box>
    </Container>
  );
}

export default EditTask;
