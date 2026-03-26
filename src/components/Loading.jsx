export default function Loading() {
  return (
    <>
      <div className="booking-one_loading" role="status" aria-live="polite">
        <div className="booking-one_loading-modal">
          <div className="spinner" />
          <p>
            {loadingShowtimes ? "Loading showtimes..." : "Loading seats..."}
          </p>
        </div>
      </div>
    </>
  );
}
