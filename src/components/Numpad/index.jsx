import PropTypes from 'prop-types';
import styles from './Numpad.module.css';

const Numpad = ({ handleClick }) => {
    const handleBtn = (e, keys) => handleClick(e, keys);
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ',', 'Enter'];
    return <div className={styles.container}>
        <div className={styles.keyboard}>
            <div className={styles.line}>
                {keys.map(elem => (
                    <button
                        key={elem}
                        onClick={(e) => handleBtn(e, elem)}
                        className={styles.key}>{elem}
                    </button>
                ))}
            </div>
        </div>
    </div>;
};

Numpad.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default Numpad;