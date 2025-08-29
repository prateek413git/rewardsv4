import { useState, useEffect } from 'react';

export default function RewardsApp() {
  const [points, setPoints] = useState(0);
  const [habits, setHabits] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [newHabitPoints, setNewHabitPoints] = useState(0);
  const [newReward, setNewReward] = useState('');
  const [newRewardCost, setNewRewardCost] = useState(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem('points');
    const savedHabits = localStorage.getItem('habits');
    const savedRewards = localStorage.getItem('rewards');

    if (savedPoints) setPoints(JSON.parse(savedPoints));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    else setHabits([
      { id: 1, text: 'Brush teeth', points: 2 },
      { id: 2, text: 'Make bed', points: 3 },
      { id: 3, text: 'Read a book', points: 5 },
      { id: 4, text: 'Help clean up toys', points: 3 },
    ]);

    if (savedRewards) setRewards(JSON.parse(savedRewards));
    else setRewards([
      { id: 1, text: 'Choose dessert', cost: 10 },
      { id: 2, text: 'Extra screen time (15 min)', cost: 15 },
      { id: 3, text: 'Pick movie night movie', cost: 20 },
      { id: 4, text: 'Trip to ice cream shop', cost: 25 },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points));
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [points, habits, rewards]);

  const completeHabit = (habit) => {
    setPoints(points + habit.points);
  };

  const redeemReward = (reward) => {
    if (points >= reward.cost) {
      setPoints(points - reward.cost);
    } else {
      alert('Not enough points!');
    }
  };

  const addHabit = () => {
    if (newHabit.trim() !== '' && newHabitPoints > 0) {
      setHabits([...habits, { id: Date.now(), text: newHabit, points: newHabitPoints }]);
      setNewHabit('');
      setNewHabitPoints(0);
    }
  };

  const addReward = () => {
    if (newReward.trim() !== '' && newRewardCost > 0) {
      setRewards([...rewards, { id: Date.now(), text: newReward, cost: newRewardCost }]);
      setNewReward('');
      setNewRewardCost(0);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌟 Good Habits Rewards 🌟</h1>
      <div className="text-center mb-8">
        <span className="text-xl font-semibold">Your Points: </span>
        <span className="text-2xl text-purple-600 font-bold">{points}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-xl rounded-2xl p-4">
          <h2 className="text-2xl font-bold mb-4">✅ Habits</h2>
          {habits.map((habit) => (
            <div key={habit.id} className="flex justify-between items-center mb-3">
              <span>{habit.text} (+{habit.points})</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => completeHabit(habit)}>Done</button>
            </div>
          ))}
          <div className="mt-4">
            <input
              placeholder="New habit"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="number"
              placeholder="Points"
              value={newHabitPoints}
              onChange={(e) => setNewHabitPoints(Number(e.target.value))}
              className="border p-2 rounded w-full mb-2"
            />
            <button className="bg-green-500 text-white px-3 py-1 rounded w-full" onClick={addHabit}>+ Add Habit</button>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-4">
          <h2 className="text-2xl font-bold mb-4">🎁 Rewards</h2>
          {rewards.map((reward) => (
            <div key={reward.id} className="flex justify-between items-center mb-3">
              <span>{reward.text} (-{reward.cost})</span>
              <button className="bg-pink-500 text-white px-3 py-1 rounded" onClick={() => redeemReward(reward)}>Redeem</button>
            </div>
          ))}
          <div className="mt-4">
            <input
              placeholder="New reward"
              value={newReward}
              onChange={(e) => setNewReward(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="number"
              placeholder="Cost"
              value={newRewardCost}
              onChange={(e) => setNewRewardCost(Number(e.target.value))}
              className="border p-2 rounded w-full mb-2"
            />
            <button className="bg-purple-500 text-white px-3 py-1 rounded w-full" onClick={addReward}>+ Add Reward</button>
          </div>
        </div>
      </div>
    </div>
  );
}