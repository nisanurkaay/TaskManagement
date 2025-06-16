import React, { useState, useMemo, useEffect } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../styles/Dashboard.css";
type Props = {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  items: React.ReactNode[];
  maxVisible?: number;
  fixedHeight?: boolean;
  pagination?: boolean;
};

const DashboardCard: React.FC<Props> = ({
  title,
  icon,
  action,
  items,
  maxVisible = 5,
  fixedHeight = true,
  pagination = false,
}) => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(items.length / maxVisible);

  const pagedItems = useMemo(() => {
    const start = page * maxVisible;
    const end = start + maxVisible;
    return pagination ? items.slice(start, end) : items.slice(0, maxVisible);
  }, [items, page, maxVisible, pagination]);

  useEffect(() => {
    setPage(0);
  }, [items]);

  return (
    <Paper
      elevation={3}
      className={`dashboard-card ${fixedHeight ? "fixed-height" : ""}`}
    >
      <Box className="card-header">
        <Typography variant="h6">
          {icon && (
            <span style={{ display: "inline-flex", marginRight: "0.5rem" }}>
              {icon}
            </span>
          )}
          {title}
        </Typography>
        {action}
      </Box>
      <Box className="card-body">
        {pagedItems.length > 0 ? (
          pagedItems
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
          >
            <Typography variant="body2" color="textSecondary">
              No content here
            </Typography>
          </Box>
        )}
      </Box>

      {pagination && totalPages > 1 && (
        <Box className="card-footer">
          <IconButton
            size="small"
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography component="span" variant="caption" mx={1}>
            {page + 1} / {totalPages}
          </Typography>
          <IconButton
            size="small"
            disabled={page + 1 >= totalPages}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default DashboardCard;
