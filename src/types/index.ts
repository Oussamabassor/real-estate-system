export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    type: 'apartment' | 'bungalow';
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: string[];
    amenities: string[];
    available: boolean;
    floor?: number;
    totalFloors?: number;
}

export interface Reservation {
    id: number;
    propertyId: number;
    userId: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentMethod: 'cash' | 'cheque' | 'bank_transfer';
    paymentStatus: 'pending' | 'completed' | 'failed';
    discount?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
}

export interface PaymentReceipt {
    id: number;
    reservationId: number;
    amount: number;
    paymentMethod: 'cash' | 'cheque' | 'bank_transfer';
    transactionId?: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
} 