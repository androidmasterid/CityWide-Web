import ActiveDriversList from "./ActiveDriversList";
import RecordStats from "./RecordStats";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Total record cards */}
      <RecordStats />
      {/* TODO: Map component */}
      {/* Active driver list */}
      <ActiveDriversList />
    </div>
  );
};

export default Dashboard;
