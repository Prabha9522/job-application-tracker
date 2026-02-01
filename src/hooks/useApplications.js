import { useState, useEffect } from 'react';

const STORAGE_KEY = 'job_applications_v1';


const DEFAULT_DATA = [
    {
        id: '1',
        company: 'Google',
        role: 'Senior Frontend Engineer',
        status: 'Interview',
        appliedDate: new Date(Date.now() - 2 * 86400000).toISOString(),
        notes: 'Technical round with various team members. Focus on system design.'
    },
    {
        id: '2',
        company: 'Netflix',
        role: 'UI Engineer',
        status: 'Rejected',
        appliedDate: new Date(Date.now() - 7 * 86400000).toISOString(),
        notes: 'Standard rejection email. Try again in 6 months.'
    },
    {
        id: '3',
        company: 'Spotify',
        role: 'Product Designer',
        status: 'Offer',
        appliedDate: new Date(Date.now() - 1 * 86400000).toISOString(),
        notes: 'Offer received! $180k base + equity. Negotiating sign-on bonus.'
    },
    {
        id: '4',
        company: 'Microsoft',
        role: 'Full Stack Developer',
        status: 'Applied',
        appliedDate: new Date(Date.now() - 5 * 86400000).toISOString(),
        notes: 'Applied via referral.'
    },
    {
        id: '5',
        company: 'Airbnb',
        role: 'Software Engineer',
        status: 'Applied',
        appliedDate: new Date().toISOString(),
        notes: 'Checking for remote options.'
    }
];

export const useApplications = () => {
    const [applications, setApplications] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        // If no data found, or empty array, return default data for demo purposes
        if (!saved) return DEFAULT_DATA;

        try {
            const parsed = JSON.parse(saved);
            return parsed.length > 0 ? parsed : DEFAULT_DATA;
        } catch (e) {
            return DEFAULT_DATA;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    }, [applications]);

    const addApplication = (app) => {
        const newApp = { ...app, id: crypto.randomUUID(), appliedDate: new Date().toISOString() };
        setApplications((prev) => [newApp, ...prev]);
    };

    const updateApplication = (id, updatedData) => {
        setApplications((prev) =>
            prev.map((app) => (app.id === id ? { ...app, ...updatedData } : app))
        );
    };

    const deleteApplication = (id) => {
        setApplications((prev) => prev.filter((app) => app.id !== id));
    };

    return {
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
    };
};
