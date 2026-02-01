import React, { useState, useMemo } from 'react';
import {
    TextField, InputAdornment, MenuItem, Select,
    FormControl, InputLabel, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ApplicationCard from './ApplicationCard';

const ApplicationList = ({ applications, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            const matchesSearch =
                app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.role.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [applications, searchTerm, statusFilter]);

    return (
        <div>
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <TextField
                    placeholder="Search company or role..."
                    variant="outlined"
                    size="small"
                    className="w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        style: { borderRadius: 12 }
                    }}
                />

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <FilterListIcon color="action" />
                    <FormControl size="small" className="min-w-[150px]">
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            displayEmpty
                            sx={{ borderRadius: 3 }}
                        >
                            <MenuItem value="All">All Status</MenuItem>
                            <MenuItem value="Applied">Applied</MenuItem>
                            <MenuItem value="Interview">Interview</MenuItem>
                            <MenuItem value="Offer">Offer</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            {/* Grid */}
            {filteredApplications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredApplications.map(app => (
                        <ApplicationCard
                            key={app.id}
                            application={app}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <Typography variant="h6" color="text.secondary">
                        No applications found.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting filters or add a new application.
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ApplicationList;
