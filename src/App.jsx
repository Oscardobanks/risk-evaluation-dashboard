import RiskChart from './components/RiskChart';

const App = () => {
  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Risk Level Chart</h1>
      <RiskChart />
    </div>
  );
};

export default App;