import LoginModal from "../components/LoginModal";
import "../CSSfiles/Login.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";
import LeaderBoardComponent from "./LeaderBoardComponent";

const LoginContainer = () => {
  const [openRegisterModal, setRegisterModal] = useState(false);

  const {allPlayers, setActivePlayer , fetchPlayerById } = useContext(UserContext);

  const existingPlayers = allPlayers.map((player) => {
      return (
        <option key={player.id} value={player.id}>
          {player.name} (id {player.id})
        </option>
      );
    });


    const handlePlayerSelection = (event) => {
        const selectedPlayer = event.target.value;
        setActivePlayer(selectedPlayer); 
        fetchPlayerById(parseInt(selectedPlayer));
      };


    const navigate = useNavigate();
    // navigate to playerAccount page once a player selects their name and click login 
    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate("/playerAccount");
       
      };






  return (
    <div className="background">
      <h3> This is the login container </h3>
      <h3> New Player? </h3>
      <button className="openModalBtn" onClick={() => {setRegisterModal(true);}}>
        Register
      </button>
        
        <form onSubmit={handleFormSubmit}>
          <select
            onChange={handlePlayerSelection}
            name="Select your username"
            defaultValue="Select your username to login">
            <option disabled-value="Select your username to login">
                Select your username
            </option>
            {existingPlayers}
          </select>
          <button type="submit">Login!</button>
        </form>
  

      {/* if open modeal is true then render the LoginModal component */}
    {openRegisterModal && <LoginModal closeModal={setRegisterModal} />} 

    <LeaderBoardComponent/>
    </div>

  );
};

export default LoginContainer;
