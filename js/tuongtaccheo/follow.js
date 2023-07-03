const TIME_STEP = 1000;
const TIME_ENTER = 2000;
const TIME_SUB = 5000;
/* SIZE_LENGTH >= 0 IS ACTIVE */
/* SIZE_LENGTH < 0 IS DISABLED */
let SIZE_LENGTH = 2;

window.onload = async() => {

    const sessionStore = await chrome.storage.sync.get('tuongTacCheo');
    const data = sessionStore.tuongTacCheo ? JSON.parse(sessionStore.tuongTacCheo) : {}; // IF NUMBER TYPE THEN YOU NEED CONVERT TO TYPE NUMBER EX: Number(data.totalJob)

    if (data.totalJob &&
        Number(data.totalJob)) {
        SIZE_LENGTH = Number(data.totalJob)
    }

    if (eval(data.run) === true) {
        console.clear();
        await getSoDuChinh();

        setTimeout(() => {
            if (EnterJob(SIZE_LENGTH)) {
                setTimeout(() => {
                    let TIMES = TimeAwaitSubJob(SIZE_LENGTH) + TIME_ENTER;

                    if (TIMES !== -1) {
                        console.log("Thời gian đếm ngược " + TIMES + 'ms');
                        setTimeout(() => {
                            SubJob(SIZE_LENGTH)
                        }, TIMES);
                    }
                }, TIME_SUB)
            }
        }, TIME_ENTER)
    }
}


const getSoDuChinh = async() => {
    let SODUCHINH_COUNTER = document.getElementById('soduchinh').textContent;
    console.log("Số dư chính: " + SODUCHINH_COUNTER + " xu.");
}

// Nhận tiền
const SubJob = async(SIZE_LENGTH_SUB) => {
    const buttons = document.querySelectorAll('.panel button');
    const LENGTH_ENTER = CounterSize(SIZE_LENGTH_SUB, buttons.length);
    if (buttons.length > 0) {
        let i = 0;
        setInterval(async() => {
            if (i < LENGTH_ENTER) {
                await buttons[i++].click();
            } else {
                clearInterval();
            }
        }, TIME_STEP);
        setTimeout(() => {
            window.location.reload();
        }, TIME_STEP * LENGTH_ENTER)
    }
}

// Nhân việc
const EnterJob = (SIZE_LENGTH_ENTER) => {
    const buttons = document.querySelectorAll('.panel button');
    const LENGTH_ENTER = CounterSize(SIZE_LENGTH_ENTER, buttons.length);
    if (buttons.length > 0) {
        for (let i = 0; i < LENGTH_ENTER; i++) {
            buttons[i].click();
        }
        return true;
    } else {
        window.location.reload();
    }
}

const CounterSize = (SIZE_LENGTH, SIZE_LENGTH_BUTTON) => {
    const LENGTH = SIZE_LENGTH > 0 && SIZE_LENGTH <= SIZE_LENGTH_BUTTON ? Number(SIZE_LENGTH) + 1 : SIZE_LENGTH_BUTTON;
    return LENGTH;
}


const TimeAwaitSubJob = (SIZE_LENGTH) => {
    const buttons = document.querySelectorAll('.panel button');
    const LENGTH_ENTER = CounterSize(SIZE_LENGTH, buttons.length);

    let TIME_SIZE = 1200; // TIME SUB JOB

    if (LENGTH_ENTER < 20) {
        TIME_SIZE = 2000;
    } else if (LENGTH_ENTER < 30) {
        TIME_SIZE = 1800;
    } else if (LENGTH_ENTER < 40) {
        TIME_SIZE = 1500;
    } else {
        TIME_SIZE = 1200;
    }

    const TIMES = LENGTH_ENTER * TIME_SIZE;

    return isNaN(TIMES) ? -1 : TIMES;
}