import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to MoodTracker</h1>
      <p className="text-xl text-gray-600 mb-8">
        Track your daily moods and emotions to better understand yourself
      </p>
      <div className="space-x-4">
        <Link
          to="/entries/new"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Record Mood
        </Link>
        <Link
          to="/dashboard"
          className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home; 