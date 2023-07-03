document.addEventListener('DOMContentLoaded', documentEvents, false);

const loading = document.getElementById('loader');
const saved = document.getElementById('saved');
const message = document.getElementById('message');

const run = document.getElementById('run');

const dataSession = async() => {
        const sessionStore = await chrome.storage.sync.get('tuongTacCheo');
        const data = await sessionStore.tuongTacCheo ? JSON.parse(sessionStore.tuongTacCheo) : {}; // IF TYPE NUMBER THEN YOU NEED CONVERT TO NUMBER TYPE EX: Number(data.totalJob) 
        return data;
    }
    // SET DATA FOR INPUT 
window.onload = async() => {
    const total = document.getElementById('totalJob');
    const data = await dataSession();
    if (data.totalJob) {
        total.value = Number(data.totalJob);
    } else {
        total.value = 0;
    }
    RunStatus();
}

// ENTER FOR JOB
const EnterTotalSubJob = async() => {
    const total = document.getElementById('totalJob').value;

    if (Number(total) <= 0) {
        Message('Number\'s integer value must be than 0!', 'error');
        return;
    }

    const data = await dataSession();

    const dataSettings = {
        totalJob: Number(total),
        run: eval(data.run)
    }

    chrome.storage.sync.set({
        "tuongTacCheo": JSON.stringify(dataSettings)
    }, function() {
        Message('Saved');
    });
}

const EnterRun = async() => {
    const data = await dataSession();

    const dataSettings = {
        totalJob: data.total,
        run: eval(data.run) === true ? false : true
    }

    chrome.storage.sync.set({
        "tuongTacCheo": JSON.stringify(dataSettings)
    }, async function() {
        await Message(eval(data.run) === true ? 'Have stop' : 'Have start');
        RunStatus();
    });
}

const Loading = () => {
    loading.classList.remove('disabled');
    setTimeout(() => {
        loading.classList.add('disabled');
    }, 1000);
}

const Message = (text, type = 'info') => {
    if (type === 'error') {
        const divMs = document.getElementById('message');
        divMs.classList.remove('mint')
        divMs.classList.remove('h1')
    }

    loading.classList.remove('disabled');

    setTimeout(() => {
        loading.classList.add('disabled');
        message.textContent = text ? text : 'NOTHING';
        saved.classList.remove('disabled');
        setTimeout(() => {
            saved.classList.add('disabled');

            if (type === 'error') {
                const divMs = document.getElementById('message');
                divMs.classList.add('mint')
                divMs.classList.add('h1')
            }

        }, 500);
    }, 500);


}

const RunStatus = async() => {
    const data = await dataSession();
    if (data.run === true) {
        run.textContent = 'STOPS';
    } else {
        run.textContent = 'START';
    }
}


function documentEvents() {
    const btnEnter = document.getElementById('btn-enter');
    const btnRun = document.getElementById('run');

    btnEnter.addEventListener('click', function() {
        EnterTotalSubJob();
    });

    btnRun.addEventListener('click', function() {
        EnterRun();
    });
}