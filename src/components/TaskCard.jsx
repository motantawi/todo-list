import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { memo, useState } from "react";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, toggleTaskStatus, deleteTask }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 3,
          mt: 3,
          boxShadow: 3,
          border: 1.5,
          borderColor:
            task.priority === "high"
              ? "red"
              : task.priority === "medium"
              ? "orange"
              : "green",
          borderRadius: 2,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 5,
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              mb: 2,
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {task.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Chip
                icon={<AccessTimeIcon />}
                label={`Due by: ${task.dueDate}`}
                size="small"
                variant="outlined"
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<PriorityHighIcon />}
                label={
                  task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
                }
                size="small"
                variant="outlined"
                color={
                  task.priority === "high"
                    ? "error"
                    : task.priority === "medium"
                    ? "warning"
                    : "success"
                }
              />
            </Box>
          </Box>
          {task.description && (
            <Typography variant="" color="text.secondary" sx={{ mb: 2 }}>
              {task.description}
            </Typography>
          )}
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            px: 2,
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  checked={task.status}
                  onChange={() => toggleTaskStatus(task.id)}
                />
              }
              label={task.status ? "Completed" : "Mark as done"}
            />
          </FormGroup>
          <Box>
            <IconButton
              aria-label="delete"
              onClick={() => setOpenDeleteModal(true)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => navigate(`/edit-task/${task.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>

      <DeleteTaskModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleDelete={() => {
          deleteTask(task.id);
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
};

export default memo(TaskCard);
