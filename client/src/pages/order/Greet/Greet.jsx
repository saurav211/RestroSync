import { useEffect, useState } from "react";

function Greet() {
  const [greeting, setGreeting] = useState("");


  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour < 16) {
        setGreeting("Good afternoon");
    } else {
        setGreeting("Good evening");
    }
  }, []);

  return (
    <div className="OrderWelcome">
      <div>
        <div style={{fontSize:'1rem', fontWeight:'500'}}>{greeting}</div>
        <div style={{fontSize:'0.8rem'}}>Place your order here</div>
      </div>
    </div>
  );
}
export default Greet;
