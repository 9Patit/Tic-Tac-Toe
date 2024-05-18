// เลือกทุกช่องในตารางที่มีคลาสชื่อ 'cell'
const cells = document.querySelectorAll('.cell');
// เลือกองค์ประกอบที่มี ID 'status' เพื่อแสดงข้อความสถานะ
const statusText = document.getElementById('status');

// กำหนดผู้เล่นปัจจุบันเป็น 'X'
let currentPlayer = 'X';
// สร้างอาเรย์เพื่อเก็บสถานะของแต่ละช่องในตาราง
let gameState = ["", "", "", "", "", "", "", "", ""];
// กำหนดสถานะของเกมว่ากำลังดำเนินอยู่
let gameActive = true;

// กำหนดเงื่อนไขการชนะทั้งหมด
const winningConditions = [
    [0, 1, 2], // เรียงrowบน
    [3, 4, 5], // เรียงrowกลาง
    [6, 7, 8], // เรียงrowล่างสุด
    [0, 3, 6], // เรียงcolซ้ายสุด
    [1, 4, 7], // เรียงcolกลาง
    [2, 5, 8], // เรียงcolขวาสุด
    [0, 4, 8], // เรียงแนวทแยงจากซ้ายบนไปขวาล่าง
    [2, 4, 6]  // เรียงแนวทแยงจากขวาบนไปซ้ายล่าง
];

// ฟังก์ชันที่เรียกเมื่อคลิกที่ช่อง
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // ตรวจสอบว่าช่องถูกคลิกแล้วหรือไม่ หรือเกมจบแล้วหรือยัง
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // อัปเดตสถานะของช่องที่ถูกคลิก
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // ตรวจสอบผลลัพธ์ของเกม
    checkResult();
}

// ฟังก์ชันตรวจสอบผลลัพธ์ของเกม
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `ผู้เล่น ${currentPlayer} ชนะ!!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "เสมอ!!";
        gameActive = false;
        return;
    }

    // เปลี่ยนผู้เล่น
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `ตาเดินของ ${currentPlayer}`;
}

// ฟังก์ชันเริ่มเกมใหม่
function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `ตาเดินของ ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
}

// เพิ่ม event listener ให้แต่ละช่องเมื่อถูกคลิก
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// แสดงข้อความตาเดินของผู้เล่นคนแรก
statusText.textContent = `ตาเดินของ ${currentPlayer}`;

// เพิ่มปุ่มสำหรับเริ่มเกมใหม่
const restartButton = document.createElement('button');
restartButton.textContent = "เริ่มเกมใหม่";
restartButton.addEventListener('click', restartGame);
document.body.appendChild(restartButton);