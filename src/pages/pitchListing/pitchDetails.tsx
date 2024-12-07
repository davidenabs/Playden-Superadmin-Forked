import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../../redux/bookingSlice";
import { RootState } from "../../redux/store";

const PitchDetails: React.FC = () => {
  const { pitchId } = useParams<{ pitchId: string }>();
  const { state } = useLocation(); // Access state from navigation
  const dispatch = useDispatch();

  const { bookings, loading, error } = useSelector(
    (state: RootState) => state.bookings
  );

  useEffect(() => {
    if (pitchId) {
      dispatch(fetchBookingHistory(pitchId)); // Fetch booking history on mount
    }
  }, [pitchId, dispatch]);

  const {
    sport = "N/A",
    imageSrc = "N/A",
    pitchSize = "N/A",
    name = "N/A",
    contact = "N/A",
    price = "N/A",
  } = state || {}; // Destructure state with default values

  return (
    <div className="relative ml-72 p-8 mt-20 overflow-auto">
      {/* Pitch Details */}
      <div className="flex gap-6 mt-6 w-[680px]">
        <img
          src={imageSrc}
          alt="Pitch"
          className="min-w-[300px] h-[189px] rounded-md"
        />
        <div className="text-sm mt-3">
          <p>
            <strong className="text-[#01031A]">PITCH NAME:</strong> {name}
          </p>
          <p>
            <strong className="text-[#01031A]">SPORT:</strong> {sport}
          </p>
          <p>
            <strong className="text-[#01031A]">PITCH SIZE:</strong> {pitchSize}
          </p>
          <p>
            <strong className="text-[#01031A]">CONTACT:</strong> {contact}
          </p>
          <p>
            <strong className="text-[#01031A]">PRICE:</strong> {price}
          </p>
        </div>
      </div>

      {/* Booking History */}
      <div className="mt-8">
        <h2 className="font-bold text-lg mb-4 text-[#808B9B]">
          Booking History
        </h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-transparent text-[#808B9B] text-left">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Date/Time</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="text-[14px] text-[#01031A] font-semibold"
                  >
                    <td className="p-2">{booking.booking_code}</td>
                    <td className="p-2">{booking.date}</td>
                    <td className="p-1">{booking.total_cost}</td>
                    <td className="p-1 cursor-pointer">
                      <u>View Transaction Details</u>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 p-4">
                    No bookings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PitchDetails;
