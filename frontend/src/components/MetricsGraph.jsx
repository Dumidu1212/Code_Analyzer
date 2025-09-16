import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const MetricsGraph = ({ metrics }) => {
  const data = {
    labels: ['Cyclomatic Complexity', 'Cognitive Complexity', 'Maintainability Index'],
    datasets: [
      {
        label: 'Metrics',
        data: [
          metrics.cyclomaticComplexity,
          metrics.cognitiveComplexity,
          metrics.maintainabilityIndex,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Code Metrics' },
    },
  };

  return <Bar data={data} options={options} />;
};

MetricsGraph.propTypes = {
  metrics: PropTypes.shape({
    cyclomaticComplexity: PropTypes.number.isRequired,
    cognitiveComplexity: PropTypes.number.isRequired,
    maintainabilityIndex: PropTypes.number.isRequired,
  }).isRequired,
};

export default MetricsGraph;
