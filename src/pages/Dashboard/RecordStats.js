const stats = {
  total_bookings: "24",
  completed_rides: "68",
  driver_performance: "68",
  total_customer: "250",
};

const RecordStats = () => {
  const {
    total_bookings,
    completed_rides,
    driver_performance,
    total_customer,
  } = stats || {};

  return (
    <div className="d-flex">
      <div className="me-3 card">
        <div className="d-flex align-items-center">
          <div className="stats-icon">
            <i class="fa-solid fa-truck fa-xl"></i>
          </div>
          <div className="ms-2">
            <b className="fs-3 lh-1">{total_bookings}</b>
            <div>Total bookings made</div>
          </div>
        </div>
      </div>
      <div className="me-3 card">
        <div className="d-flex align-items-center">
          <div className="stats-icon">
            <i class="fa-solid fa-truck fa-xl"></i>
          </div>
          <div className="ms-2">
            <b className="fs-3 lh-1">{completed_rides}%</b>
            <div>Completed rides</div>
          </div>
        </div>
      </div>
      <div className="me-3 card">
        <div className="d-flex align-items-center">
          <div className="stats-icon">
            <i class="fa-solid fa-truck fa-xl"></i>
          </div>
          <div className="ms-2">
            <b className="fs-3 lh-1">{driver_performance}%</b>
            <div>Driver performance</div>
          </div>
        </div>
      </div>
      <div className="me-3 card">
        <div className="d-flex align-items-center">
          <div className="stats-icon">
            <i class="fa-solid fa-truck fa-xl"></i>
          </div>
          <div className="ms-2">
            <b className="fs-3 lh-1">{total_customer}</b>
            <div>Total customer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordStats;
