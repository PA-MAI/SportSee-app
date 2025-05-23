import Zen from '../assets/svg/zen.svg'
import Swim from '../assets/svg/swim.svg'
import Bike from '../assets/svg/bike.svg'
import Dumbbells from '../assets/svg/dumbbells.svg'
import '../styles/css/verticalnav.css'

function Vnav() {
  

  return (
        <div className="vertical">
            <div className="vertical__nav" >
                <div className="vertical__icons" href="http://localhost:5173">
                    <img src={Zen} className="zen" alt="Zen icon" />
                    <img src={Swim} className="swim" alt="Swim icon" />
                    <img src={Bike} className="bike" alt="Bike icon" />
                    <img src={Dumbbells} className="dumbbells" alt="dumbbells icon" />
                </div>
                <span className="vertical__copyright">
                    <p>
                    Copyright, SportSee 2020
                    </p>
                </span>
            </div>
        </div>
    )
}

export default Vnav