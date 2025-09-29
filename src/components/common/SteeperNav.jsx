import React from "react";
import { Box, Typography, StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";

const steps = [
  "Account Setup",
  "Profile Info",
  "Preferences",
  "Review",
  "Finish",
];

// Custom Circle
const StepCircle = styled(Box)(({ theme, active, completed }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "1.1rem",
  backgroundColor: completed
    ? "green"
    : active
    ? theme.palette.primary.main
    : "#ccc",
  color: "#fff",
}));

// Custom Connector (line between steps)
const Line = styled(Box)(({ active }) => ({
  flex: 1,
  height: 4,
  backgroundColor: active ? "#1976d2" : "#ccc",
  margin: "0 8px",
  borderRadius: 2,
}));

function CustomStepper({ activeStep = 2 }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={4}>
      {steps.map((label, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <React.Fragment key={label}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <StepCircle active={isActive ? 1 : 0} completed={isCompleted ? 1 : 0}>
                {index + 1}
              </StepCircle>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#1976d2" : isCompleted ? "green" : "gray",
                }}
              >
                {label}
              </Typography>
            </Box>
            {index !== steps.length - 1 && (
              <Line active={index < activeStep ? 1 : 0} />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
}

export default CustomStepper;
