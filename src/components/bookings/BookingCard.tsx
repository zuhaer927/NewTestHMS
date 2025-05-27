import React from 'react';
import { Booking } from '../../types';
import { User, Calendar, Clock, CreditCard, Users } from 'lucide-react';
import { format, parseISO, addDays } from 'date-fns';
import { useBookingStore } from '../../store/useBookingStore';
import toast from 'react-hot-toast';

interface BookingCardProps {
  booking: Booking;
  isActive: boolean;
  showRoom?: boolean;
  onUpdate?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, isActive, showRoom = false, onUpdate }) => {
  const { checkIn, checkOut } = useBookingStore();
  
  const handleCheckIn = () => {
    const success = checkIn(booking.id);
    if (success) {
      toast.success('Guest checked in successfully');
      if (onUpdate) onUpdate();
    } else {
      toast.error('Failed to check in guest');
    }
  };
  
  const handleCheckOut = () => {
    const success = checkOut(booking.id);
    if (success) {
      toast.success('Guest checked out successfully');
      if (onUpdate) onUpdate();
    } else {
      toast.error('Failed to check out guest');
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  const formatDateTime = (dateTimeString: string) => {
    return format(parseISO(dateTimeString), 'MMM d, yyyy h:mm a');
  };
  
  const paymentStatus = booking.paidAmount >= booking.totalAmount 
    ? 'Paid in full' 
    : `Partially paid (${((booking.paidAmount / booking.totalAmount) * 100).toFixed(0)}%)`;
  
  const paymentStatusClass = booking.paidAmount >= booking.totalAmount
    ? 'bg-green-100 text-green-800'
    : 'bg-amber-100 text-amber-800';
  
  return (
    <div className={`card border ${isActive ? 'border-teal-300 bg-teal-50' : 'border-gray-200'}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">{booking.guestName}</h3>
            {showRoom && (
              <p className="text-sm text-gray-600">Room {booking.roomId}</p>
            )}
          </div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${paymentStatusClass}`}>
            {paymentStatus}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-sm text-gray-700">
            <User className="h-4 w-4 mr-1 text-gray-500" />
            <span>ID: {booking.nationalId}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span>{booking.numberOfPeople} {booking.numberOfPeople > 1 ? 'Guests' : 'Guest'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span>{formatDate(booking.bookingDate)} ({booking.durationDays} days)</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
            <span>${booking.paidAmount} / ${booking.totalAmount}</span>
          </div>
        </div>
        
        {booking.checkInDateTime && (
          <div className="flex items-center text-xs text-gray-600 mt-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>Checked in: {formatDateTime(booking.checkInDateTime)}</span>
          </div>
        )}
        
        {booking.checkOutDateTime && (
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>Checked out: {formatDateTime(booking.checkOutDateTime)}</span>
          </div>
        )}
        
        {!booking.checkInDateTime && (
          <div className="mt-4">
            <button
              onClick={handleCheckIn}
              className="btn btn-primary w-full"
            >
              Check In
            </button>
          </div>
        )}
        
        {booking.checkInDateTime && !booking.checkOutDateTime && (
          <div className="mt-4">
            <button
              onClick={handleCheckOut}
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            >
              Check Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;