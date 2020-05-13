//Confirmation dialogue

export const confirmDialogue = (expense) => ({
    type: 'CONFIRM'
});

export const startConfirmDialogue = (dText, action) => {
    return () => {
        const r = confirm(dText);
        if(r === true) {
            action();
        } else {}
    }
};

