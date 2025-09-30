import React from "react";
import { Box, Typography } from "@mui/material";

const steps = [
  { label: "Basic Info" },
  { label: "Details" },
  { label: "Salary" },
  { label: "Application" },
  { label: "Preview" },
];

export default function CustomStepper({ activeStep = 0 }) {
  return (
    <Box mb={6} position="relative">
      {/* Progress Background Line */}
      <Box
        sx={{
          position: "absolute",
          top: 14,
          left: 40,
          right: 40,
          height: 4,
          bgcolor: "grey.300",
          zIndex: 0,
        }}
      />
      {/* Progress Filled Line */}
      <Box
        sx={{
          position: "absolute",
          top: 14,
          left: 40,
          height: 4,
          bgcolor: "#244034", // custom dark green
          zIndex: 1,
          width: `${(activeStep / (steps.length - 1)) * 100}%`,
          transition: "width 0.3s ease",
        }}
      />

      {/* Steps */}
      <Box display="flex" justifyContent="space-between" position="relative" zIndex={2}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          return (
            <Box key={index} textAlign="center" width="20%">
              {/* Circle */}
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  mx: "auto",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  bgcolor: isActive || isCompleted ? "#244034" : "grey.300", // here
                  color: isActive || isCompleted ? "white" : "grey.500",
                }}
              >
                {index + 1}
              </Box>
              {/* Label */}
              <Typography
                variant="caption"
                fontWeight={500}
                sx={{ color: isActive || isCompleted ? "#244034" : "grey.500" }}
              >
                {step.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
