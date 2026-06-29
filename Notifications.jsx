import React, { useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";
import { Link } from "react-router-dom";

import {
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const limit = 5;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getNotifications(page, limit, type);
      setNotifications(res?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, type]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>

      {/* NAVIGATION */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained">All</Button>
        <Button component={Link} to="/priority" variant="outlined">
          Priority
        </Button>
      </Stack>

      {/* FILTER */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Notification Type</InputLabel>
        <Select
          value={type}
          label="Notification Type"
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </Select>
      </FormControl>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* LIST */}
      <Stack spacing={2}>
        {notifications.map((item, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: item.is_read ? "#f5f5f5" : "#e3f2fd",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {item.title}
              </Typography>

              <Typography variant="body2">
                {item.message}
              </Typography>

              <Typography variant="caption" color="primary">
                {item.notification_type}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* PAGINATION */}
      <Stack alignItems="center" mt={3}>
        <Pagination
          count={10}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    </Container>
  );
};

export default Notifications;