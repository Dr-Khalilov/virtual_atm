import React, { Component } from 'react';
import ATM from '../ATMLogic';
import Numpad from '../Numpad';
import VarBill from '../VarBill';
import ReferenceWindow from '../ReferenceWindow';
import styles from './ATM.module.css';

export default class ATMView extends Component {
    constructor(props) {
        super(props);
        const cash = [
            [5000, 100],
            [2000, 400],
            [1000, 1000],
            [500, 3000],
            [200, 5000],
            [100, 8000],
            [50, 10000],
        ];
        this.state = {
            values: '',
            isHidden: true,
            atmLogic: new ATM(cash),
        };
    }

    moneyInfo = event => {
        event.preventDefault();
        const { isHidden } = this.state;
        this.setState({
            isHidden: !isHidden,
        });
    };

    handleClick = (e, keys) => {
        const { values } = this.state;
        if (keys === 'Enter') {
            this.handleSubmit(e);
            return;
        }
        if (keys === ',') {
            if (values.includes(keys)) {
                return;
            }
            this.setState({
                values: `${values.slice(0) + keys}`,
            });
            return;
        }
        this.setState({
            values: `${values.slice(0) + keys}`,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { values, atmLogic: { withdraw } } = this.state;
        if (Number(values) < 50) {
            throw new RangeError('Invalid Credentials');
        } else {
            withdraw(Number(values));
        }
        this.setState({
            values: '',
        });
    };

    editValue = ({ target: { value } }) => this.setState({ values: value });

    render() {
        const { atmLogic: { notes }, values, isHidden } = this.state;
        return (
            <div className={styles.divContainer}>
                <h1 className={styles.heading}>ATM</h1>
                <form className={styles.container} onSubmit={this.handleSubmit}>
                    <input type='text' name='text' value={values} onChange={this.editValue}
                           placeholder='Money' autoFocus={true} className={styles.inputStyles} />
                    <VarBill handleClick={this.handleClick} />
                    <div className={styles.btnCon}>
                        <button className={styles.btn} type='submit'>Submit</button>
                        <button className={styles.btn} onClick={this.moneyInfo}>Reference</button>
                        {isHidden ? null : <ReferenceWindow notes={notes} />}
                    </div>
                </form>
                <Numpad handleClick={this.handleClick} />
            </div>
        );
    }
}