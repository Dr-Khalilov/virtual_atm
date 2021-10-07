import React from 'react';
import styles from './VarBill.module.css';

const VarBill = ({ handleClick }) => {
    const handleBtn = (e, keys) => handleClick(e, keys);
    const keys = [50, 100, 200, 500, 1000, 2000, 5000];
    return (
        <div className={styles.billCon}>
            <h3 className={styles.heading}>Select the amount to be withdrawn</h3>
            {keys.map(item => (
                <button key={item}
                        onClick={(e) => handleBtn(e, item)}
                        className={styles.btnStyle}>{item}
                </button>))}
        </div>
    );
};

export default VarBill;