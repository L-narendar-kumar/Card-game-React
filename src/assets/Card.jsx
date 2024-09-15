export default function Card({ card, toggle, toggled, flip }) { 
    return ( 
        <div className="item"> 
            <div className={toggled ? "toggled" : ""}> 
                <img className="face" src={card.img} alt="face" /> 
                <div 
                    className="back"
                    onClick={() => flip && toggle(card)} 
                > 
                    {" "} 
                </div> 
            </div> 
        </div> 
    ); 
} 