export const getStatusTerm = (status) => {
  const statusMap = {
    Waiting: "Waiting",
    Accept: "Approve",
    approve: "Approved",
    Reject: "Rejected",
    Start: "Started",
    Invalid: "Invalid",
    Cancel: "Cancelled",
    Complete: "Completed",
    Finish: "Finished",
    Refunded: "Refunded"
  };


  // Return mapped value or default to original
  return statusMap[status] || status;
};