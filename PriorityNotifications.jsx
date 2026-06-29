import React, { useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";
import { Link } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Pagination,
} from "@mui/material";

const PriorityNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 5;

  const fetchPriority = async () => {
    try {
      const res = await getNotifications(page, limit, "Priority");
      setNotifications(res?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPriority();
  }, [page]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

      <Typography variant="h4" gutterBottom>
        Priority Notifications
      </Typography>

      {/* NAVIGATION */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button component={Link} to="/" variant="outlined">
          All
        </Button>
        <Button variant="contained">
          Priority
        </Button>
      </Stack>

      {/* LIST */}
      <Stack spacing={2}>
        {notifications.map((item, index) => (
          <Card
            key={index}
            sx={{ borderLeft: "5px solid red" }}
          >
            <CardContent>
              <Typography variant="h6">
                {item.title}
              </Typography>

              <Typography variant="body2">
                {item.message}
              </Typography>

              <Typography variant="caption" color="error">
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

export default PriorityNotifications;