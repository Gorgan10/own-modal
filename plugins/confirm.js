$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onClose: () => {
                modal.destroy() 
            } ,
            footerButtons: [
                {text: 'Cancel', type: 'secondary', handler() { // type: primary for bootstrap
                        modal.close()
                        reject()
                    }},
                {text: 'Delete', type: 'danger', handler() { // type: primary for bootstrap
                        modal.close()
                        resolve()
                    }}
            ]
        })
        setTimeout(() => modal.open(), 100)
    })
}