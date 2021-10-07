export class NoteCassette {
    constructor(noteValue, amount) {
        this.noteValue = noteValue;
        this.amount = amount;
        this.calculateSum();
    }

    takeOne() {
        this.amount -= 1;
        this.calculateSum();
    }

    calculateSum() {
        this.sum = this.noteValue * this.amount;
    }

}

export class NoteCassetteFactory {

    constructNoteCassettesArray(input) {
        return input.map((el) => {
            return new NoteCassette(el[0], el[1]);
        });
    }
}

export class ATM {
    constructor(props) {
        const noteCassetteFactory = new NoteCassetteFactory();
        this.notes = noteCassetteFactory.constructNoteCassettesArray(props);
    }

    withdrawNotePack = [];

    leastValuableNoteNote = 50;

    isPositive = (value) => {
        return value > 0;
    };

    isThereEnoughMoney = (value) => {
        return value < this.notes.reduce((sum, current) => sum + current.sum, 0);
    };

    isPossibleToWithdraw = (value) => {
        return this.isPositive(value) && this.isThereEnoughMoney(value) && value % this.leastValuableNoteNote === 0;
    };

    withdraw = (amount) => {

        if (!this.isPossibleToWithdraw) throw new Error('Invalid amount!');

        this.withdrawNotePack = [];

        let amount1 = amount;

        while (amount1 > 0) {
            //sort desc sums
            this.notes.sort((note1, note2) => note2.sum - note1.sum);

            let added = false;
            let i = 0;
            while (!added && i < this.notes.length) {
                if (this.notes[i].noteValue <= amount1) {
                    this.withdrawNotePack.push(this.notes[i].noteValue);
                    this.notes[i].takeOne();
                    amount1 -= this.notes[i].noteValue;
                    added = true;
                } else {
                    i++;
                }
            }
        }
        return this;
    };
}

export default ATM;