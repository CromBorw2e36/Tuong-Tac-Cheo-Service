window.onload = function() {

    console.log("Have load page")
    let time = 1
    let Timer = setInterval(function() {
        console.log("Timer click button clicked " + time)
        time++

        if (time == 10) {
            clearInterval(Timer)
            console.clear()

        }
    }, 1000)
    setTimeout(function() {
        const button = document.querySelectorAll('.panel button')
        if (button) {
            for (let i = 0; i < button.length; i++) {
                button[i].click()
            }
            console.log("Have click button.")
        } else {
            window.location.reload();
        }
    }, 10000)

    Timer2 = setInterval(function() {
        if (time > 10) {
            // console.log("Timer click finish: " + time)
        }
        if (time == 60) {
            clearInterval(Timer2)
            console.clear()
        }
    }, 1000)
    let soduchinh_ = document.getElementById('soduchinh').textContent
    setTimeout(function() {
        let count = 0;
        let amount = 0;
        let j = document.querySelectorAll('.panel button').length - 1
        if (j > 1) {
            let timerId = setInterval(() => {
                document.querySelectorAll('.panel button')[j].click()
                let soduchinh = document.getElementById('soduchinh').textContent
                j = j - 1
                if (Number(soduchinh_) < Number(soduchinh)) {
                    soduchinh_ = soduchinh
                    count++;
                    amount += 700;
                    console.log("Have click finish " + j + " Your cost: " + soduchinh)
                } else {
                    // console.log("Have click finish " + j)
                }
                if (j == -1) {
                    clearInterval(timerId)
                    setTimeout(() => {
                        window.location.reload();
                    }, 10000)
                    console.log("Tổng số nhiệm vụ nhận được: ", count)
                    console.log("Tổng số tiền nhận được nhận được: ", amount)
                }
            }, 1200)
        } else {
            window.location.reload();
        }
    }, 50000)
}