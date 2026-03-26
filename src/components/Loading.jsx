import "./Loading.scss";
export default function Loading() {
  return (
    <>
      <div className="booking-one_loading" role="status" aria-live="polite">
        <div className="booking-one_loading-modal">
          <div className="spinner" />
        </div>
      </div>
    </>
  );
}
