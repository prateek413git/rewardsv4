"use client";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaGift, FaStar, FaBook, FaBroom, FaMusic, FaPizzaSlice } from "react-icons/fa";

export default function RewardsApp() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [habits, setHabits] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [history, setHistory] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [newHabitPoints, setNewHabitPoints] = useState(0);
  const [newReward, setNewReward] = useState("");
  const [newRewardCost, setNewRewardCost] = useState(0);

  // Load data
  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    const savedLevel = localStorage.getItem("level");
    const savedHabits = localStorage.getItem("habits");
    const savedRewards = localStorage.getItem("rewards");
    const savedHistory = localStorage.getItem("history");

    if (savedPoints) setPoints(JSON.parse(savedPoints));
    if (savedLevel) setLevel(JSON.parse(savedLevel));
    if (savedHabits)
      setHabits(JSON.parse(savedHabits));
    else
      setHabits([
        { id: 1, text: "Brush teeth", points: 2, color: "bg-yellow-100", icon: <FaCheckCircle /> },
        { id: 2, text: "Make bed", points: 3, color: "bg-green-100", icon: <FaBroom /> },
        { id: 3, text: "Read a book", points: 5, color: "bg-blue-100", icon: <FaBook /> },
        { id: 4, text: "Help clean up toys", points: 3, color: "bg-pink-100", icon: <FaBroom /> },
        { id: 5, text: "Practice Maths", points: 4, color: "bg-purple-100", icon: <FaMusic /> },
        { id: 6, text: "Set/Clean the table", points: 2, color: "bg-orange-100", icon: <FaPizzaSlice /> },
      ]);
    if (savedRewards)
      setRewards(JSON.parse(savedRewards));
    else
      setRewards([
        { id: 1, text: "Choose dessert", cost: 10, color: "bg-purple-100", icon: <FaGift /> },
        { id: 2, text: "Extra screen time (15 min)", cost: 15, color: "bg-red-100", icon: <FaGift /> },
        { id: 3, text: "Pick movie night movie", cost: 20, color: "bg-orange-100", icon: <FaGift /> },
        { id: 4, text: "Trip to ice cream shop", cost: 25, color: "bg-pink-200", icon: <FaGift /> },
        { id: 5, text: "Sticker reward", cost: 5, color: "bg-yellow-200", icon: <FaStar /> },
        { id: 6, text: "Choose dinner", cost: 15, color: "bg-green-200", icon: <FaPizzaSlice /> },
      ]);
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(points));
    localStorage.setItem("level", JSON.stringify(level));
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("rewards", JSON.stringify(rewards));
    localStorage.setItem("history", JSON.stringify(history));
  }, [points, level, habits, rewards, history]);

  // Level up every 20 points
  useEffect(() => {
    const newLevel = Math.floor(points / 20) + 1;
    if (newLevel > level) setLevel(newLevel);
  }, [points]);

  const completeHabit = (habit) => {
    setPoints(points + habit.points);
    const newEntry = {
      text: `Completed "${habit.text}"`,
      points: habit.points,
      date: new Date().toLocaleString(),
    };
    setHistory([newEntry, ...history]);
  };

  const redeemReward = (reward) => {
    if (points >= reward.cost) {
      setPoints(points - reward.cost);
      const newEntry = {
        text: `Redeemed "${reward.text}"`,
        points: -reward.cost,
        date: new Date().toLocaleString(),
      };
      setHistory([newEntry, ...history]);
    } else {
      alert("Not enough points!");
    }
  };

  const addHabit = () => {
    if (newHabit.trim() !== "" && newHabitPoints > 0) {
      setHabits([...habits, { id: Date.now(), text: newHabit, points: newHabitPoints, color: "bg-teal-100", icon: <FaStar /> }]);
      setNewHabit("");
      setNewHabitPoints(0);
    }
  };

  const addReward = () => {
    if (newReward.trim() !== "" && newRewardCost > 0) {
      setRewards([...rewards, { id: Date.now(), text: newReward, cost: newRewardCost, color: "bg-purple-200", icon: <FaGift /> }]);
      setNewReward("");
      setNewRewardCost(0);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans bg-gradient-to-b from-pink-50 to-purple-50 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-2 text-purple-700">Hello Anya! 🌟</h1>
      <div className="text-center mb-6">
        <span className="text-xl font-semibold">Points: </span>
        <span className="text-4xl text-purple-600 font-bold">{points}</span>
        <div className="mt-2 text-lg">Level: {level} <FaStar className="inline text-yellow-400" /></div>
        <div className="h-2 w-64 mx-auto bg-gray-300 rounded-full mt-2">
          <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${(points % 20) * 5}%` }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Habits */}
        <div className="bg-white shadow-2xl rounded-3xl p-4">
          <h2 className="text-3xl font-bold mb-4 text-green-700">✅ Habits</h2>
          {habits.map((habit) => (
            <div key={habit.id} className={`flex justify-between items-center mb-3 p-3 rounded-xl ${habit.color} animate-fade-in`}>
              <span className="flex items-center gap-2">{habit.icon} {habit.text} (+{habit.points})</span>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition" onClick={() => completeHabit(habit)}>Done</button>
            </div>
          ))}
          <div className="mt-4">
            <input placeholder="New habit" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} className="border p-2 rounded w-full mb-2" />
            <input type="number" placeholder="Points" value={newHabitPoints} onChange={(e) => setNewHabitPoints(Number(e.target.value))} className="border p-2 rounded w-full mb-2" />
            <button className="bg-green-500 text-white px-3 py-1 rounded w-full hover:bg-green-600 transition" onClick={addHabit}>+ Add Habit</button>
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-white shadow-2xl rounded-3xl p-4">
          <h2 className="text-3xl font-bold mb-4 text-pink-700">🎁 Rewards</h2>
          {rewards.map((reward) => (
            <div key={reward.id} className={`flex justify-between items-center mb-3 p-3 rounded-xl ${reward.color} animate-fade-in`}>
              <span className="flex items-center gap-2">{reward.icon} {reward.text} (-{reward.cost})</span>
              <button className="bg-pink-500 text-white px-4 py-1 rounded-xl hover:bg-pink-600 transition" onClick={() => redeemReward(reward)}>Redeem</button>
            </div>
          ))}
          <div className="mt-4">
            <input placeholder="New reward" value={newReward} onChange={(e) => setNewReward(e.target.value)} className="border p-2 rounded w-full mb-2" />
            <input type="number" placeholder="Cost" value={newRewardCost} onChange={(e) => setNewRewardCost(Number(e.target.value))} className="border p-2 rounded w-full mb-2" />
            <button className="bg-purple-500 text-white px-3 py-1 rounded w-full hover:bg-purple-600 transition" onClick={addReward}>+ Add Reward</button>
          </div>
        </div>
      </div>

      {/* Points history */}
      <div className="bg-white shadow-2xl rounded-3xl p-4 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">📜 Points History</h2>
        {history.length === 0 ? (
          <p>No points collected yet.</p>
        ) : (
          <div className="max-h-72 overflow-y-auto space-y-2">
            {history.map((entry, idx) => (
              <div key={idx} className={`flex justify-between items-center p-2 rounded-xl ${entry.points > 0 ? "bg-green-100" : "bg-red-100"} animate-fade-in`}>
                <span className="flex items-center gap-2">{entry.points > 0 ? <FaCheckCircle className="text-green-600" /> : <FaGift className="text-pink-600" />}{entry.text}</span>
                <span className="font-bold">{entry.points > 0 ? `+${entry.points}` : entry.points}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

