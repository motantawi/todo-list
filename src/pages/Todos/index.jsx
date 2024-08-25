import { useEffect, useCallback, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import queryString from "query-string";
import { deleteTask, fetchTasks, toggleTaskStatus } from "@api/tasks";
import useUser from "@hooks/useUser";
import TaskCard from "@components/TaskCard";
import AddTodoModal from "@components/modals/AddTodoModal";
import useFetch from "@hooks/useFetch";

function Todos() {
  const { parse, stringify } = queryString;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [tasksData, setTasksData] = useState([]);

  const queryParams = parse(location.search);
  const {
    sortOrder = "asc",
    statusFilter = "",
    priorityFilter = "",
    dueDateFilter = "",
    searchTerm = "",
  } = queryParams;

  const updateFilters = (newFilters) => {
    const mergedFilters = { ...queryParams, ...newFilters };
    const nonDefaultFilters = {};
    Object.entries(mergedFilters).forEach(([key, value]) => {
      if (key === "sortOrder" && value !== "asc") {
        nonDefaultFilters[key] = value;
      } else if (value !== "") {
        nonDefaultFilters[key] = value;
      }
    });

    navigate({
      pathname: location.pathname,
      search: stringify(nonDefaultFilters),
    });
  };

  const fetchUserTasks = useCallback(() => {
    if (user) {
      return fetchTasks(user.id);
    }
    return Promise.resolve([]);
  }, [user]);

  const {
    data: allTasks,
    loading,
    error,
    refetch: loadTasks,
  } = useFetch(fetchUserTasks);

  useEffect(() => {
    if (allTasks) {
      setTasksData(allTasks);
    }
  }, [allTasks]);

  const handleSearchChange = useCallback(
    (event) => {
      const { value } = event.target;
      if (value === "") {
        navigate({
          pathname: location.pathname,
          search: "",
        });
      } else {
        const newFilters = {
          searchTerm: value,
        };
        navigate({
          pathname: location.pathname,
          search: stringify(newFilters),
        });
      }
    },
    [navigate, location.pathname]
  );

  const tasks = useMemo(() => {
    return tasksData
      .filter((task) => {
        return (
          (!statusFilter ||
            (statusFilter === "done" ? task.status : !task.status)) &&
          (!priorityFilter || task.priority === priorityFilter) &&
          (!dueDateFilter || task.dueDate === dueDateFilter) &&
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [
    tasksData,
    sortOrder,
    statusFilter,
    priorityFilter,
    dueDateFilter,
    searchTerm,
  ]);

  const handleDeleteTask = useCallback(async (taskId) => {
    await deleteTask(taskId);
    setTasksData((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const handleToggleTaskStatus = useCallback(async (taskId) => {
    await toggleTaskStatus(taskId);
    setTasksData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"} sx={{ mb: 4 }}>
        Welcome Back, {user?.firstName} {user?.lastName}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        mb={2}
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
      >
        <TextField
          label="Search Tasks By Title"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "auto", flexGrow: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            label="Sort Order"
            onChange={(e) => updateFilters({ sortOrder: e.target.value })}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => updateFilters({ statusFilter: e.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="notDone">Not Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            label="Priority"
            onChange={(e) => updateFilters({ priorityFilter: e.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Due Date"
          type="date"
          size="small"
          value={dueDateFilter}
          onChange={(e) => updateFilters({ dueDateFilter: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "auto" }}
        />
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Task
        </Button>
      </Stack>
      <AddTodoModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        fetchTasks={loadTasks}
      />
      <Grid container spacing={2}>
        {loading ? (
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center">
              Loading tasks...
            </Typography>
          </Grid>
        ) : error ? (
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" color="error">
              Error: {error}
            </Typography>
          </Grid>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} key={task.id}>
              <TaskCard
                task={task}
                toggleTaskStatus={() => handleToggleTaskStatus(task.id)}
                deleteTask={() => handleDeleteTask(task.id)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center">
              No Tasks To Display
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Todos;
