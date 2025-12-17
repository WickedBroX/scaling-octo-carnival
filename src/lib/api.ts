import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Base URL for API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Helper to get or generate Guest ID
export const getUserId = (): string => {
    // Check if user is logged in
    const userStr = localStorage.getItem('quote-flow-user');
    if (userStr) {
        const user = JSON.parse(userStr);
        // In a real app, this would be the UUID from DB
        // For now, if we have a stored user object without ID, we use guest ID or generate one
        if (user.id) return user.id;
    }

    // Check for existing Guest ID
    let guestId = localStorage.getItem('quote-flow-guest-id');
    if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem('quote-flow-guest-id', guestId);
    }
    return guestId;
};

// --- API Methods ---

export interface Category {
    id: number;
    name: string;
    description: string;
    subcategories: Subcategory[];
}

export interface Subcategory {
    id: number;
    category_id: number;
    name: string;
    tags: string[];
}

export interface Quote {
    id: number;
    text: string;
    author: string;
    subcategory_id: number;
    background_color: string;
    text_color: string;
    font_family: string;
    category_name?: string;
    subcategory_name?: string;
}

export const getCategories = async () => {
    const res = await api.get<Category[]>('/categories');
    return res.data;
};

export const getTimeline = async () => {
    const userId = getUserId();
    const res = await api.get<Quote[]>('/quotes/timeline', {
        params: { userId }
    });
    return res.data;
};

export const getDiscovery = async () => {
    const res = await api.get<Quote[]>('/quotes/discovery');
    return res.data;
};

export const recordInteraction = async (quoteId: number, interactionType: 'view' | 'like' | 'remix' | 'share') => {
    const userId = getUserId();
    await api.post('/interactions', {
        userId,
        quoteId,
        interactionType
    });
};

export default api;
