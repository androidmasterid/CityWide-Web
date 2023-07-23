import ActiveDriversList from "./ActiveDriversList";
import RecordStats from "./RecordStats";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Total record cards */}
      <RecordStats />
      <div className="mt-3 fw-bold">All online drivers</div>
      {/* TODO: Map component */}
      {/* Active driver list */}
      <ActiveDriversList />
    </div>
  );
};

export default Dashboard;
