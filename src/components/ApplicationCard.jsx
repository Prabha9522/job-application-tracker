import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const statusColors = {
    'Applied': 'info',
    'Interview': 'warning',
    'Offer': 'success',
    'Rejected': 'error',
};

const ApplicationCard = ({ application, onEdit, onDelete }) => {
    const { id, company, role, status, appliedDate, notes } = application;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <Card
            className="group hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
            sx={{
                borderRadius: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: '1px solid #f0f0f0'
            }}
        >
            <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 0.5 }}>
                <IconButton
                    size="small"
                    onClick={() => onEdit(application)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f5f5f5' } }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#ffebee' } }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{
                        p: 1,
                        borderRadius: '12px',
                        bgcolor: '#f5f5f7',
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <BusinessIcon sx={{ color: '#555' }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" className="font-bold leading-tight">
                            {company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="font-medium">
                            {role}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                        label={status}
                        color={statusColors[status] || 'default'}
                        size="small"
                        variant="soft" // Note: soft variant might need custom theme or use standard 'filled'/'outlined' with custom colors
                        sx={{ fontWeight: 600, borderRadius: 2 }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                        <Typography variant="caption">
                            {formatDate(appliedDate)}
                        </Typography>
                    </Box>
                </Box>

                {notes && (
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: '#fafafa', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}>
                            {notes}
                        </Typography>
                    </Box>
                )}

            </CardContent>
        </Card>
    );
};

export default ApplicationCard;
