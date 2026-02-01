import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SendIcon from '@mui/icons-material/Send';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CancelIcon from '@mui/icons-material/Cancel';

const StatCard = ({ title, count, icon, color }) => (
    <Card
        elevation={0}
        className="border border-gray-200 transition-transform hover:scale-105"
        sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative'
        }}
    >
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: color
            }}
        />
        <CardContent className="flex items-center justify-between p-4 last:pb-4">
            <Box>
                <Typography variant="body2" color="text.secondary" className="font-semibold uppercase tracking-wider">
                    {title}
                </Typography>
                <Typography variant="h4" component="div" className="font-bold mt-1 text-gray-800">
                    {count}
                </Typography>
            </Box>
            <Box
                className="p-3 rounded-full opacity-10"
                sx={{ backgroundColor: color, color: color }}
            >
                {/* Background circle */}
            </Box>
            <Box sx={{ color: color, display: 'flex' }}>
                {icon}
            </Box>
        </CardContent>
    </Card>
);

const DashboardStats = ({ applications }) => {
    const stats = {
        total: applications.length,
        applied: applications.filter(a => a.status === 'Applied').length,
        interview: applications.filter(a => a.status === 'Interview').length,
        offer: applications.filter(a => a.status === 'Offer').length,
        rejected: applications.filter(a => a.status === 'Rejected').length,
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard
                title="Total"
                count={stats.total}
                icon={<WorkIcon fontSize="large" />}
                color="#1976d2" // Blue
            />
            <StatCard
                title="Applied"
                count={stats.applied}
                icon={<SendIcon fontSize="large" />}
                color="#0288d1" // Light Blue
            />
            <StatCard
                title="Interview"
                count={stats.interview}
                icon={<EventIcon fontSize="large" />}
                color="#ed6c02" // Orange
            />
            <StatCard
                title="Offer"
                count={stats.offer}
                icon={<EmojiEventsIcon fontSize="large" />}
                color="#2e7d32" // Green
            />
            <StatCard
                title="Rejected"
                count={stats.rejected}
                icon={<CancelIcon fontSize="large" />}
                color="#d32f2f" // Red
            />
        </div>
    );
};

export default DashboardStats;
