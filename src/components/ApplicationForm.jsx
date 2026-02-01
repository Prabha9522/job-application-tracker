import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Select, MenuItem, InputLabel,
    FormControl, Grid, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const initialFormState = {
    company: '',
    role: '',
    status: 'Applied',
    notes: '',
};

const ApplicationForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(initialFormState);
        }
    }, [initialData, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: { borderRadius: 16 }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="div" className="font-bold">
                    {initialData ? 'Edit Application' : 'New Application'}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Company Name"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Job Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={formData.status}
                                    label="Status"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Applied">Applied</MenuItem>
                                    <MenuItem value="Interview">Interview</MenuItem>
                                    <MenuItem value="Offer">Offer</MenuItem>
                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Notes / URL"
                                name="notes"
                                multiline
                                rows={3}
                                value={formData.notes}
                                onChange={handleChange}
                                variant="outlined"
                                placeholder="Job link, salary range, or thoughts..."
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            '&:hover': { bgcolor: '#333' },
                            borderRadius: 2,
                            px: 3,
                            fontWeight: 600
                        }}
                    >
                        {initialData ? 'Update' : 'Add Application'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ApplicationForm;
