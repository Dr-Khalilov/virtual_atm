import styles from './ReferenceWindow.module.css';

const ReferenceWindow = ({ notes }) => (
    <table className={styles.info}>
        <thead className={styles.head}>
        <tr>
            <td>Note Value</td>
            <td>Amount</td>
            <td>Sum</td>
        </tr>
        </thead>
        <tbody className={styles.body}>
        {notes.map(item => (
            <tr className={styles.elem} key={item.noteValue}>
                <td>{item.noteValue}</td>
                <td>{item.amount}</td>
                <td>{item.sum}</td>
            </tr>))}
        </tbody>
    </table>
);

export default ReferenceWindow;