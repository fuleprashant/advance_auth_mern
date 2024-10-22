export const responde = (res, statuscode, message, data) => {
  return res.status(statuscode).json({
    status: statuscode === (200 || 201) ? "Success" : "Error",
    message,
    data,
  });
};
