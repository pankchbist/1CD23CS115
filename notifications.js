const BASE_URL = "http://4.224.186.213/evaluation-service";

export const getNotifications = async (page = 1, limit = 10, type = "") => {
  let url = `${BASE_URL}/notifications?page=${page}&limit=${limit}`;

  if (type) {
    url += `&notification_type=${type}`;
  }

  const res = await fetch(url);
  return await res.json();
};