$(document).ready(function () {
    var game = new Game($("table"));

    // When an image is clicked....
    $("img").click(function () {
        const td = $(this).parent();
        const tr = td.parent();
        const row = tr.index();
        const col = td.index();

        game.click(row, col);
    })
})

class Team {
    static A = new Team("Red", "images/teamA.png");
    static B = new Team("Blue", "images/teamB.png");

    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    opponent() {
        return (this === Team.A) ? Team.B : Team.A;
    }
}

class Game {
    constructor(table) {
        console.log("Instantiated new Game for", table);
        this.table = table;
        this.nrows = table.find("tr").toArray().length;
        this.ncols = table.find("tr:first-child td").toArray().length;
        this.team = Team.A;
        this.showTeam();
    }

    click(row, col) {
        if (!this.isClickable(row, col))
            return;

        this.flipImage(row, col);
        this.checkAllDirections(row, col);

        if (this.isGameOver())
            this.showGameOver();
        else
            this.changeTeam();
    }

    flipImage(row, col) {
        const img = this.getImage(row, col);
        img.src = this.team.image;
        img.width = "150";
        img.height = "150";
    }

    getImage(row, col) {
        const tr = this.table.find("tr")[row];
        const td = tr.cells[col];
        const img = td.querySelector("img");
        return img;
    }

    checkAllDirections(row, col) {
        for (let deltaRow = -1; deltaRow <= 1; deltaRow++)
            for (let deltaCol = -1; deltaCol <= 1; deltaCol++)
                if (deltaRow != 0 || deltaCol != 0)
                    this.checkOneDirection(row + deltaRow, col + deltaCol, deltaRow, deltaCol);
    }

    checkOneDirection(currRow, currCol, deltaRow, deltaCol) {
        if (!this.isValid(currRow, currCol))
            return false;
        else if (this.isClickable(currRow, currCol))
            return false;
        else if (this.belongsTo(currRow, currCol, this.team))
            return true;
        else {
            const flag = this.checkOneDirection(currRow + deltaRow, currCol + deltaCol, deltaRow, deltaCol);
            if (flag)
                this.flipImage(currRow, currCol);
            return flag;
        }
    }

    isClickable(row, col) {
        return !(this.belongsTo(row, col, Team.A) || this.belongsTo(row, col, Team.B));
    }

    scoreFor(team) {
        let score = 0;
        for (let row = 1; row < this.nrows; row++)
            for (let col = 1; col < this.ncols; col++)
                if (this.belongsTo(row, col, team))
                    score++;
        return score;
    }

    isGameOver() {
        for (let row = 1; row < this.nrows; row++)
            for (let col = 1; col < this.ncols; col++)
                if (this.isClickable(row, col))
                    return false;
        return true;
    }

    isValid(row, col) {
        return 1 <= row && row < this.nrows && 1 <= col && col < this.ncols;
    }

    belongsTo(row, col, team) {
        const img = this.getImage(row, col);
        return img.src.includes(team.image);
    }

    changeTeam() {
        this.team = this.team.opponent();
        this.showTeam();
    }

    showTeam() {
        $("#turn span").text(this.team.name);
        $("#turn img").attr("src", this.team.image);
        $("#turn img").attr("width", "20").attr("height", "20");
    }

    showGameOver() {
        const scoreA = this.scoreFor(Team.A);
        const scoreB = this.scoreFor(Team.B);
        let winner;

        if (scoreA > scoreB) {
            $("p#turn").text(`The ${Team.A.name} team wins by ${scoreA} to ${scoreB}`);
            winner = Team.A;
        } else if (scoreB > scoreA) {
            $("p#turn").text(`The ${Team.B.name} team wins by ${scoreB} to ${scoreA}`);
            winner = Team.B;
        } else
            $("p#turn").text("IT'S A DRAW!!!");

        for (let row = 1; row < this.nrows; row++)
            for (let col = 1; col < this.ncols; col++)
                if (this.belongsTo(row, col, winner))
                    this.getImage(row, col).classList.add("winner");
                else
                this.getImage(row, col).classList.add("loser");
            }
}
