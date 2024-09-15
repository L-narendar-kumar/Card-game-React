import React from "react"; 
import Data from "./assets/Data"; 
import Card from "./assets/Card";
import "./App.css" 
export default function App() { 
	const [cardsArray, setCardsArray] = React.useState([]); 
	const [firstCard, setFirstCard] = React.useState(null); 
	const [secondCard, setSecondCard] = React.useState(null); 
	const [flip, setFlip] = React.useState(true); 
	const [win, setWin] = React.useState(0); 
	const [moves, setMoves] = React.useState(0);

	function NewGame() { 
		setTimeout(() => { 
			const randomOrderArray = Data.sort(() => Math.random() - 0.5); 
			setCardsArray(randomOrderArray); 
			setMoves(0); 
			setFirstCard(null); 
			setSecondCard(null); 
			setWin(0); 
		}, 1200); 
	}  

	function toggle(item) { 
		if (firstCard !== null && firstCard.id !== item.id) { 
			setSecondCard(item); 
		} else { 
			setFirstCard(item); 
		} 
	}

    function removeSelected() { 
		setFirstCard(null); 
		setSecondCard(null); 
		setFlip(true); 
		setMoves((prevValue) => prevValue + 1); 
	}

	React.useEffect(() => { 
		if (firstCard && secondCard) { 
			setFlip(false); 
			if (firstCard.name === secondCard.name) { 
				setCardsArray((prevArray) => { 
					return prevArray.map((unit) => { 
						if (unit.name === firstCard.name) { 
							return { ...unit, matched: true }; 
						} else { 
							return unit; 
						} 
					}); 
				}); 
				setWin((preVal) => preVal + 1); 
				removeSelected(); 
			} else { 
				setTimeout(() => { 
					removeSelected(); 
				}, 1000); 
			} 
		} 
	}, [firstCard, secondCard]); 
	  
	React.useEffect(() => { 
		NewGame(); 
	}, []); 

	return ( 
		<div className="center-part"> 
			<div className="title"> 
				<h1>Memory Game</h1> 
			</div> 
			<div className="cards"> 
				{ 
					cardsArray.map((card) => ( 
						<Card 
							card={card} 
							key={card.id} 
							toggle={toggle} 
							toggled={ 
								card === firstCard || 
								card === secondCard || 
								card.matched === true
							} 
							flip={flip} 
						/> 
					)) 
				} 
			</div> 

			{win !== 6 ? ( 
				<div className="stats">Moves : {moves}</div> 
			) : ( 
				<div className="stats"> 
					 You Won in {moves} moves 
				</div> 
			)} 
			<button className="button" onClick={NewGame}> 
				New Game 
			</button> 
		</div> 
	); 
} 
