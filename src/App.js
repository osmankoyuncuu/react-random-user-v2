import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import Footer from "./component/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

function App() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const getUser = async () => {
    const url = "https://randomuser.me/api/";
    await axios(url).then((res) => setUser(res.data.results[0]));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    //setTitle()
    setValue(`${user?.name?.first} ${user?.name?.last}`);
    setTitle("name");
  }, [user]);

  const handleAddUser = () => {
    setList([
      ...list,
      {
        first: `${user?.name?.first}`,
        email: `${user?.email}`,
        phone: `${user?.phone}`,
        age: `${user?.dob?.age}`,
      },
    ]);
  };
  const handleClearList = () => {
    setList([]);
  };

  return (
    <main>
      <div className="block bcg-aqua random">
        <h1>Random User Generator</h1>
      </div>
      <div className="block">
        <div className="container">
          <img
            src={user?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img
                src={user?.gender === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
                onMouseOver={() => {
                  setValue(`${user?.name?.first} ${user?.name?.last}`);
                  setTitle("name");
                }}
              />
            </button>
            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseOver={() => {
                  setValue(user?.email);
                  setTitle("email");
                }}
              />
            </button>
            <button className="icon" data-label="age">
              <img
                src={user?.gender === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
                onMouseOver={() => {
                  setValue(user?.dob?.age);
                  setTitle("age");
                }}
              />
            </button>
            <button className="icon" data-label="street">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseOver={() => {
                  setValue(
                    `${user?.location?.street?.number} ${user?.location?.street?.name}`
                  );
                  setTitle("street");
                }}
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseOver={() => {
                  setValue(user?.phone);
                  setTitle("phone");
                }}
              />
            </button>
            <button className="icon" data-label="password">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseOver={() => {
                  setValue(user?.login?.password);
                  setTitle("password");
                }}
              />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={() => getUser()}>
              new user
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => handleAddUser()}
            >
              add user
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => handleClearList()}
            >
              Clear List
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => {
                const { first, email, phone, age } = item;
                return (
                  <tr className="body-tr" key={uuid()}>
                    <th className="th">{first}</th>
                    <th className="th">{email}</th>
                    <th className="th">{phone}</th>
                    <th className="th">{age}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
