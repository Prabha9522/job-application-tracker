import React, { useState } from 'react';
import { Container, Button, Typography, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useApplications } from './hooks/useApplications';
import DashboardStats from './components/DashboardStats';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';

// Create a custom MUI theme to match Tailwind/User request
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Modern black primary
    },
    background: {
      default: '#f8f9fa',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      }
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16 },
      }
    }
  }
});

function App() {
  const { applications, addApplication, updateApplication, deleteApplication } = useApplications();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  const handleAddClick = () => {
    setEditingApp(null);
    setModalOpen(true);
  };

  const handleEditClick = (app) => {
    setEditingApp(app);
    setModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingApp) {
      updateApplication(editingApp.id, formData);
    } else {
      addApplication(formData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="min-h-screen pb-10 bg-gray-50">

        {/* Navbar / Header */}
        <Box className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-4 md:px-8 flex justify-between items-center shadow-sm">
          <Box className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
              J
            </div>
            <Typography variant="h5" className="font-bold tracking-tight text-gray-900">
              JobTracker
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            disableElevation
            sx={{ px: 3, py: 1 }}
          >
            New Application
          </Button>
        </Box>

        <Container maxWidth="xl" sx={{ mt: 4 }}>

          <Box className="mb-8">
            <Typography variant="h4" className="mb-2 text-gray-800">
              Dashboard
            </Typography>
            <Typography variant="body1" className="text-gray-500">
              Overview of your job search progress.
            </Typography>
          </Box>

          <DashboardStats applications={applications} />

          <Box className="flex items-center justify-between mb-4 mt-12">
            <Typography variant="h5" className="font-bold text-gray-800">
              Applications
            </Typography>
            <Typography variant="body2" className="text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              Count: {applications.length}
            </Typography>
          </Box>

          <ApplicationList
            applications={applications}
            onEdit={handleEditClick}
            onDelete={deleteApplication}
          />

        </Container>

        <ApplicationForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingApp}
        />

      </Box>
    </ThemeProvider>
  );
}

export default App;
