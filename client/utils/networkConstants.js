export const STATUSCODES = {
  NOT_FOUND: 404,
  CONFLICT: 409,

  SUCCESS: 200,
  ERROR: 400,
  SERVER_ERROR: 500,
};

export const REQUEST = {
  GET: "GET",
  POST: "POST",
};

export const BASE_URL = "http://localhost:3001/api";

export const ENDPOINTS = {
  BULK_UPDATE: "/bulkUpdate",
  GET_ALL: "/getAll",
  GET_ONE: "/getOne",
  GET_PM_VALUE: "/getPmValue",
  GET_TIME_RANGE_DATA: "/getTimeRangeData",
};
