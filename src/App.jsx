import React, { useState, useEffect } from "react";

const BASE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQX7Muook3qGa2Ll1z7gLE2DmWqK0rkm42jmYihnGWYySXZ-VV6lalqCLM6vCY_OM_ppi9eAlbnR58v/pub?output=csv&gid=";
const SHEET_IDS = {
    "ar": "0",
    "smg": "937398091",
    "shotgun": "517587199",
    "lmg": "1020800885",
    "mr": "46368608",
    "sr": "1785824964",
    "pistol": "38766534"
};

export default function BuildPage() {
    const [gunType, setGunType] = useState("ar");
    const [buildData, setBuildData] = useState({});
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

    useEffect(() => {
        async function fetchBuildData() {
            setLoading(true);
            try {
                const response = await fetch(BASE_SHEET_URL + SHEET_IDS[gunType]);
                const text = await response.text();
                const rows = text.split("\n").map(row => row.split(","));
                const data = {};
                rows.slice(1).forEach(row => {
                    const buildName = row[0]?.trim();
                    const messages = row.slice(1).map(cell => cell.trim()).filter(msg => msg);
                    if (buildName) data[buildName] = messages;
                });
                setBuildData(data);
            } catch (error) {
                console.error("Error fetching build data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBuildData();
    }, [gunType]);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-[Poppins]">
            <style>@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');</style>
            <nav className="px-6 mx-auto max-w-7xl sm:px-6 flex items-center justify-between py-6 relative">
                <a href="/" className="flex items-center">
                    <span className="ml-2 text-xl font-bold text-white">DF Assist</span>
                </a>
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-white hover:text-gray-300">Home</a>
                    <a href="#" className="text-white hover:text-gray-300">Docs</a>
                    <a href="https://discord.gg/As2b6yacK5" className="text-white hover:text-gray-300">Support</a>
                    {/* <a href="/premium" className="text-white font-semibold hover:text-gray-300">Premium</a> */}
                </div>
                <div className="hidden md:flex space-x-4">
                    <a href="https://discord.com/oauth2/authorize?client_id=1339918814678351966&permissions=551903389712&integration_type=0&scope=bot+applications.commands" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">Invite Bot</a>
                </div>
                {/* Hamburger Menu */}
                <button
                    className="md:hidden flex items-center focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>
            {/* Responsive Nav Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 p-4">
                    <a href="#" className="block text-white hover:text-gray-300">Home</a>
                    {/* <a href="#" className="block text-white hover:text-gray-300">Features</a> */}
                    <a href="https://discord.gg/VjEaGcRFGk" className="block text-white hover:text-gray-300">Support</a>
                    {/* <a href="#" className="block text-white font-semibold hover:text-gray-300">Premium</a> */}
                </div>
            )}
            <div className="p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Delta Force Operation Build Guide</h1>
                <div className="flex justify-center mb-4">
                    <select
                        className="p-2 bg-gray-800 text-white rounded-md"
                        value={gunType}
                        onChange={(e) => setGunType(e.target.value)}
                    >
                        {Object.keys(SHEET_IDS).map(type => (
                            <option key={type} value={type}>{type.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <p className="text-center text-gray-300">Loading builds...</p>
                    ) : (
                        Object.entries(buildData).map(([gun, messages]) => (
                            <div key={gun} className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2">{gun}</h2>
                                <ul className="list-disc list-inside">
                                    {messages.map((msg, index) => (
                                        <li key={index} className="text-gray-300">{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
