window.onload = async() => {
    const sessionStore = await chrome.storage.sync.get('tuongTacCheo');
    const data = sessionStore.tuongTacCheo ? JSON.parse(sessionStore.tuongTacCheo) : {}; // IF NUMBER YOU NEED CONVERT TO NUMBER EX: Number(data.totalJob)

    if (eval(data.run) === true) {
        const addFriend = await document.querySelector('[aria-label="Add friend"]');
        const cancelRequest = await document.querySelector('[aria-label="Cancel Request"]');
        const cancelFollow = await document.querySelector('[aria-label="Following"]');
        const follow = await document.querySelector('[aria-label="Follow"]');
        const like = await document.querySelector('[aria-label="Like"]');

        // if (cancelRequest) {
        //     await cancelRequest.click();
        // } else if (addFriend) {
        //     await addFriend.click();
        // } else if (cancelFollow) {
        //     await cancelFollow.click()
        // } else if (follow) {
        //     await follow.click();
        // } else if (like) {
        //     await like.click()
        // }

        if (addFriend) {
            await addFriend.click();
        } else if (follow) {
            await follow.click();
        } else if (like) {
            await like.click()
        } else {
            var win = window.open("", "_self");
            win.close();
        }

        var win = window.open("", "_self");
        win.close();
    }


}